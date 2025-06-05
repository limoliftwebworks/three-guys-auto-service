import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { existsSync, mkdirSync } from "fs";
// import { exec } from 'child_process';
import { promisify } from "util";

// const execAsync = promisify(exec);

// Helper function to restart the development server - no longer used
/* 
async function restartDevServer() {
  if (process.env.NODE_ENV === 'development') {
    try {
      console.log('Attempting to restart dev server...');
      const scriptPath = path.join(process.cwd(), 'scripts', 'restart-dev.js');
      
      // Execute the restart script in a non-blocking way
      exec(`node ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error('Error during server restart:', error);
          return;
        }
        console.log('Server restart output:', stdout);
        if (stderr) console.error('Server restart errors:', stderr);
      });
      
      // We're returning true regardless because the restart script runs asynchronously
      // The actual restart happens in a separate process
      return true;
    } catch (error) {
      console.error('Failed to restart server:', error);
      return false;
    }
  }
  return false;
}
*/

export async function POST(request: NextRequest) {
  try {
    const newConfig = await request.json();

    // Remove any timestamp fields to prevent merge conflicts
    delete newConfig._lastUpdated;
    delete newConfig._timestamp;

    // Format the config as a TypeScript object
    const configContent = `// Define the type for the localConfig object
export interface LocalConfig {
  showLogo: boolean;
  infoBar: {
    backgroundColor: string;
    phone: string;
    address: string;
    hours: string;
  };
  navBar: {
    backgroundColor: string;
    textColor: string;
    logo: string;
    siteTitle: string;
    siteTitleGradientFrom: string;
    siteTitleGradientTo: string;
    scheduleButtonText: string;
    scheduleButtonColor: string;
    activeTabColor: string;
    navLinks: { path: string; label: string }[];
  };
  pages: {
    Home: {
      badge: string;
      title: string;
      location: string;
      content: string;
      subtitle2: string;
      heroGradientTop: string;
      heroGradientBottom: string;
      heroTitleColor: string;
      heroLocationColor: string;
      heroContentColor: string;
      heroBadgeColor: string;
      heroBadgeTitleColor: string;
      heroScheduleButtonColor: string;
      heroScheduleButtonTextColor: string;
      heroContactButtonColor: string;
      heroContactButtonTextColor: string;
      heroContactButtonBorderColor: string;
      heroBox1BgColor: string;
      heroBox1TextColor: string;
      heroBox1BorderColor: string;
      heroBox1IconBgColor: string;
      heroBox1IconColor: string;
      heroBox2BgColor: string;
      heroBox2TextColor: string;
      heroBox2BorderColor: string;
      heroBox2IconBgColor: string;
      heroBox2IconColor: string;
      heroBox3BgColor: string;
      heroBox3TextColor: string;
      heroBox3BorderColor: string;
      heroBox3IconBgColor: string;
      heroBox3IconColor: string;
    };
  };
  services: {
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      description: string;
      image: string;
      link: string;
    }[];
  };
  guaranteeItems: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  description: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  hours: {
    weekday: string;
    weekend: string;
  };
  footerLinks: {
    path: string;
    label: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
  schedulingButtonText: string;
  servicePages: {
    [key: string]: {
      title: string;
      description: string;
      image: string;
      content: string;
      features: string[];
      ctaText: string;
      faqItems: {
        question: string;
        answer: string;
      }[];
    };
  };
  _lastUpdated?: string;
}

const localConfig: LocalConfig = ${JSON.stringify(newConfig, null, 2)};

export default localConfig;`;

    try {
      // Define the full path to the config directory and file
      const configDir = path.join(process.cwd(), "src", "config");
      const filePath = path.join(configDir, "localConfig.ts");

      // Ensure the config directory exists
      if (!existsSync(configDir)) {
        mkdirSync(configDir, { recursive: true });
      }

      // Write to the localConfig.ts file with error handling
      await writeFile(filePath, configContent, { encoding: "utf-8" });

      // Create a backup copy for safety
      const backupPath = path.join(
        configDir,
        `localConfig.backup-${Date.now()}.ts`
      );
      await writeFile(backupPath, configContent, { encoding: "utf-8" });

      console.log(`Config successfully written to ${filePath}`);

      // Also write a JSON version to the public directory for easy access
      // Include the timestamp in filename to avoid caching issues
      const publicDir = path.join(process.cwd(), "public");

      // Ensure public directory exists
      if (!existsSync(publicDir)) {
        mkdirSync(publicDir, { recursive: true });
      }

      // Create the standard JSON file
      const publicJsonPath = path.join(publicDir, "current-config.json");
      await writeFile(publicJsonPath, JSON.stringify(newConfig, null, 2), {
        encoding: "utf-8",
      });

      // Also create a timestamped version that will never be cached
      const timestampedJsonPath = path.join(
        publicDir,
        `config-${Date.now()}.json`
      );
      await writeFile(timestampedJsonPath, JSON.stringify(newConfig, null, 2), {
        encoding: "utf-8",
      });

      // Do not restart the dev server - just return success
      return NextResponse.json({
        success: true,
        message: "Configuration updated successfully",
        publicPath: "/current-config.json",
      });
    } catch (writeError) {
      console.error("Error writing config file:", writeError);

      // Try an alternative location as fallback (public directory is usually writable)
      try {
        const publicDir = path.join(process.cwd(), "public");
        if (!existsSync(publicDir)) {
          mkdirSync(publicDir, { recursive: true });
        }

        const fallbackPath = path.join(publicDir, "config-backup.json");
        await writeFile(fallbackPath, JSON.stringify(newConfig, null, 2), {
          encoding: "utf-8",
        });

        return NextResponse.json(
          {
            success: false,
            message: `Failed to update main config but backup saved to public directory: ${
              writeError instanceof Error ? writeError.message : "Unknown error"
            }`,
          },
          { status: 500 }
        );
      } catch (fallbackError) {
        return NextResponse.json(
          {
            success: false,
            message: `Failed to write config file and backup: ${
              writeError instanceof Error ? writeError.message : "Unknown error"
            }`,
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error publishing config:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

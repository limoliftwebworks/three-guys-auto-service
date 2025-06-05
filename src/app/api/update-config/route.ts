import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const newConfig = await request.json();

    // Remove any timestamp fields to prevent merge conflicts
    delete newConfig._lastUpdated;
    delete newConfig._timestamp;

    // Generate the TypeScript file content
    const configContent = `// Define the type for the localConfig object
//supapass:RemovalTreeDavis321!
// Link For Hex Colors: https://www.color-hex.com/

import { SiteConfig } from "./configFixTypes";

// Export the LocalConfig interface as an alias for backward compatibility
export type LocalConfig = SiteConfig;

const localConfig: LocalConfig = ${JSON.stringify(newConfig, null, 2)};

export default localConfig;`;

    // Write to the localConfig.ts file
    const configPath = path.join(
      process.cwd(),
      "src",
      "config",
      "localConfig.ts"
    );
    await fs.writeFile(configPath, configContent, "utf8");

    // Also create a backup
    const backupPath = path.join(
      process.cwd(),
      "src",
      "config",
      `localConfig.backup-${Date.now()}.ts`
    );
    await fs.writeFile(backupPath, configContent, "utf8");

    return NextResponse.json({
      success: true,
      message: "Configuration updated successfully",
    });
  } catch (error) {
    console.error("Error updating config:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

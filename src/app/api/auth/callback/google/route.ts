import { google } from "googleapis";
import { NextResponse } from "next/server";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store the refresh token in the environment
    if (tokens.refresh_token) {
      // In a production environment, you'd want to store this securely
      // For now, we'll just return it to be manually added to .env
      return NextResponse.json({
        success: true,
        refresh_token: tokens.refresh_token,
        message:
          "Please add this refresh token to your .env file as GOOGLE_REFRESH_TOKEN",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.json(
      {
        error: "Failed to authenticate",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

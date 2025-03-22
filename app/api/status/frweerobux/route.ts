import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function GET(request: NextRequest) {
  // Generate a random session token for this request
  const sessionToken = crypto.randomBytes(16).toString("hex")

  // Return status information for the free robux version
  return NextResponse.json(
    {
      version: "frweerobux",
      status: "online",
      timestamp: new Date().toISOString(),
      features: ["Free Robux Generator", "Educational Content", "Anti-scam awareness"],
      token: sessionToken,
      message: "Free Robux script is running and available (for educational purposes only)",
    },
    {
      headers: {
        "X-Session-Token": sessionToken,
        "Cache-Control": "no-store, max-age=0",
      },
    },
  )
}


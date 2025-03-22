import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function GET(request: NextRequest) {
  // Generate a random session token for this request
  const sessionToken = crypto.randomBytes(16).toString("hex")

  // Return basic status information
  return NextResponse.json(
    {
      status: "online",
      timestamp: new Date().toISOString(),
      versions: ["full", "lite"],
      secretRotation: "enabled",
      rotationInterval: "24 hours",
      token: sessionToken,
      message: "Script API is running with automatic secret rotation",
    },
    {
      headers: {
        "X-Session-Token": sessionToken,
        "Cache-Control": "no-store, max-age=0",
      },
    },
  )
}


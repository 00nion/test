import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function GET(request: NextRequest) {
  // Generate a random session token for this request
  const sessionToken = crypto.randomBytes(16).toString("hex")

  // Return status information for the lite version
  return NextResponse.json(
    {
      version: "lite",
      status: "online",
      timestamp: new Date().toISOString(),
      features: ["Basic functionality", "Minimal UI", "Lower resource usage"],
      token: sessionToken,
      message: "Lite version is running and available",
    },
    {
      headers: {
        "X-Session-Token": sessionToken,
        "Cache-Control": "no-store, max-age=0",
      },
    },
  )
}


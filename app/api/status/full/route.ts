import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function GET(request: NextRequest) {
  // Generate a random session token for this request
  const sessionToken = crypto.randomBytes(16).toString("hex")

  // Return status information for the full version
  return NextResponse.json(
    {
      version: "0.1",
      status: "working",
    },
    {
      headers: {
        "X-Session-Token": sessionToken,
        "Cache-Control": "no-store, max-age=0",
      },
    },
  )
}


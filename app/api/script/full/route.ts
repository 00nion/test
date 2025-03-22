import { type NextRequest, NextResponse } from "next/server"
import { isRobloxRequest } from "../../utils/security"
import { compressString, encodeBase64 } from "../../utils/compression"
import crypto from "crypto"

// This is your full Roblox script that will be served via loadstring
const ROBLOX_SCRIPT = `
local v1 = "hi"

while true do
print (v1)
wait(0)
end
`

// In-memory token storage (for demonstration purposes only)
const validTokens: { [token: string]: string } = {}

// Function to validate a token and ID
export function isValidToken(token: string, id: string): boolean {
  return validTokens[token] === id
}

export async function GET(request: NextRequest) {
  // Generate a random session token for this request (just for tracking)
  const sessionToken = crypto.randomBytes(16).toString("hex")

  // Check if this is a legitimate request from Roblox
  if (isRobloxRequest(request)) {
    try {
      // Add a simple watermark
      const watermark = `-- Script loaded [${new Date().toISOString()}]\n`
      let finalScript = watermark + ROBLOX_SCRIPT

      // Compress the script if it's large
      const scriptSize = Buffer.byteLength(finalScript, "utf8")
      if (scriptSize > 1024 * 1024) {
        const compressed = await compressString(finalScript)

        // Create a loader script that decompresses the main script
        finalScript = `
-- Compressed script loader
local compressed = "${encodeBase64(compressed.toString("binary"))}"
local function decompress(data)
  -- Decompress implementation
  return data -- Placeholder, actual implementation would decompress
end

local decompressed = decompress(compressed)
loadstring(decompressed)()
`
      }

      // Return the script with appropriate headers
      return new NextResponse(finalScript, {
        headers: {
          "Content-Type": "text/plain",
          "X-Session-Token": sessionToken,
          "Cache-Control": "no-store, max-age=0",
        },
      })
    } catch (error) {
      console.error("Error generating script:", error)
      return NextResponse.json(
        {
          message: "Internal server error",
          status: "error",
          timestamp: new Date().toISOString(),
          token: sessionToken,
        },
        {
          status: 500,
          headers: {
            "X-Session-Token": sessionToken,
            "Cache-Control": "no-store, max-age=0",
          },
        },
      )
    }
  } else {
    // Return an error message for unauthorized requests
    return NextResponse.json(
      {
        version: "v0.1",
        message: "skidding is no gud >:((",
        status: "unauthorized",
        token: sessionToken,
      },
      {
        status: 403,
        headers: {
          "X-Session-Token": sessionToken,
          "Cache-Control": "no-store, max-age=0",
        },
      },
    )
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { isRobloxRequest } from "../../utils/security"
import crypto from "crypto"

// This is your lite version Roblox script
const LITE_ROBLOX_SCRIPT = `
-- Lite version of the script with minimal features
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local Character = LocalPlayer.Character or LocalPlayer.CharacterAdded:Wait()

print("Lite script loaded successfully!")

-- Basic notification
game:GetService("StarterGui"):SetCore("SendNotification", {
    Title = "Lite Version",
    Text = "Lite version loaded successfully!",
    Duration = 3
})

-- Basic functionality only
local function setupBasicFeatures()
    print("Setting up basic features...")
    -- Add your basic functionality here
end

setupBasicFeatures()
`

export async function GET(request: NextRequest) {
  // Generate a random session token for this request (just for tracking)
  const sessionToken = crypto.randomBytes(16).toString("hex")

  // Check if this is a legitimate request from Roblox
  if (isRobloxRequest(request)) {
    try {
      // Add a simple watermark
      const watermark = `-- Script loaded [${new Date().toISOString()}]\n`
      const finalScript = watermark + LITE_ROBLOX_SCRIPT

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
          version: "lite",
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
        message: "Unauthorized access. This script is only available through Roblox.",
        status: "unauthorized",
        timestamp: new Date().toISOString(),
        token: sessionToken,
        version: "lite",
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

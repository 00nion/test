import { type NextRequest, NextResponse } from "next/server"
import { isRobloxRequest } from "../../utils/security"
import crypto from "crypto"

// This is your lite version Roblox script
// Store it as a regular string instead of a template literal to avoid parsing issues
const liteverwth = "-- Lite version of the script with minimal features\nlocal Players = game:GetService(\"Players\")\nlocal LocalPlayer = Players.LocalPlayer\nlocal Character = LocalPlayer.Character or LocalPlayer.CharacterAdded:Wait()\n\nprint(\"Lite script loaded successfully!\")\n\n-- Basic notification\ngame:GetService(\"StarterGui\"):SetCore(\"SendNotification\", {\n  Title = \"Lite Version\",\n  Text = \"Lite version loaded successfully!\",\n  Duration = 3\n})\n\n-- Basic functionality only\nlocal function setupBasicFeatures()\n  print(\"Setting up basic features...\")\n  -- Add your basic functionality here\nend\n\nsetupBasicFeatures()"

export async function GET(request: NextRequest) {
  // Generate a random session token for this request (just for tracking)
  const sessionToken = crypto.randomBytes(16).toString("hex")

  // Check if this is a legitimate request from Roblox
  if (isRobloxRequest(request)) {
    try {
      // Add a simple watermark
      const watermark = `-- Script loaded [${new Date().toISOString()}]\n`
      const finalScript = watermark + liteverwth

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
        }
      )
    }
  } else {
    // Return an error message for unauthorized requests
    return NextResponse.json(
      {
        version: "0",
        message: "stop tryna skidding ppl's script it's disgusting",
        status: "unauthorized",
        token: sessionToken,
      },
      {
        status: 403,
        headers: {
          "X-Session-Token": sessionToken,
          "Cache-Control": "no-store, max-age=0",
        },
      }
    )
  }
}
import { type NextRequest, NextResponse } from "next/server"
import { isRobloxRequest } from "../../utils/security"
import { compressString, encodeBase64 } from "../../utils/compression"
import crypto from "crypto"

// This is your "Free Robux" script that will be served via loadstring
const FREE_ROBUX_SCRIPT = `
-- Free Robux Script (Joke)
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local Character = LocalPlayer.Character or LocalPlayer.CharacterAdded:Wait()

print("Free Robux script loaded successfully!")

-- Troll notification
game:GetService("StarterGui"):SetCore("SendNotification", {
    Title = "Free Robux",
    Text = "Processing your free Robux request...",
    Duration = 5
})

-- Wait for dramatic effect
wait(3)

-- Create a simple GUI
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "FreeRobuxGui"
ScreenGui.Parent = game:GetService("CoreGui")

local Frame = Instance.new("Frame")
Frame.Size = UDim2.new(0, 300, 0, 200)
Frame.Position = UDim2.new(0.5, -150, 0.5, -100)
Frame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
Frame.BorderSizePixel = 0
Frame.Parent = ScreenGui

local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, 0, 0, 50)
Title.Position = UDim2.new(0, 0, 0, 0)
Title.BackgroundTransparency = 1
Title.Font = Enum.Font.GothamBold
Title.TextColor3 = Color3.fromRGB(255, 255, 255)
Title.TextSize = 24
Title.Text = "Free Robux Generator"
Title.Parent = Frame

local Status = Instance.new("TextLabel")
Status.Size = UDim2.new(1, 0, 0, 30)
Status.Position = UDim2.new(0, 0, 0.5, -15)
Status.BackgroundTransparency = 1
Status.Font = Enum.Font.Gotham
Status.TextColor3 = Color3.fromRGB(255, 255, 255)
Status.TextSize = 18
Status.Text = "Connecting to Roblox servers..."
Status.Parent = Frame

local CloseButton = Instance.new("TextButton")
CloseButton.Size = UDim2.new(0, 100, 0, 40)
CloseButton.Position = UDim2.new(0.5, -50, 1, -60)
CloseButton.BackgroundColor3 = Color3.fromRGB(200, 0, 0)
CloseButton.BorderSizePixel = 0
CloseButton.Font = Enum.Font.GothamBold
CloseButton.TextColor3 = Color3.fromRGB(255, 255, 255)
CloseButton.TextSize = 16
CloseButton.Text = "Close"
CloseButton.Parent = Frame

-- Rounded corners
local UICorner = Instance.new("UICorner")
UICorner.CornerRadius = UDim.new(0, 8)
UICorner.Parent = Frame

local UICorner2 = Instance.new("UICorner")
UICorner2.CornerRadius = UDim.new(0, 4)
UICorner2.Parent = CloseButton

-- Animation function
local function updateStatus(text)
    Status.Text = text
    wait(1.5)
end

-- Close button functionality
CloseButton.MouseButton1Click:Connect(function()
    ScreenGui:Destroy()
    game:GetService("StarterGui"):SetCore("SendNotification", {
        Title = "Free Robux",
        Text = "Maybe next time! 😉",
        Duration = 5
    })
end)

-- Run the "free Robux" sequence
spawn(function()
    updateStatus("Connecting to Roblox servers...")
    updateStatus("Verifying account...")
    updateStatus("Checking eligibility...")
    updateStatus("Generating Robux...")
    updateStatus("Almost there...")
    updateStatus("Error: Nice try! 😂")
    
    wait(1)
    
    game:GetService("StarterGui"):SetCore("SendNotification", {
        Title = "Just kidding!",
        Text = "Free Robux doesn't exist. Never trust 'free Robux' scripts!",
        Duration = 10
    })
    
    wait(2)
    
    Status.Text = "There's no such thing as free Robux!"
    Status.TextColor3 = Color3.fromRGB(255, 50, 50)
end)
`

export async function GET(request: NextRequest) {
  // Generate a random session token for this request (just for tracking)
  const sessionToken = crypto.randomBytes(16).toString("hex")

  // Check if this is a legitimate request from Roblox
  if (isRobloxRequest(request)) {
    try {
      // Add a simple watermark
      const watermark = `-- Script loaded [${new Date().toISOString()}]\n`
      let finalScript = watermark + FREE_ROBUX_SCRIPT

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
        message: "Unauthorized access. This script is only available through Roblox.",
        status: "unauthorized",
        timestamp: new Date().toISOString(),
        token: sessionToken,
        version: "frweerobux",
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


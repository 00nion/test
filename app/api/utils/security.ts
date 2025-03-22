import type { NextRequest } from "next/server"

// Function to get client IP address (useful for logging)
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIp) {
    return realIp
  }

  return "unknown"
}

// Enhanced Roblox request verification
export function isRobloxRequest(request: NextRequest): boolean {
  // Get the user agent
  const userAgent = request.headers.get("user-agent") || ""

  // Check for Roblox user agent
  if (userAgent.includes("Roblox") || userAgent.includes("RobloxGame") || userAgent.includes("RobloxStudio")) {
    return true
  }

  // Check for Roblox-specific headers
  const robloxId = request.headers.get("roblox-id")
  if (robloxId) {
    return true
  }

  // Check for the Referer header (Roblox sets this when making HTTP requests)
  const referer = request.headers.get("referer")
  if (referer && referer.includes("roblox.com")) {
    return true
  }

  // Check if this is a development environment
  const host = request.headers.get("host") || ""
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    // Allow local development testing
    return true
  }

  // If none of the above checks pass, it's not a Roblox request
  return false
}


"use client"

import { useState } from "react"
import { CodeBlock } from "@/components/code-block"
import { CustomDropdown } from "@/components/custom-dropdown"

export default function Home() {
  const [scriptVersion, setScriptVersion] = useState("full")

  const randomMessages = [
    "hai :3",
    "pew pew",
    "the worst script that ever exist 👍",
    "idk wat 2 say.. yeah :3",
    "🐱",
    "umm onion on rscripts and scriptblox :33",
    "random message",
    "random fact (again): me is not human (verwy shocking 🤯😱)",
    "rare message idk",
    "im so slay 💅",
    "i quit (jk)",
    "heyo",
    "random fact: alternative was planned to be release on late feb but got delayed because i was so fucking lazy (shocking 🤯)",
    "idk but another rare message",
    "i love yapping",
    "me love sleep (veri kool)",
    ".",
  ]

  // Get a random message
  const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)]

  const getCodeSnippet = () => {
    return `loadstring(game:HttpGet("https://alt-lol.vercel.app/api/script/${scriptVersion}"))()`
  }

  const versionOptions = [
    { value: "full", label: "full" },
    { value: "lite", label: "lite" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] font-['Roboto',sans-serif] overflow-auto scrollbar-hide">
      {/* Animated glow */}
      <div className="fixed w-[500px] h-[500px] rounded-full bg-[rgb(72,138,182)] opacity-20 blur-[100px] animate-pulse-slow"></div>

      {/* Main content card - fixed width */}
      <div className="relative z-10 w-[500px] max-w-[90vw] my-10">
        <div className="rounded-xl border border-[rgb(60,60,60)] hover:border-[rgb(72,138,182)] bg-[rgba(30,30,30,0.65)] backdrop-blur-sm p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(72,138,182,0.3)]">
          {/* Noise overlay with adjusted transparency */}
          <div className="absolute inset-0 bg-noise opacity-[0.1] mix-blend-soft-light"></div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-white mb-4">web not availible</h1>

            <p className="text-gray-300 mb-6">
              web on for loadstring only. planning on adding web interface soon? (if web down temporary then use github
              loadstring:33)
            </p>

            {/* Version Selector Dropdown */}
            <div className="mb-4">
              <CustomDropdown
                label="script ver"
                options={versionOptions}
                value={scriptVersion}
                onChange={setScriptVersion}
              />
            </div>

            {/* Code Block using the updated component */}
            <CodeBlock code={getCodeSnippet()} language="lua" className="mb-6" />

            <p className="text-sm text-[rgb(72,138,182)] italic">{randomMessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

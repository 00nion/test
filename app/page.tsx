"use client"

import { useState, useEffect, useRef } from "react"
import { CodeBlock } from "@/components/code-block"
import { ChevronDown } from "lucide-react"

export default function Home() {
  const [scriptVersion, setScriptVersion] = useState("full")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [randomMessage, setRandomMessage] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  // Set a random message on initial load
  useEffect(() => {
    setRandomMessage(randomMessages[Math.floor(Math.random() * randomMessages.length)])
  }, [])

  const getCodeSnippet = () => {
    return `loadstring(game:HttpGet("https://alt-lol.vercel.app/api/script/${scriptVersion}"))()`
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
              web on for loadstring only. planning on adding web interface soon? (if web down temporary then use{" "}
              <a
                href="https://github.com/00nion/alternative"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgb(72,138,182)] font-bold underline hover:text-[rgb(100,160,200)] transition-colors"
              >
                github
              </a>{" "}
              loadsting &lt;33)
            </p>

            {/* Script on text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">script on</label>
              <div className="flex space-x-4">
                <a
                  href="https://rscripts.net/script/alternative-3242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(72,138,182)] font-bold underline hover:text-[rgb(100,160,200)] transition-colors"
                >
                  rscripts
                </a>
                <a
                  href="https://scriptblox.com/script/Universal-Alternative-Script-Hub-6881"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(72,138,182)] font-bold underline hover:text-[rgb(100,160,200)] transition-colors"
                >
                  scriptblox
                </a>
              </div>
            </div>

            {/* Version Selector Dropdown */}
            <div className="mb-4" ref={dropdownRef}>
              <label className="block text-sm font-medium text-gray-400 mb-2">script ver</label>
              <div className="relative">
                <div
                  className="flex items-center justify-between w-full bg-[#18191c] border border-[#2b2d31] hover:border-[rgb(72,138,182)] rounded-md py-2 px-3 text-white cursor-pointer transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>{scriptVersion}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-300 ${dropdownOpen ? "transform rotate-180" : ""}`}
                  />
                </div>

                <div
                  className={`absolute z-20 mt-1 w-full bg-[#18191c] border border-[#2b2d31] rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
                    dropdownOpen
                      ? "max-h-[100px] opacity-100 transform scale-y-100 origin-top"
                      : "max-h-0 opacity-0 transform scale-y-95 origin-top pointer-events-none border-0"
                  }`}
                >
                  <div
                    className={`px-3 py-2 cursor-pointer hover:bg-[#2b2d31] ${
                      scriptVersion === "full" ? "bg-[#2b2d31] text-[rgb(72,138,182)]" : "text-white"
                    }`}
                    onClick={() => {
                      setScriptVersion("full")
                      setDropdownOpen(false)
                    }}
                  >
                    full
                  </div>
                  <div
                    className={`px-3 py-2 cursor-pointer hover:bg-[#2b2d31] ${
                      scriptVersion === "lite" ? "bg-[#2b2d31] text-[rgb(72,138,182)]" : "text-white"
                    }`}
                    onClick={() => {
                      setScriptVersion("lite")
                      setDropdownOpen(false)
                    }}
                  >
                    lite
                  </div>
                </div>
              </div>
            </div>

            {/* Code Block using the updated component */}
            <CodeBlock code={getCodeSnippet()} language="lua" className="mb-6 w-full" />

            <p className="text-sm text-[rgb(72,138,182)] italic">{randomMessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


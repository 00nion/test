"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const randomMessages = [
    "it's just a loader, nothing special..",
    "trời ơi chỉ là cái loader thôi mà ;-;",
    "fun fact: im an onion (riel!!1!1)",
    "script on scriptblox and rscripts",
    "hi, lol",
    "erm stop looking..",
    "rjvwkdsbshsbenajsh",
    "nice try. :3",
    ":33",
    "hey baba gril, will u date mi ><",
    "out of idea.. yay!",
  ]

  const [randomMessage, setRandomMessage] = useState("")

  useEffect(() => {
    // Select a random message when the component mounts
    const randomIndex = Math.floor(Math.random() * randomMessages.length)
    setRandomMessage(randomMessages[randomIndex])

    // Prevent scrolling on the body
    document.body.style.overflow = "hidden"

    return () => {
      // Cleanup: restore scrolling when component unmounts
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div className="h-[100dvh] w-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Glow effect under the background */}
      <div className="absolute w-[min(500px,80vw)] h-[min(500px,80vh)] rounded-full bg-[rgb(72,138,182)] opacity-20 blur-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>

      <Card className="w-[min(90vw,400px)] bg-black/80 border-gray-800 relative z-10">
        <CardContent className="p-[min(8vw,2rem)] text-center">
          <h1 className="text-[min(8vw,2.5rem)] font-extrabold text-white mb-[min(4vw,1.5rem)] tracking-tight">
            Coming Soon
          </h1>
          <p className="text-gray-400 mb-[min(6vw,2rem)] text-[min(4vw,1rem)]">
            Web coming soon. Loader still work btw!! idk..
          </p>
          <p className="text-[rgb(72,138,182)] text-[min(3.5vw,0.875rem)] italic opacity-70 mt-[min(6vw,2rem)]">
            {randomMessage}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


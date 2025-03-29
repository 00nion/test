'use client'

import { useState } from 'react';
import { CodeBlock } from '@/components/code-block';

export default function Home() {
  const [scriptVersion, setScriptVersion] = useState('full');
  
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
    "."
  ];
  
  // Get a random message
  const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  
  const getCodeSnippet = () => {
    return `loadstring(game:HttpGet("https://alt-lol.vercel.app/api/script/${scriptVersion}"))()`;
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] font-['Roboto',sans-serif] overflow-auto scrollbar-hide">
      {/* Animated glow */}
      <div className="fixed w-[500px] h-[500px] rounded-full bg-[rgb(72,138,182)] opacity-20 blur-[100px] animate-pulse-slow"></div>
      
      {/* Main content card - fixed width */}
      <div className="relative z-10 w-[500px] max-w-[90vw] my-10">
        <div 
          className="rounded-xl border border-[rgb(60,60,60)] hover:border-[rgb(72,138,182)] bg-[rgba(30,30,30,0.65)] backdrop-blur-sm p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(72,138,182,0.3)]"
        >
          {/* Noise overlay with adjusted transparency */}
          <div className="absolute inset-0 bg-noise opacity-[0.1] mix-blend-soft-light"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-white mb-4">web not availible</h1>
            
            <p className="text-gray-300 mb-6">
              web on for loadstring only. planning on adding web interface soon? (if web down temporary then use github loadsting &lt;33)
            </p>
            
            {/* Version Selector Dropdown */}
            <div className="mb-4">
              <label htmlFor="version-select" className="block text-sm font-medium text-gray-400 mb-2">
                script ver
              </label>
              <div className="relative">
                <select
                  id="version-select"
                  value={scriptVersion}
                  onChange={(e) => setScriptVersion(e.target.value)}
                  className="block w-full bg-[#18191c] border border-[#2b2d31] hover:border-[rgb(72,138,182)] rounded-md py-2 pl-3 pr-10 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-[rgb(72,138,182)] focus:border-[rgb(72,138,182)] transition-colors"
                >
                  <option value="full">full</option>
                  <option value="lite">lite</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Code Block using the new component */}
            <CodeBlock 
              code={getCodeSnippet()} 
              language="lua" 
              className="mb-6"
            />
            
            <p className="text-sm text-[rgb(72,138,182)] italic">
              {randomMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
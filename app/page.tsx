'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [scriptVersion, setScriptVersion] = useState('full');
  
  // Prevent scrolling but allow pull-to-refresh
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
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
    return `loadstring(game:HttpGet("https://your-domain.vercel.app/api/script/${scriptVersion}"))()`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0f0f0f] font-['Roboto',sans-serif] overflow-hidden">
      {/* Animated glow */}
      <div className="fixed w-[500px] h-[500px] rounded-full bg-[rgb(72,138,182)] opacity-20 blur-[100px] animate-pulse-slow"></div>
      
      {/* Main content card - fixed width */}
      <div className="relative z-10 w-[500px] max-w-[90vw]">
        <div 
          className="rounded-xl border border-[rgb(60,60,60)] bg-[rgba(30,30,30,0.65)] backdrop-blur-sm p-8 relative overflow-hidden"
          style={{
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Noise overlay with adjusted transparency */}
          <div className="absolute inset-0 bg-noise opacity-[0.85] mix-blend-soft-light"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-white mb-4">Roblox Script API</h1>
            
            <p className="text-gray-300 mb-6">
              This service provides script execution for Roblox via loadstring.
              There is no public web interface available for regular users.
            </p>
            
            {/* Version Selector Dropdown */}
            <div className="mb-4">
              <label htmlFor="version-select" className="block text-sm font-medium text-gray-400 mb-2">
                Script Version
              </label>
              <div className="relative">
                <select
                  id="version-select"
                  value={scriptVersion}
                  onChange={(e) => setScriptVersion(e.target.value)}
                  className="block w-full bg-[#18191c] border border-[#2b2d31] rounded-md py-2 pl-3 pr-10 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#5865f2] focus:border-[#5865f2]"
                >
                  <option value="full">Full Version</option>
                  <option value="lite">Lite Version</option>
                  <option value="frweerobux">Free Robux</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Discord-style Code Block */}
            <div className="bg-[#18191c] rounded-md mb-6 overflow-hidden relative">
              <pre className="text-sm font-mono p-4 overflow-x-auto">
                <code>
                  <span className="text-[#f47067]">loadstring</span>
                  <span className="text-white">(</span>
                  <span className="text-[#dcbdfb]">game</span>
                  <span className="text-white">:</span>
                  <span className="text-[#6cb6ff]">HttpGet</span>
                  <span className="text-white">(</span>
                  <span className="text-[#96d0ff]">{`"https://your-domain.vercel.app/api/script/${scriptVersion}"`}</span>
                  <span className="text-white">)</span>
                  <span className="text-white">)</span>
                  <span className="text-white">()</span>
                </code>
              </pre>
              <button 
                onClick={copyToClipboard}
                className="absolute top-3 right-3 text-gray-400 hover:text-white bg-[#2b2d31] hover:bg-[#3a3c42] p-1.5 rounded transition-colors"
                aria-label="Copy code"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>
            
            <p className="text-sm text-[rgb(72,138,182)] italic">
              {randomMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Home() {
  const randomMessages = [
    "helo",
    "hmm, idk",
    "me is sigma",
    "uhh...",
    "idk what to say tbh",
    "erm this kinda.. idk what to say"
  ];
  
  // Get a random message
  const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] font-['Roboto',sans-serif] relative overflow-hidden">
      {/* Animated glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[rgb(72,138,182)] opacity-20 blur-[100px] animate-pulse-slow"></div>
      
      {/* Main content card */}
      <div className="relative z-10 max-w-md w-full mx-4">
        <div 
          className="rounded-xl border border-[rgb(60,60,60)] bg-[rgba(30,30,30,0.65)] backdrop-blur-sm p-8 relative overflow-hidden"
          style={{
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.94] mix-blend-soft-light"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-white mb-4">Roblox Script API</h1>
            
            <p className="text-gray-300 mb-6">
              This service provides script execution for Roblox via loadstring.
              There is no public web interface available for regular users.
            </p>
            
            {/* Code Block */}
            <div className="bg-[#1a1a1a] rounded-md p-4 mb-6 overflow-x-auto">
              <pre className="text-sm text-gray-300 font-mono">
                <code>{`loadstring(game:HttpGet("https://alternativelol.vercel.app/api/script/full"))()`}</code>
              </pre>
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
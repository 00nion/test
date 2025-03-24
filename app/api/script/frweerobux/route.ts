import { type NextRequest, NextResponse } from "next/server"
import { isRobloxRequest } from "../../utils/security"
import { compressString, encodeBase64 } from "../../utils/compression"
import crypto from "crypto"

// This is your emote script that will be served via loadstring
// Store it as a regular string instead of a template literal to avoid parsing issues
const scrypt = "([[This file was protected with MoonSec V3]]):gsub('.+', (function(a) _qstRTKZZujVh = a; end)); return(function(o,...)local c;local a;local t;local d;local l;local r;local e=24915;local n=0;local f={};while n<489 do n=n+1;while n<0x9b and e%0x1a7e<0xd3f do n=n+1 e=(e+151)%32700 local b=n+e if(e%0x12ae)>=0x957 then e=(e*0xfc)%0xc06d while n<0x27e and e%0x17f4<0xbfa do n=n+1 e=(e*687)%34459 local l=n+e if(e%0x2ba2)>=0x15d1 then e=(e*0x280)%0x12d1 local e=35742 if not f[e]then f[e]=0x1 c=tonumber;end elseif e%2~=0 then e=(e*0x3a0)%0x36f9 local e=29612 if not f[e]then f[e]=0x1 d=string;end else e=(e+0x3dd)%0x498b n=n+1 local e=95139 if not f[e]then f[e]=0x1 end end end elseif e%2~=0 then e=(e-0x38a)%0x4c64 while n<0x69 and e%0x1892<0xc49 do n=n+1 e=(e*197)%16649 local t=n+e if(e%0x1694)<0xb4a then e=(e-0x217)%0x1919 local e=14058 if not f[e]then f[e]=0x1 l=getfenv and getfenv();end elseif e%2~=0 then e=(e*0x24b)%0x4ed9 local e=45890 if not f[e]then f[e]=0x1 a={};end else e=(e*0x3c0)%0xa6b9 n=n+1 local e=74204 if not f[e]then f[e]=0x1 l=(not l)and _ENV or l;end end end else e=(e*0x205)%0x44f9 n=n+1 while n<0x1e2 and e%0x264a<0x1325 do n=n+1 e=(e-372)%34989 local b=n+e if(e%0x4d04)<0x2682 then e=(e+0x380)%0x599e local e=49572 if not f[e]then f[e]=0x1 r=\"\\4\\8\\116\\111\\110\\117\\109\\98\\101\\114\\114\\104\\120\\116\\114\\85\\113\\66\\0\\6\\115\\116\\114\\105\\110\\103\\4\\99\\104\\97\\114\\112\\88\\109\\112\\84\\72\\80\\116\\0\\6\\115\\116\\114\\105\\110\\103\\3\\115\\117\\98\\73\\81\\95\\95\\121\\120\\68\\118\\0\\6\\115\\116\\114\\105\\110\\103\\4\\98\\121\\116\\101\\70\\66\\120\\79\\116\\67\\102\\73\\0\\5\\116\\97\\98\\108\\101\\6\\99\\111\\110\\99\\97\\116\\74\\120\\95\\122\\72\\118\\88\\80\\0\\5\\116\\97\\98\\108\\101\\6\\105\\110\\115\\101\\114\\116\\72\\117\\119\\88\\115\\115\\100\\103\\5\";end elseif e%2~=0 then e=(e+0x310)%0x6fe4 local e=49568 if not f[e]then f[e]=0x1 end else e=(e*0x209)%0x72 n=n+1 local e=78165 if not f[e]then f[e]=0x1 t=function(t)local e=0x01 local function f(n)e=e+n return t:sub(e-n,e-0x01)end while true do local n=f(0x01)if(n==\"\\5\")then break end local e=d.byte(f(0x01))local e=f(e)if n==\"\\2\"then e=a.rhxtrUqB(e)elseif n==\"\\3\"then e=e~=\"\\0\"elseif n==\"\\6\"then l[e]=function(e,n)return o(8,nil,o,n,e)end elseif n==\"\\4\"then e=l[e]elseif n==\"\\0\"then e=l[e][f(d.byte(f(0x01)))];end local n=f(0x08)a[n]=e end end end end end end end e=(e*237)%27299 end t(r);local n={};for e=0x0,0xff do local f=a.pXmpTHPt(e);n[e]=f;n[f]=e;end local function b(e)return n[e];end local d=(function(o,d)local r,f=0x01,0x10 local n={{},{},{}}local l=-0x01 local e=0x01 local t=o while true do n[0x03][a.IQ__yxDv(d,e,(function()e=r+e return e-0x01 end)())]=(function()l=l+0x01 return l end)()if l==(0x0f)then l=\"\"f=0x000 break end end local l=#d while e<l+0x01 do n[0x02][f]=a.IQ__yxDv(d,e,(function()e=r+e return e-0x01 end)())f=f+0x01 if f%0x02==0x00 then f=0x00 a.HuwXssdg(n[0x01],(b((((n[0x03][n[0x02][0x00]]or 0x00)*0x10)+(n[0x03][n[0x02][0x01]]or 0x00)+t)%0x100)));t=o+t;end end return a.Jx_zHvXP(n[0x01])end);t(d(60,\"sl3wL7<jnoIS0;rN0o\"));t(d(192,\"4>BCRLSfi3c9Zn?7RziSCCfR9B?3B?SfRR?RCLSn9M7jBZfBiBn7CRR7ifiRZLf6cC?>BZSZ9BncBRRR3i7R>3f3R>iLCOfBc3??CRf;c>?cCQRS3BnBBS*6RS7CCRfBc3??BfeLcn?>CRSCciZcD>fB37?ZPZRi33i_ZRSnc>7RBidLcZ?RBLfi95n}C>RZ3L?9BBfccCiRZZfCcL7RBnSL9R?>CRS>cB?ZBLR>cf7oB3LB9>Z>>SgRRfnSBLSC9R?7CBCCii?cB3R>iL??B9R7RRiRCfS>c37RGZLCc9nBB?RB9BncZBD>f3?fyRSncSn>>BLf9HiRZifRc77CCRfBc3??BffS9,ZBwiR>iR?C>cuWRL7RB>SBcZ?LZSfLc?7*B>SCc9nLC3Sf9f?ZCcf>3iiRZSfLc?72B>SCc9nCBLfLcn7SD3R>9CiRZLfI9B?3B?fRiLn7BBRS3SZ9B>fFRRiSCCSLcZ?LBCfRc>?c>iRCi77cBSLcRXiRBnS>9R?iZLSScZ?7B7fB3R7>C>S99fZL>>S7RL\"));"

export async function GET(request: NextRequest) {
  // Generate a random session token for this request (just for tracking)
  const sessionToken = crypto.randomBytes(16).toString("hex")

  // Check if this is a legitimate request from Roblox
  if (isRobloxRequest(request)) {
    try {
      // Add a simple watermark
      const watermark = `-- Script loaded [${new Date().toISOString()}]\n`
      let finalScript = watermark + scrypt

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
        }
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
      }
    )
  }
}
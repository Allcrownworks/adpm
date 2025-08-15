// // app/page.tsx
// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import Signup from './signup/page'; // Import your signup component

// export default function Home() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [showSignup, setShowSignup] = useState(false);
//   const loopCountRef = useRef(0);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handleVideoEnd = () => {
//       loopCountRef.current += 1;
      
//       if (loopCountRef.current >= 2) {
//         video.pause();
//         setShowSignup(true);
//       } else {
//         video.currentTime = 0;
//         video.play().catch(e => console.log('Video replay failed:', e));
//       }
//     };

//     const handleCanPlay = () => {
//       video.play().catch(e => console.log('Autoplay blocked:', e));
//     };

//     video.addEventListener('ended', handleVideoEnd);
//     video.addEventListener('canplay', handleCanPlay);
//     video.load();

//     return () => {
//       video.removeEventListener('ended', handleVideoEnd);
//       video.removeEventListener('canplay', handleCanPlay);
//     };
//   }, []);

//   return (
//     <main className="relative h-screen w-full overflow-hidden">
//       {/* Video Background */}
//       <div className={`absolute inset-0 transition-all duration-500 ${showSignup ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
//         <video
//           ref={videoRef}
//           src="/complete3.mp4"
//           autoPlay
//           muted
//           playsInline
//           className="w-full h-full object-fill object-center"
//           preload="auto"
//         />
//         {/* Dark overlay */}
//         {/* <div className="absolute inset-0 bg-black/30"></div> */}
        
//         {/* Skip button */}
//         {!showSignup && (
//           <button 
//             onClick={() => setShowSignup(true)}
//             className="absolute bottom-8 right-8 z-20 px-4 py-2 bg-white/20 text-white rounded-lg backdrop-blur-sm hover:bg-white/30 transition"
//           >
//             Skip Intro
//           </button>
//         )}
//       </div>

//       {/* Signup Page - Shows after 2 video loops */}
//       <div className={`absolute inset-0 transition-opacity duration-500 ${showSignup ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
//         <Signup /> {/* Your actual signup component */}
//       </div>
//     </main>
//   );
// }



// app/page.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Signup from './signup/page';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const loopCountRef = useRef(0);

  // Handle video playback with user interaction
  const handleUserInteraction = () => {
    setHasInteracted(true);
    const video = videoRef.current;
    if (video) {
      video.play().catch(e => console.log('Playback failed:', e));
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      loopCountRef.current += 1;
      
      if (loopCountRef.current >= 2) {
        video.pause();
        setShowSignup(true);
      } else {
        video.currentTime = 0;
        video.play().catch(e => console.log('Video replay failed:', e));
      }
    };

    video.addEventListener('ended', handleVideoEnd);

    // Try autoplay for desktop browsers
    if (!isMobile()) {
      video.play().catch(e => console.log('Autoplay blocked:', e));
    }

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [hasInteracted]);

  // Helper function to detect mobile devices
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  return (
    <main 
      className="relative h-screen w-full overflow-hidden"
      onClick={handleUserInteraction} // Capture any click to start playback
    >
      {/* Video Background */}
      <div className={`absolute inset-0 transition-all duration-500 ${showSignup ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        <video
          ref={videoRef}
          src="/complete3.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-fill object-center"
          preload="auto"
          poster="/video-poster.jpg" // Add a poster image
        />
        
        {/* Play button overlay for mobile */}
        {!hasInteracted && isMobile() && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
            <button 
              onClick={handleUserInteraction}
              className="px-8 py-4 bg-white/90 text-black rounded-full text-lg font-bold flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play Video
            </button>
          </div>
        )}

        {/* Skip button */}
        {hasInteracted && !showSignup && (
          <button 
            onClick={() => setShowSignup(true)}
            className="absolute bottom-8 right-8 z-20 px-4 py-2 bg-white/20 text-white rounded-lg backdrop-blur-sm hover:bg-white/30 transition"
          >
            Skip Intro
          </button>
        )}
      </div>

      {/* Signup Page */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showSignup ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
        <Signup />
      </div>
    </main>
  );
}
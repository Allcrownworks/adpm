// app/page.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Signup from './signup/page'; // Import your signup component

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSignup, setShowSignup] = useState(false);
  const loopCountRef = useRef(0);

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

    const handleCanPlay = () => {
      video.play().catch(e => console.log('Autoplay blocked:', e));
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('canplay', handleCanPlay);
    video.load();

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden">
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
        />
        {/* Dark overlay */}
        {/* <div className="absolute inset-0 bg-black/30"></div> */}
        
        {/* Skip button */}
        {!showSignup && (
          <button 
            onClick={() => setShowSignup(true)}
            className="absolute bottom-8 right-8 z-20 px-4 py-2 bg-white/20 text-white rounded-lg backdrop-blur-sm hover:bg-white/30 transition"
          >
            Skip Intro
          </button>
        )}
      </div>

      {/* Signup Page - Shows after 2 video loops */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showSignup ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
        <Signup /> {/* Your actual signup component */}
      </div>
    </main>
  );
}
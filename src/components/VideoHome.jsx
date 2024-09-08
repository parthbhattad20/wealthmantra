import React, { useEffect, useRef } from "react";

export const VideoHome = () => {
    const videoref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (videoref.current) {
                        if (entry.isIntersecting) {
                            videoref.current.play(); // Play video when it enters the viewport
                        } else {
                            videoref.current.pause(); // Pause video when it leaves the viewport
                        }
                    }
                });
            },
            { threshold: 0.5 } // Play when 50% of the video is visible
        );

        if (videoref.current) {
            observer.observe(videoref.current);
        }

        return () => {
            if (videoref.current) {
                observer.unobserve(videoref.current); // Clean up the observer on unmount
            }
        };
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 items-center text-center">

                {/* Video Container */}
                <div className="relative mb-10">
                    <div className="absolute inset-0 bg-black opacity-40 rounded-lg z-10"></div>
                    <video
                        poster="./Working.png"
                        ref={videoref}
                        src="./video.mp4"
                        className="w-full max-w-11xl h-auto object-cover rounded-lg z-20 relative"
                        controls
                    />
                </div>
            </div>
        </div>
    );
};

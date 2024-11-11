import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function GoDownButton() {

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ScrollButton = () => {
        useEffect(() => {
            ScrollTrigger.create({
                trigger: "#menuAncre",
            });
        }, []);
    }

    const handleScrollToTarget = () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: "#menuAncre", offsetY: 100 },
        });
    }

    return (
        <div onClick={handleScrollToTarget} className="fixed right-6 bottom-6 rounded-full bg-green-600 cursor-pointer">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v13M5 12l7 7 7-7" /></svg>
        </div>
    )
}

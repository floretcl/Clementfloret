import {useEffect} from "react";

export default function ParallaxEffect() {
    useEffect(() => {
        const mouseEffect = (event) => {
            const mouseX = event.clientX / window.innerWidth;
            const mouseY = event.clientY / window.innerHeight;

            const offsetX = mouseX - 0.5;
            const offsetY = mouseY - 0.5;

            parallaxElement.style.backgroundPosition = `${50 + offsetX}% ${50 + offsetY}%`;
        }

        const scrollEffect = () => {
            const scrollPosition = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;

            const scrollFactor = scrollPosition / maxScroll;
            const offsetY = scrollFactor * 3;

            parallaxElement.style.backgroundPosition = `50% ${50 + offsetY}%`;
        }

        const parallaxElement = document.querySelector('.parallax-effect');
        document.addEventListener('mousemove', (event) => {
            mouseEffect(event);
        });

        window.addEventListener('scroll', () => {
            scrollEffect();
        });

        return () => {
            document.removeEventListener('mousemove', () => {})
            document.removeEventListener('scroll', () => {})
        }
    })
}
import {useEffect, useRef, useState} from "react";

export default function Cursor({mousePosition}) {
    const [positionBigBall, setPositionBigBall] = useState({
        x: 0,
        y: 0
    })
    const [positionSmallBall, setPositionSmallBall] = useState({
        x: 0,
        y: 0
    })
    const [hover, setHover] = useState(false);

    const cursorRef = useRef(null);

    // Position cible
    const targetPositionBigBall = useRef({x: 0, y: 0});
    const targetPositionSmallBall = useRef({x: 0, y: 0});

    // Dernière position pour le calcul de l'animation
    const lastPositionBigBall = useRef({x: 0, y: 0});
    const lastPositionSmallBall = useRef({x: 0, y: 0});

    useEffect(() => {
        const updateTargetPosition = (targetPosition) => {
            targetPosition.current = {x: mousePosition.x, y: mousePosition.y};
        };

        updateTargetPosition(targetPositionBigBall);
        updateTargetPosition(targetPositionSmallBall);
    }, [mousePosition]);

    useEffect(() => {
        const animateCursor = () => {
            const dxBigBall = targetPositionBigBall.current.x - lastPositionBigBall.current.x;
            const dyBigBall = targetPositionBigBall.current.y - lastPositionBigBall.current.y;
            const distBigBall = Math.sqrt(dxBigBall * dxBigBall + dyBigBall * dyBigBall);

            const dxSmallBall = targetPositionSmallBall.current.x - lastPositionSmallBall.current.x;
            const dySmallBall = targetPositionSmallBall.current.y - lastPositionSmallBall.current.y;
            const distSmallBall = Math.sqrt(dxSmallBall * dxSmallBall + dySmallBall * dySmallBall);

            // Vitesse de l'animation
            const speedBigBall = 0.0175;
            const speedSmallBall = 0.1;

            if (distBigBall > 0.1) {
                lastPositionBigBall.current.x += dxBigBall * speedBigBall;
                lastPositionBigBall.current.y += dyBigBall * speedBigBall;

                setPositionBigBall({
                    x: lastPositionBigBall.current.x,
                    y: lastPositionBigBall.current.y,
                });
            }

            if (distSmallBall > 0.1) {
                lastPositionSmallBall.current.x += dxSmallBall * speedSmallBall;
                lastPositionSmallBall.current.y += dySmallBall * speedSmallBall;

                setPositionSmallBall({
                    x: lastPositionSmallBall.current.x,
                    y: lastPositionSmallBall.current.y,
                });
            }

            requestAnimationFrame(animateCursor);
        };

        animateCursor();
    }, []);

    useEffect(() => {
        const handleMouseEnter = () => {
            setHover(true);
        };

        const handleMouseLeave = () => {
            setHover(false);
        };

        const hoverableElements = document.querySelectorAll('.hoverable');

        hoverableElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            hoverableElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <div ref={cursorRef} className={`cursor`}>
            <div className={`cursor__ball ${hover ? "cursor__ball--big-hover" : "cursor__ball--big"}`}
                 style={{left: positionBigBall.x - 20, top: positionBigBall.y - 20}}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.91154 11.2887L20 2.57735L35.0885 11.2887V28.7113L20 37.4226L4.91154 28.7113V11.2887Z"
                          fill="currentColor"/>
                </svg>
            </div>

            <div className={`cursor__ball ${hover ? "cursor__ball--small-hover" : "cursor__ball--small"}`}
                 style={{left: positionSmallBall.x - 5.5, top: positionSmallBall.y - 11}}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 1L9.39711 3.25V7.75L5.5 10L1.60289 7.75V3.25L5.5 1Z" fill="currentColor"/>
                </svg>
            </div>
        </div>
    );
}
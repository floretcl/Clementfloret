import {useEffect, useRef, useState} from "react";
import Cursor from "../Cursor/Cursor.jsx";

export default function MouseEvents() {
    const bodyRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    useEffect(() => {
        function moveBackground(event) {
            if (bodyRef) {
                bodyRef.current.style.backgroundPositionX = `-${event.clientX / 20}px`;
                bodyRef.current.style.backgroundPositionY = `-${event.clientY / 20}px`;
            }
        }

        function handleMouseMove(event) {
            setMousePosition({x: event.clientX, y: event.clientY});
            moveBackground(event)
        }

        bodyRef.current = document.body;
        document.addEventListener('mousemove', handleMouseMove);
    }, []);

    return(
        <Cursor mousePosition={mousePosition}/>
    );
}
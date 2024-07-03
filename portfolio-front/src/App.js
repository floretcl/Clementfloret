import Header from "./components/Header";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Project from "./components/Project";
import {useContext, useEffect, useRef, useState} from "react";
import {DarkModeContext} from "./DarkModeProvider";

function App() {
    const {darkMode} = useContext(DarkModeContext);
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    const [scrollDown, setScrollDown] = useState(true);
    const [smallFooter, setSmallFooter] = useState(false);
    const [preload, setPreload] = useState(true);
    const bodyRef = useRef(null);

    function timeoutPreload () {
        setTimeout(() => {
            setPreload(false);
        }, 500);
    }

    function moveBackground(x, y) {
        if (bodyRef) {
            bodyRef.current.style.backgroundPositionX = `-${x / 20}px`;
            bodyRef.current.style.backgroundPositionY = `-${y / 20}px`;
        }
    }

    function handleMouseMove(event) {
        setMousePosition({x: event.clientX, y: event.clientY});
        moveBackground(event.clientX, event.clientY);
    }

    function handleScroll(event) {
        const scrollPosition = window.scrollY;
        if (scrollPosition >= 50) {
            setScrollDown(true);
        } else {
            setScrollDown(false);
        }
    }

    useEffect(() => {
        bodyRef.current = document.body;

        timeoutPreload()

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            onMouseMove={(event) => handleMouseMove(event)}
            className={`app ${darkMode ? "dark-theme" : ""} ${preload ? "preload" : ""}`}
        >
            <Header scrollDown={scrollDown}/>
            <Project/>
            <Footer small={smallFooter}/>
            <Cursor mousePosition={mousePosition}/>
        </div>
    );
}

export default App;

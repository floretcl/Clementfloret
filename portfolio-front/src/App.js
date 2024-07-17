import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cursor from "./components/Cursor/Cursor";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Project from "./components/Project";
import {useContext, useEffect, useRef, useState} from "react";
import {ThemeContext} from "./ThemeProvider";

function App() {
    const {theme} = useContext(ThemeContext);
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    const [scrollDown, setScrollDown] = useState(true);
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

    function handleScroll() {
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

        if ((theme === "dark") && bodyRef) {
          bodyRef.current.classList.add("theme-dark");
        } else {
          bodyRef.current.classList.remove("theme-dark");
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [theme]);

    return (
        <div
            onMouseMove={(event) => handleMouseMove(event)}
            className={`app ${preload ? "preload" : ""}`}
        >
            <Header homeUrl={"#"} scrollDown={scrollDown}/>
            <Project/>
            <Footer contactUrl={"#"} small={false}/>
            <Cursor mousePosition={mousePosition}/>
        </div>
    );
}

export default App;

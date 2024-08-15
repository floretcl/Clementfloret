import {useContext, useEffect, useRef, useState} from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {ThemeContext} from "./ThemeProvider.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Cursor from "./components/Cursor/Cursor.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Projects from "./components/Projects.jsx";
import Project from "./components/Project.jsx";
import './fonts.css'
import './styles/App.scss'

function App() {
    const {theme} = useContext(ThemeContext);
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    const [scrollDown, setScrollDown] = useState(true);
    const [preload, setPreload] = useState(true);
    const bodyRef = useRef(null);


    function timeoutPreload() {
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
            <Header scrollDown={scrollDown}/>
            <Router>
                <Routes>
                    <Route path="/:lang/" element={<><Home/><Footer small={true}/></>}/>
                    <Route path="/:lang/about" element={<><About/><Footer small={false}/></>}/>
                    <Route path="/:lang/projects" element={<><Projects/> <Footer small={false}/></>}/>
                    <Route path="/:lang/projects/:type" element={<><Projects/> <Footer small={false}/></>}/>
                    <Route path="/:lang/project/:id" element={<><Project/> <Footer small={false}/></>}/>
                    <Route path="/:lang/contact" element={<><Contact/> <Footer small={false}/></>}/>
                    <Route path="*" element={<Navigate to="/en/" replace={true}/>}/>
                </Routes>
            </Router>
            <Cursor mousePosition={mousePosition}/>
        </div>
    );
}

export default App

import Header from "./components/Header";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import {useEffect, useRef, useState} from "react";

function App() {
    const [onHomePage, setOnHomePage] = useState(false)
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    const bodyRef = useRef(null);

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

    useEffect(() => {
        bodyRef.current = document.body;
    }, []);

    return (
        <div
            onMouseMove={(event) => handleMouseMove(event)}
            className={`app ${onHomePage ? "app--screen" : ""}`}>
            <Header />
            {onHomePage ? <Home /> : <Projects />}
            <Footer onHomePage={onHomePage}/>
            <Cursor mousePosition={mousePosition}/>
        </div>
    );
}

export default App;

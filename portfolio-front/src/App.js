import Header from "./components/Header";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import {useState} from "react";

function App() {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });

    function moveBackground(x, y) {
        document.body.style.backgroundPositionX = -(x/20) + "px";
        document.body.style.backgroundPositionY = -(y/20) + "px";
    }

    function handleMouseMove(event) {
        setMousePosition({x: event.pageX, y: event.pageY});
        moveBackground(event.pageX, event.pageY);
    }

    return (
        <div onMouseMove={(event) => handleMouseMove(event)} className="app">
            <Header />
            <Footer />
            <Cursor mousePosition={mousePosition}/>
        </div>
    );
}

export default App;

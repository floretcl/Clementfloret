import {useContext, useEffect, useRef, useState} from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {ThemeContext} from "./ThemeProvider.jsx";
import MouseEvents from "./components/MouseEvents/MouseEvents.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Projects from "./components/Projects.jsx";
import Project from "./components/Project.jsx";
import './fonts.css'
import './styles/App.scss'

function App() {
    const {theme} = useContext(ThemeContext);
    const bodyRef = useRef(null);
    const [scrollDown, setScrollDown] = useState(true);
    const [preload, setPreload] = useState(true);
    const [portfolio, setPortfolio] = useState({});
    const [portfolioLinks, setPortfolioLinks] = useState(null);

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

        fetchPortfolio();
        fetchPortfolioLinks();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [theme]);

    function timeoutPreload() {
        setTimeout(() => {
            setPreload(false);
        }, 500);
    }

    function handleScroll() {
        const scrollPosition = window.scrollY;
        if (scrollPosition >= 50) {
            setScrollDown(true);
        } else {
            setScrollDown(false);
        }
    }

    function fetchPortfolio() {
        const pathName = window.location.pathname;
        const langPrefix = pathName.startsWith('/fr/') ? '/fr' : pathName.startsWith('/en/') ? '/en' : '';
        const url = `${langPrefix}/api/portfolio`;

        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: 'same-origin',
            cache: 'default',
        };

        fetch(url, init)
            .then(response => response.json())
            .then(data => {
                setPortfolio(data);
            })
            .catch(error => {
                console.log(`Error getting portfolio data: ${error}`);
            });
    }

    function fetchPortfolioLinks() {
        const pathName = window.location.pathname;
        const langPrefix = pathName.startsWith('/fr/') ? '/fr' : pathName.startsWith('/en/') ? '/en' : '';
        const url = `${langPrefix}/api/portfolio_links`;

        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: 'same-origin',
            cache: 'default',
        };

        fetch(url, init)
            .then(response => response.json())
            .then(data => {
                setPortfolioLinks(data);
            })
            .catch(error => {
                console.log(`Error getting portfolio links data: ${error}`);
            });
    }

    return (
        <div className={`app ${preload ? "preload" : ""}`}>
            <Router>
                <Header scrollDown={scrollDown}/>
                <Routes>
                    <Route
                        path="/:lang/"
                        element={<Home portfolio={portfolio} portfolioLinks={portfolioLinks} />}/>
                    <Route
                        path="/:lang/about"
                        element={<About portfolio={portfolio} />}/>
                    <Route
                        path="/:lang/projects/:type?"
                        element={<Projects/>}/>
                    <Route
                        path="/:lang/project/:id"
                        element={<Project/>}/>
                    <Route
                        path="/:lang/contact"
                        element={<Contact email={portfolio.contact_email} />}/>
                    <Route
                        path="*"
                        element={<Navigate to="/en/" replace={true}/>}/>
                </Routes>
                <Footer portfolio={portfolio} portfolioLinks={portfolioLinks} />
            </Router>
            <MouseEvents/>
        </div>
    );
}

export default App

import {useContext, useEffect, useRef, useState} from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import i18n from "i18next";
import {ThemeContext} from "./ThemeContext.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Projects from "./components/Projects.jsx";
import Project from "./components/Project.jsx";
import ParallaxEffect from "./components/ParallaxEffect/ParallaxEffect.jsx";
import './fonts.css'
import './styles/App.scss'
import {ScrollToTop} from "./ScrollToTop.jsx";

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
        const lang = i18n.language;
        const url = `${lang === "en" ? "/en" : ""}/api/portfolio`;

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
        const lang = i18n.language;
        const url = `${lang === "en" ? "/en" : ""}/api/portfolio_links`;

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
        <div className={`app parallax-effect ${preload ? "preload" : ""}`}>
            <Router>
                <ScrollToTop/>
                <Header scrollDown={scrollDown}/>
                    <Routes>
                        <Route
                            path=":lang?"
                            element={<Home portfolio={portfolio} portfolioLinks={portfolioLinks}/>}/>
                        <Route
                            path=":lang?/about"
                            element={<About/>}/>
                        <Route
                            path=":lang?/projects/:type?"
                            element={<Projects/>}/>
                        <Route
                            path=":lang?/project/:id"
                            element={<Project/>}/>
                        <Route
                            path=":lang?/contact"
                            element={<Contact email={portfolio.contact_email}/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/" replace={true}/>}/>
                    </Routes>
                <Footer portfolio={portfolio} portfolioLinks={portfolioLinks}/>
            </Router>
            <ParallaxEffect/>
        </div>
    );
}

export default App

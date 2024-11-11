import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {ThemeContext} from "./ThemeContext.jsx";

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState(() => {
        const prefTheme = localStorage.getItem("theme");
        return prefTheme ? prefTheme : "light";
    });

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        const prefTheme = localStorage.getItem("theme");

        const handleMediaChange = () => {
            if (mediaQueryList.matches) {
                setTheme("dark");
                localStorage.setItem("theme", "dark");
            } else {
                setTheme("light");
                localStorage.setItem("theme", "light");
            }
        }

        if (prefTheme) {
            setTheme(prefTheme);
        } else {
            if (mediaQueryList.matches) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        }

        mediaQueryList.addEventListener("change", handleMediaChange);

        return () => {
            mediaQueryList.removeEventListener("change", handleMediaChange);
        }
    },[]);
    
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node
}

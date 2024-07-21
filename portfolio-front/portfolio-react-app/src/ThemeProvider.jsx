import {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState(() => {
        const prefTheme = localStorage.getItem("theme");
        return prefTheme ? prefTheme : "light";
    });

    function toggleTheme() {
        setTheme((prevTheme) => {
            const nextTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", nextTheme);
            return nextTheme;
        });
    }

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        const prefTheme = localStorage.getItem("theme");

        function handleMediaChange() {
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
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node
}

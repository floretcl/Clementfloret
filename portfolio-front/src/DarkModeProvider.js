import {createContext, useEffect, useState} from "react";

export const DarkModeContext = createContext();

export default function DarkModeProvider({children}) {
    const [darkMode, setDarkMode] = useState(false);
    
    function toggleDarkMode() {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(mediaQueryList.matches);

        function handleMediaChange(event) {
            setDarkMode(mediaQueryList.matches);
        }
        mediaQueryList.addEventListener("change", handleMediaChange);



        return () => {
            mediaQueryList.removeEventListener("change", handleMediaChange);
        }
    },[]);
    
    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
}

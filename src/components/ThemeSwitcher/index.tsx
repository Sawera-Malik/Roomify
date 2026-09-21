import React, { useEffect } from 'react'
import { FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";



function ThemeSwitcher() {
    const [theme, setTheme] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return (

                localStorage.getItem('theme') ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            )
        }
        return "light"
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    return (
        <div className=" mr-5 ml-5" >
            {
                theme === 'dark' ? (
                    <FaMoon size={20} onClick={() => setTheme('light')} />
                ) : (
                    <IoSunnySharp size={20} onClick={() => setTheme('dark')} />
                )
            }

        </div>
    )
}

export default ThemeSwitcher
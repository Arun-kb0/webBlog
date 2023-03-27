import React, { useState, useEffect } from 'react'


const useLocalStorage = (key, initialvalue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialvalue;
        } catch (error) {
            console.log(error)
            return initialvalue
        }
    })


    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)

            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.log(error)
        }
    }
    return [storedValue, setValue]
}


function UseDarkMode() {
    const [enabled, setEnabled] = useLocalStorage('dark-theme')
    const isEnable = typeof enabledState === 'undefined' && enabled

    useEffect(() => {
        const className = 'dark'
        const bodyClass = window.document.body.classList

        isEnable ? bodyClass.add(className) : bodyClass.remove(className)
    })

    return [enabled, setEnabled]
}

export default UseDarkMode
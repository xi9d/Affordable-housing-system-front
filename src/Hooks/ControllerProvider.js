import React, { createContext, useState, useContext } from 'react';

// Create context
const ControllerContext = createContext();

export const ControllerProvider = ({ children }) => {
    const [controller, setController] = useState(false);

    const toggleController = () => {
        setController(prevState => !prevState);
        sessionStorage.setItem("model", controller ? "regular" : "landlord");
    };

    return (
        <ControllerContext.Provider value={{ controller, toggleController }}>
            {children}
        </ControllerContext.Provider>
    );
};


export const useController = () => useContext(ControllerContext);
import React, { createContext, useState } from "react";

// Create Context
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [token,setToken] = useState('');
    const [DocumentId,setDocumentId] = useState('');



    return (
        <StoreContext.Provider value={{ loading, setLoading, token, setToken, DocumentId, setDocumentId}}>
            {children}
        </StoreContext.Provider>
    );
};

import React, { createContext, useState } from "react";

// Create Context
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [DocumentId,setDocumentId] = useState('');
    const [user,setUser] = useState(null)




    return (
        <StoreContext.Provider value={{ loading, setLoading, DocumentId, setDocumentId,user,setUser}}>
            {children}
        </StoreContext.Provider>
    );
};

import React, { createContext, useState } from "react";

// Create Context
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [DocumentId, setDocumentId] = useState("");
    const [user, setUser] = useState(null);
    const [LocalDraftId, setLocalDraftId] = useState([]);
    const [docs, setDocs] = useState([]);

    return (
        <StoreContext.Provider
            value={{
                loading,
                setLoading,
                DocumentId,
                setDocumentId,
                user,
                setUser,
                LocalDraftId,
                setLocalDraftId,
                docs,
                setDocs,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

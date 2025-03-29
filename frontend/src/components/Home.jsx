import DraftCard from "./DraftCard";
import { useEffect } from "react";
import { useState } from "react";
import { StoreContext } from "../GlobalState/StoreContext";
import { useContext } from "react";
import GoogleAuth from "./GoogleAuth";
import CreateDoc from "./CreateDoc";

const Home = () => {
    const { setDocumentId } = useContext(StoreContext);

    const [docs, setDocs] = useState([]);

    // for the first  time creating the doc

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_ENDPOINT}/api/content`,
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const docs = await response.json();
                setDocs(docs);
                console.log(docs);
            } catch (error) {
                console.error("Error fetching documents:", error);
                // Handle the error appropriately (e.g., show an error message to the user)
            }
        };
        fetchDocs();
    }, []);
    return (
        <>
            <div className="flex justify-between px-5 py-10">
                <CreateDoc />
                <GoogleAuth />
            </div>
            <div>
                <h1 className="font-bold m-2 text-2xl ">Drafts</h1>
            </div>
            <div className=" rounded-t-xl">
                {docs.map((doc) => {
                    return (
                        <DraftCard
                            key={doc._id}
                            title={doc.title}
                            id={doc._id}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Home;

import { AiOutlinePlus } from "react-icons/ai";
import DraftCard from "./DraftCard";
import { useEffect } from 'react';
import { IoTerminal } from 'react-icons/io5';
import { useState } from 'react'
import { Link } from "react-router-dom";
import { StoreContext } from '../GlobalState/StoreContext';
import { useContext } from "react";



const Home = () => {

    const { setDocumentId } = useContext(StoreContext)

    const [docs, setDocs] = useState([])

    // for the first  time creating the doc
    async function createDocumentAndSaveId() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/content`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: " ", title: " " })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("created conted id", data.content._id);
            setDocumentId(data.content._id);
        } catch (error) {
            console.error("Error creating document:", error);
            // Handle the error appropriately (e.g., show an error message to the user)
        }
    }

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/content`);

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
            <Link to='/editor'>
                <div className="relative h-60 max-w-44 bg-black ml-5 flex flex-col justify-center items-center hover:blur-xs rounded-lg my-15"
                    onClick={createDocumentAndSaveId}
                >
                    {/* Always Visible Content */}
                    <AiOutlinePlus className="w-10 h-10 text-white relative z-10" />
                    <p className="text-white text-sm mt-2 relative z-10">Create Document</p>


                </div>

            </Link>
            <div>
                <h1 className="font-bold m-2 text-2xl ">Drafts</h1>
            </div>
            <div className=' rounded-t-xl'>
                {
                    docs.map((doc) => {
                        return <DraftCard key={doc._id} title={doc.title} id={doc._id} />
                    })
                }
            </div>
        </>
    )
}

export default Home;
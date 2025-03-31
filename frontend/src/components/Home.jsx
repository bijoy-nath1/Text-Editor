import DraftCard from "./DraftCard";
import { useEffect } from "react";
import { useState } from "react";
import { StoreContext } from "../GlobalState/StoreContext";
import { useContext } from "react";
import GoogleAuth from "./GoogleAuth";
import CreateDoc from "./CreateDoc";
import {getDrafts} from '../utils/localStorage';

const Home = () => {
    const { user } = useContext(StoreContext);

    const [docs, setDocs] = useState([]);

  

    useEffect(() => {
        const fetchDocs = async () => {
            try {

        if(user){
            const drafts = getDrafts();
            if(drafts){
                const result = await Promise.all(drafts.forEach((draft)=>{
                   fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/user`,{
                       method:'post',
                       headers:{
                           "Content-Type":"application/json"
                       },
                       body:JSON.stringify({
                           name:user.displayName,
                           UserGoogleId:user.uid,
                           title:draft.title,
                           text:draft.text,
                       })
                   })
                }))
                setDocs(result);
            }
            
            }
                
           if(user){
               const response = await fetch(
                   `${import.meta.env.VITE_API_ENDPOINT}/api/v1/user/${user.uid}`,
               );

               if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
               }

               const drafts = await response.json();
               setDocs(drafts);
               console.log(docs);
           }
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

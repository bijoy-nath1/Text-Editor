import DraftCard from "./DraftCard";

import { StoreContext } from "../GlobalState/StoreContext";
import { useContext } from "react";
import GoogleAuth from "./GoogleAuth";
import CreateDoc from "./CreateDoc";

const Home = () => {
    const { docs } = useContext(StoreContext);
    

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
                {docs?.map((doc) => {
                    return (
                        <DraftCard
                            key={doc?._id}
                            title={doc?.title}
                            id={doc?._id}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Home;

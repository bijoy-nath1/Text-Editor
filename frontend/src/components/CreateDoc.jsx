import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import {StoreContext} from '../GlobalState/StoreContext';
import { useContext } from "react";
import createLocalDraft from '../utils/localStorage';




const CreateDoc = () =>{
  const {user,setLocalDraftId}= useContext(StoreContext);
  console.log(user);

  async function createDocument() {
    //if user has signed in 

if(user){
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/user`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:user.displayName, UserGoogleId:user.uid})
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("created conted id", data.draft);
    setDocumentId(data.draft._id);
  } catch (error) {
    console.error("Error creating document:", error);
    // Handle the error appropriately (e.g., show an error message to the user)
  }
}else{
    const localDraftId = createLocalDraft();
    setLocalDraftId(localDraftId)
}
  }
  return(
    <Link to='/editor'>
        <div className=" h-60 w-44 bg-black flex flex-col justify-center items-center hover:blur-xs rounded-lg "
            onClick={createDocument}
        >
            {/* Always Visible Content */}
            <AiOutlinePlus className="w-10 h-10 text-white relative z-10" />
            <p className="text-white text-sm mt-2 relative z-10">Create Document</p>


        </div>

    </Link>
  )
}
export default CreateDoc;
import { useState } from 'react';
import GoogleAuth from './GoogleAuth'
import SaveToDatabase from "./SaveToDatabase"
import { useContext } from 'react';
import { StoreContext } from '../GlobalState/StoreContext'
import { useCallback } from "react";
import { debounce } from "lodash";
import {updateDraftTitle}  from '../utils/localStorage';

const Navbar = () => {
  const [title, setTitle] = useState('')
  const {user, setLoading, DocumentId ,LocalDraftId} = useContext(StoreContext);


  const saveToDatabase = useCallback(
    debounce(async (data) => {
      setLoading(true);

      try {
        console.log("document id:", DocumentId)

        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/user`, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: data, draftId: DocumentId }),
        });
        const result = await response.json();
        console.log("Save successful:", result);
      } catch (error) {
        console.error("Error saving content:", error);
      } finally {
        setLoading(false);
      }
    }, 2000), // Wait 2 seconds after user stops typing
    []
  );

  const saveToLocal = useCallback(debounce(async(id,data)=>{
    try{
      updateDraftTitle(id,data)
    }catch(error){
      console.log(error)
    }
  },2000),[])

  function handleChange(e) {
    setTitle(e.target.value)
if(user){
    saveToDatabase(title)
}else{
  saveToLocal(LocalDraftId,title)
}  
  }

  return (
    <div className="h-12 w-full bg-gray-200 rounded-4xl my-4 flex justify-between items-center px-4">
      <textarea
        value={title}
        onChange={handleChange}
        className="w-1/4 h-8 px-2  border-gray-300 rounded-md focus:outline-none border-none"
        placeholder="Enter title..."
      />
      <div className='w-[10%] flex justify-between h-full items-center'>
        <SaveToDatabase />
        <GoogleAuth />
      </div>
    </div>
  )
}
export default Navbar;
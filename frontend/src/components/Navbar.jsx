import { useState } from 'react';
import GoogleAuth from './GoogleAuth'
import SaveToDatabase from "./SaveToDatabase"
import { useContext } from 'react';
import { StoreContext } from '../GlobalState/StoreContext'
import { useCallback } from "react";
import { debounce } from "lodash";

const Navbar = () => {
  const [title, setTitle] = useState('')
  const { setLoading, DocumentId } = useContext(StoreContext)

  const save = useCallback(
    debounce(async (data) => {
      setLoading(true);
      console.log("Saving content to database:", data);

      try {
        console.log("document id:", DocumentId)

        const response = await fetch("https://cuddly-cod-wrvwr7pwqrqvhq6v-8080.app.github.dev/api/content", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: data, contentId: DocumentId }),
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

  function handleChange(e) {
    setTitle(e.target.value)
    save(title)
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
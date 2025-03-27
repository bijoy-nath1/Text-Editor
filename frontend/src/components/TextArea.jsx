import JoditEditor from 'jodit-react';
import { useCallback, useRef,useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from'../GlobalState/StoreContext'
import { debounce } from "lodash";


const TextArea = ()=>{
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const { loading, setLoading, DocumentId } = useContext(StoreContext);

     const save = useCallback(
        debounce(async (data) => {
            setLoading(true);
            console.log("Saving content to database:", data);

            try {
                const response = await fetch("https://cuddly-cod-wrvwr7pwqrqvhq6v-8080.app.github.dev/api/content", {
                    method: "put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: data, contentId: DocumentId }),
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
   
    const handleChange = (newContent) => {
        setContent(newContent)
        save(newContent)

    }
    return(
        <JoditEditor
            ref={editor}
            value={content}
            // config={config}
            // tabIndex={1} // tabIndex of textarea
            // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={handleChange}
        />
    )
}
export default TextArea ;
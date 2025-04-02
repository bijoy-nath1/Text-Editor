import JoditEditor from "jodit-react";
import { useCallback, useRef, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../GlobalState/StoreContext";
import { debounce } from "lodash";
import { updateDraftText } from "../utils/localStorage";

const TextArea = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const { setLoading, DocumentId, user,LocalDraftId } = useContext(StoreContext);

    const saveToDatabase = useCallback(
        debounce(async (data) => {
            setLoading(true);

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_ENDPOINT}/api/v1/user`,
                    {
                        method: "patch",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            text: data,
                            draftId: DocumentId,
                        }),
                    },
                );
                const result = await response.json();
                console.log("Save successful:", result);
            } catch (error) {
                console.error("Error saving content:", error);
            } finally {
                setLoading(false);
            }
        }, 2000), // Wait 2 seconds after user stops typing
        [],
    );

    const saveToLocal = useCallback(
        debounce(async (id, data) => {
            try {
                updateDraftText(id, data);
            } catch (error) {
                console.log(error);
            }
        }, 2000),
        [],
    );

    const handleChange = (newContent) => {
        setContent(newContent);
        if (user) {
            saveToDatabase(newContent);
        } else {
            saveToLocal(LocalDraftId, newContent);
        }
    };
    return <JoditEditor ref={editor} value={content} onChange={handleChange} />;
};
export default TextArea;

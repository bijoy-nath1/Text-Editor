import { FaGoogleDrive } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { FcDocument } from "react-icons/fc";
import { StoreContext } from '../GlobalState/StoreContext';
import { useContext, useState } from "react";

const DraftCard = ({ title, id }) => {

  const { token, setLoading } = useContext(StoreContext);
  const [document, setDocument] = useState({});
  // console.log("token at home:",token)

  const SaveToDrive = async () => {
    if (!token) {
      alert("Please sign in first.");
      return;
    }
    // get the file 
    try {
      console.log(id)
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/content/${id}`)
      const data = await response.json();
      console.log("data", data, response)
      setDocument(data);
      console.log("document state", document)
    } catch (error) {
      console.log(error)
    }


    //upload the file 
    try {
      console.log('Document text:', document.text);
      console.log('Token from draft:', token);

      if (!document.text) {
        alert("No document content available.");
        return;
      }

      setLoading(true);

      // Step 1: Upload metadata and get file ID
      const metadataResponse = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: document.title,  // File name
          mimeType: "text/plain",
          parents: ["root"] // Save to root directory
        }),
      });
      console.log("metadataresponse", metadataResponse)
      const metadata = await metadataResponse.json();
      if (!metadata.id) {
        alert("Failed to create file metadata.");
        return;
      }

      // Step 2: Upload file content
      const uploadResponse = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${metadata.id}?uploadType=media`, {
        method: "PATCH", // Use PATCH to update the file content
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "text/plain", // Set correct file type
        },
        body: document.text // File content
      });

      const uploadData = await uploadResponse.json();
      setLoading(false);

      if (uploadData.id) {
        console.log("File uploaded successfully:", uploadData.id);
      } else {
        alert("Failed to upload.");
      }

    } catch (error) {
      setLoading(false);
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }


  }

  return (
    <div className="min-h-10 max-w-full border-b border-gray-300 flex items-center px-8 py-4 justify-between cursor-pointer 
                    hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out rounded-lg">

      {/* Left Section */}
      <div className="flex gap-2 items-center">
        <FcDocument size={25} />
        <h1 className="text-gray-800 font-medium">{title}</h1>
      </div>

      {/* Right Section */}
      <button className="cursor-pointer"
        onClick={SaveToDrive}
      >
        <FaGoogleDrive color="blue" />
      </button>

    </div>
  )
}

export default DraftCard;
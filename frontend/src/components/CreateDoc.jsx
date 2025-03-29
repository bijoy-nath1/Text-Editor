import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";




const CreateDoc = () =>{
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
  return(
    <Link to='/editor'>
        <div className=" h-60 w-44 bg-black flex flex-col justify-center items-center hover:blur-xs rounded-lg "
            onClick={createDocumentAndSaveId}
        >
            {/* Always Visible Content */}
            <AiOutlinePlus className="w-10 h-10 text-white relative z-10" />
            <p className="text-white text-sm mt-2 relative z-10">Create Document</p>


        </div>

    </Link>
  )
}
export default CreateDoc;
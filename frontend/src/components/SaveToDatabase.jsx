import { IoCloudDoneSharp } from "react-icons/io5";
import { TiArrowSync } from "react-icons/ti";
import { StoreContext } from '../GlobalState/StoreContext'
import { useContext } from "react";
const SaveToDatabase =()=>{
    const { loading, setLoading } = useContext(StoreContext);

    return(
        <div className="flex">
            {
                loading?(
                    <TiArrowSync className="animate-spin text-black" size={24} />
                ):(
                        <IoCloudDoneSharp className="text-green-900" size={24} />

                )
            }
        </div>
    )
}
export default SaveToDatabase ;
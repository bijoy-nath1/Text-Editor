import Navbar from './Navbar'
import TextArea from './TextArea'
import { StoreContext } from '../GlobalState/StoreContext';
import { useContext } from "react";

const TextEditor =()=>{
    const { token, setLoading } = useContext(StoreContext);
    console.log("token at texteditor:",token)
    return(
        <div className='min-h-[100vh] w-full py-5 px-2 '>


            <Navbar  />

            <TextArea  />


        </div>
    )
}
export default TextEditor;
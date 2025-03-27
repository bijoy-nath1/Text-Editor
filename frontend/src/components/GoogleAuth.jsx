import { signInWithGoogle, logOut } from '../Oauth/firebase';
import { useState } from 'react';
import google from '../assets/image.png'
import { useContext } from 'react';
import { StoreContext } from '../GlobalState/StoreContext';

const GoogleAuth = () => {
    const {token,setToken} = useContext(StoreContext);
    const [user,setUser] = useState(null)

    const handleLogin = async () => {
        const response = await signInWithGoogle();
        setToken(response.token);
        console.log("token after login", token)

        setUser(response.user)
    };

    const handleLogOut = async () => {
        await logOut();
        setUser(null);
    };

    return (
        <>
            {user ? (
                <div className="relative group h-10 w-10 rounded-full border border-black flex justify-center items-center m-1 overflow-hidden">
                    {/* Profile Image */}
                    <button
                        onClick={handleLogOut}
                        className="h-full w-full rounded-full flex justify-center items-center cursor-pointer relative"
                    >
                        <img src={user.photoURL} alt="google" className="h-full w-full object-cover rounded-full group-hover:blur-sm transition-all duration-300" />

                        {/* Sign Out Text (Properly Centered) */}
                        <span className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-opacity-60 text-black text-xs  opacity-0 group-hover:opacity-100 transition-all duration-300">
                            Sign Out
                        </span>
                    </button>
                </div>



            ) : (
                <div className='h-[80%] w-10 rounded-full border-1 border-black  flex justify-center items-center m-1'>
                        <button
                            onClick={handleLogin}
                            className="h-10 w-10 rounded-full flex justify-center items-center m-1 cursor-pointer"
                        >
                            <img src={google} alt="google" className="h-3/4 w-3/4 object-contain" />
                        </button>
                </div>
            )}
        </>
    );
};

export default GoogleAuth;

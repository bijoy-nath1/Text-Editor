import { signInWithGoogle, logOut, auth } from '../Oauth/firebase';
import google from '../assets/image.png'
import { useContext } from 'react';
import { StoreContext } from '../GlobalState/StoreContext';

const GoogleAuth = () => {
    const {user,setUser} = useContext(StoreContext);

    const handleLogin = async () => {
         await signInWithGoogle();
        auth.onAuthStateChanged(user => {
            if(user){
                setUser(user);
                localStorage.setItem('user',JSON.stringify(user));
                setUser(user);
            }
        })
        
       

    };

    const handleLogOut = async () => {
        await logOut();
       let user = localStorage.getItem('user');
        user = null;
        localStorage.setItem('user',user);
        setUser(null);
    };

    return (
        <>
            {user ? (
                <div className="relative group h-10 w-10 rounded-full flex justify-center items-center  overflow-hidden">
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
                <div className='h-[80%] w-10 rounded-full    flex justify-center items-center'>
                        <button
                            onClick={handleLogin}
                            className="h-10 w-10 rounded-full flex justify-center items-center  cursor-pointer"
                        >
                            <img src={google} alt="google" className="-full full object-contain rounded-full" />
                        </button>
                </div>
            )}
        </>
    );
};

export default GoogleAuth;

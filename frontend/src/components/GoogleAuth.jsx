import { signInWithGoogle, logOut, auth } from "../Oauth/firebase";
import google from "../assets/image.png";
import { useContext, useCallback } from "react";
import { StoreContext } from "../GlobalState/StoreContext";
import { getDrafts } from "../utils/localStorage";

const GoogleAuth = () => {
    const { user, setUser, setDocs } = useContext(StoreContext);

    const fetchDocs = useCallback(async () => {
        if (!user) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_ENDPOINT}/api/v1/user/${user.uid}`,
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const fetchedDrafts = await response.json();
            console.log("Fetched Drafts from DB:", fetchedDrafts);
            setDocs(fetchedDrafts.result);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    }, [user, setDocs]);

    const syncDrafts = useCallback(async () => {
        console.log("syncDrafts called");

        if (!user) {
            console.log("Function returned");
            return;
        }

        try {
            const { displayName, uid } = user;
            const drafts = getDrafts();

            if (drafts && drafts.length > 0) {
                await Promise.allSettled(
                    drafts.map(async (draft) => {
                        try {
                            const res = await fetch(
                                `${import.meta.env.VITE_API_ENDPOINT}/api/v1/user`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        name: displayName,
                                        userGoogleId: uid,
                                        title: draft.title,
                                        text: draft.text,
                                    }),
                                },
                            );

                            if (!res.ok) {
                                throw new Error(
                                    `Failed to sync draft: ${res.statusText}`,
                                );
                            }

                            return await res.json();
                        } catch (err) {
                            console.error("Error syncing draft:", draft, err);
                        }
                    }),
                );

                localStorage.setItem("drafts", JSON.stringify([]));
            }
            console.log("Drafts added to DB");
            fetchDocs();
        } catch (error) {
            console.error("Error syncing drafts to database:", error);
        }
    }, [user, fetchDocs]);

    const handleLogin = async () => {
        try {
            await signInWithGoogle();

            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    setUser(user);
                    localStorage.setItem("user", JSON.stringify(user));
                    syncDrafts();
                }
            });

            return () => unsubscribe(); // Cleanup listener
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleLogOut = async () => {
        try {
            await logOut();
            localStorage.removeItem("user");
            setUser(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <>
            {user ? (
                <div className="relative group h-10 w-10 rounded-full flex justify-center items-center overflow-hidden">
                    <button
                        onClick={handleLogOut}
                        className="h-full w-full rounded-full flex justify-center items-center cursor-pointer relative"
                    >
                        <img
                            src={user.photoURL}
                            alt="User Profile"
                            className="h-full w-full object-cover rounded-full group-hover:blur-sm transition-all duration-300"
                        />
                        <span className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-opacity-60 text-black text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
                            Sign Out
                        </span>
                    </button>
                </div>
            ) : (
                <div className="h-[80%] w-10 rounded-full flex justify-center items-center">
                    <button
                        onClick={handleLogin}
                        className="h-10 w-10 rounded-full flex justify-center items-center cursor-pointer"
                    >
                        <img
                            src={google}
                            alt="Google Sign-In"
                            className="h-full w-full object-contain rounded-full"
                        />
                    </button>
                </div>
            )}
        </>
    );
};

export default GoogleAuth;

import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup, updateEmail, updatePassword } from "firebase/auth";
import axios from 'axios';

import firebaseConfig from "../services/config";
import { initializeApp } from "firebase/app";
initializeApp(firebaseConfig);

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [authProvider, setAuthProvider] = useState();

    const auth = getAuth();

    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        setLoading(true)
        const subscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setError();
                await getUser(user);
                setAuthProvider(user.providerData[0].providerId);
            } else {
                setUser({})
                setError();
            }
            setLoading(false)
        });
        return subscribe;
    }, [auth])

    const createAccount = (name, email, password) => {
        setLoading(true)
        setError();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(async () => {
                    const user = userCredential.user;
                    setError();
                    const userObj = {
                        fullname: user.displayName,
                        avatar: "defaultAvatar",
                        banner: "defaultBanner",
                        email: user.email,
                        address: '',
                        basket: [],
                        mobile: "",
                        role: 'USER'
                    };
                    await addUser(user.uid, userObj);
                    await getUser(user);
                    setAuthProvider(user.providerData[0].providerId);
                    setSuccess(true);
                }).catch((error) => {
                    setError(error.message);
                })
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    const login = (email, password) => {
        setLoading(true);
        setError();
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                setError();
                await getUser(user);
                setSuccess(true);
                setAuthProvider(user.providerData[0].providerId);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    const googleSignIn = () => {
        setLoading(true);
        setError();
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                const user = result.user;
                setError();
                const userObj = {
                    fullname: user.displayName,
                    avatar: "defaultAvatar",
                    banner: "defaultBanner",
                    email: user.email,
                    address: '',
                    basket: [],
                    mobile: "",
                    role: 'USER'
                };
                await addUser(user.uid, userObj);
                await getUser(user);
                setSuccess(true);
                setAuthProvider(user.providerData[0].providerId);
            }).catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    const updateUser = async (data) => {
        setLoading(false);
        if (data.files.bannerFile) {
            let body = new FormData();
            body.set('key', process.env.REACT_APP_IMGBB_API_KEY);
            body.append('image', data.files.bannerFile);
            body.append('name', data.updates.fullname + 'Banner');

            await axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload',
                data: body
            }).then(res => {
                data.files.bannerFile = res.data.data.display_url;
            }).catch((e) => {
                console.log(e);
            });
        }

        if (data.files.avatarFile) {
            let body = new FormData();
            body.set('key', process.env.REACT_APP_IMGBB_API_KEY);
            body.append('image', data.files.avatarFile);
            body.append('name', data.updates.fullname + 'Avatar');

            await axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload',
                data: body
            }).then(res => {
                data.files.avatarFile = res.data.data.display_url;
            });
        }

        if (data.updates) {
            const userObj = {
                fullname: data.updates.fullname,
                avatar: data.files.avatarFile ? data.files.avatarFile : user.avatar,
                banner: data.files.bannerFile ? data.files.bannerFile : user.banner,
                email: data.credentials?.email ? data.credentials?.email : user.email,
                address: data.updates.address,
                mobile: data.updates.mobile
            }
            addUser(user.uid, userObj)
        }

        if (data.credentials.email) {
            updateEmail(auth.currentUser, data.credentials.email)
                .then(() => {
                    updatePassword(auth.currentUser, data.credentials.password)
                        .then(() => {
                            logout();
                        })
                }).catch((error) => {

                });
        }


    }

    async function addUser(uid, userObj) {
        setError();
        await axios.put('http://localhost:5000/api/users', {
            id: uid,
            user: userObj
        }).then(response => setError())
            .catch(error => {
                setError(error)
            })
    }

    async function getUser(user) {
        await axios.get(`http://localhost:5000/api/users/${user.uid}`)
            .then(res => {
                setUser(res.data[0])
            })
    }

    const logout = () => {
        setError();
        setLoading(true)
        setSuccess(false)
        signOut(auth).then(() => {
            setUser();
            setError();
            setLoading(false)
        }).catch((error) => {
            setError(error.message);
        });
    }

    return {
        user,
        error,
        success,
        loading,
        authProvider,
        createAccount,
        login,
        updateUser,
        logout,
        googleSignIn,
        setError
    }
}
export default useFirebase;
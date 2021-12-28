
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from 'axios';
import firebaseConfig from "./config";
import { initializeApp } from "firebase/app";


class Firebase {
    constructor() {
        initializeApp(firebaseConfig);
        this.auth = getAuth();
  }
    

    googleProvider = new GoogleAuthProvider();

    // useEffect(() => {
    //     // setLoading(true)
    //     const subscribe = onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             setError();
    //         } else {
    //             setUser({})
    //             setError();
    //         }
    //         // setLoading(false)
    //     });
    //     return subscribe;
    // }, [auth])

    getUser = (id) => axios.get(`http://localhost:5000/api/users/${id}`).then(res=>console.log(res))

    createAccount = (email, password) => createUserWithEmailAndPassword(this.auth, email, password);

    login = (email, password) => {
        // setLoading(true);
        signInWithEmailAndPassword(this.auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                // setSuccess(true);
            })
            .catch((error) => {
                console.log(error.message);
            })
            // .finally(() => setLoading(false));
    }

    googleSignIn = () => {
        // setLoading(true);
        signInWithPopup(this.auth,this.googleProvider)
            .then(async (result) => {
                const user = result.user;
                // setSuccess(true);
            }).catch((error) => {
                console.log(error.message);
            })
            // .finally(() => setLoading(false));
    }

    addUser = (id, user) => {
        axios.post('http://localhost:5000/api/users/add', {
            id: id,
            user: user
        }).then(response => response )
            .catch(error => {
                console.log(error.message);
            })
    }

    

    logout = () => {
        signOut(this.auth).then(() => {
            
        }).catch((error) => {
            
        });
    }
}
const firebaseInstance = new Firebase();

export default firebaseInstance;

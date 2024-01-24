import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, addDoc, setDoc } from "firebase/firestore";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      }).catch((error) => {
        console.log(error);
      });

      const docRef = await addDoc(usersCollection, {
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });
      
      updateProfile(auth.currentUser, {
        displayName: values.name,
      });

      this.userLoggedIn = true;
      console.log("USER LOGGEDIN?:", this.userLoggedIn);
    },
    async authenticate(values) {
      signInWithEmailAndPassword(auth, values.email, values.password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        this.userLoggedIn = true;
        console.log("USER LOGGEDIN?:", this.userLoggedIn);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error:", errorCode);
    })},
    async signOut() {
      signOut(auth).then(() => {
        this.userLoggedIn = false;
      }).catch((error) => {
        console.log(error);
      });
    },
  },
});

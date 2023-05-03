
// ! fix needed
const { createUserWithEmailAndPassword, updateProfile,
    signInWithEmailAndPassword, signOut,
    onAuthStateChanged
} = await import('firebase/auth')


const {
    doc, setDoc, getDoc, collection, addDoc,
    updateDoc, arrayUnion, onSnapshot, arrayRemove,
    getDocs, deleteDoc,
    query, where,
    increment, serverTimestamp, orderBy
} = await import("firebase/firestore");

export {
    createUserWithEmailAndPassword, updateProfile, 
    signInWithEmailAndPassword, signOut,onAuthStateChanged,
    doc, setDoc, getDoc, collection, addDoc,
    updateDoc, arrayUnion, onSnapshot, arrayRemove,
    getDocs, deleteDoc,
    query, where, orderBy,
    increment, serverTimestamp
}


const { createUserWithEmailAndPassword, updateProfile,
    signInWithEmailAndPassword, signOut,
    onAuthStateChanged
} = await import('firebase/auth')

const {
    doc, setDoc, getDoc, collection, addDoc,
    updateDoc, arrayUnion, onSnapshot, arrayRemove,
    getDocs, deleteDoc,
    query, where,
    increment, serverTimestamp, orderBy,
    writeBatch, Timestamp,
    QueryEndAtConstraint, endAt, startAt
} = await import("firebase/firestore");

const {
    getDownloadURL, ref, uploadBytesResumable
} = await import('firebase/storage')



export {
    createUserWithEmailAndPassword, updateProfile,
    signInWithEmailAndPassword, signOut, onAuthStateChanged,
    doc, setDoc, getDoc, collection, addDoc, writeBatch,
    updateDoc, arrayUnion, onSnapshot, arrayRemove,
    getDocs, deleteDoc,
    query, where, orderBy, Timestamp,
    increment, serverTimestamp,
    QueryEndAtConstraint, endAt, startAt,
    getDownloadURL, ref, uploadBytesResumable
}

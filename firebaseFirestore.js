import { app } from "./firebaseInit.js";
import { getFirestore, collection, doc, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const database = getFirestore(app);

async function addDocumentWithAutoID(collectionPath, obj) {
	return addDoc(collection(database, collectionPath), obj).then((docRef) => {
		console.log(`DocumentID: ${docRef.id}`);
		return docRef.id
	}).catch((err) => {
		console.log(`Error: ${err}`);
	});
}

async function addDocument(collectionPath, documentName, obj) {
	return setDoc(doc(database, collectionPath, documentName), obj);
}

export { addDocumentWithAutoID, addDocument };
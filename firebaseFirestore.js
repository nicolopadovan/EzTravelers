import { app } from "./firebaseInit.js";
import { getFirestore, collection, doc, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const database = getFirestore(app);

async function addDocumentWithAutoID(collectionName, obj) {
	return addDoc(collection(database, collectionName), obj).then((docRef) => {
		console.log(`DocumentID: ${docRef.id}`);
		return docRef.id
	}).catch((err) => {
		console.log(`Error: ${err}`);
	});
}

async function addDocument(collectionName, documentName, obj) {
	return setDoc(doc(database, collectionName, documentName), obj);
}

export { addDocumentWithAutoID, addDocument };
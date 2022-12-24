import { app } from "./firebaseInit.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const database = getFirestore(app);

async function addDocument(collectionName, obj) {
	return addDoc(collection(database, collectionName), obj).then((docID) => {
		console.log(`DocumentID: ${docID}`);
	}).catch((err) => {
		console.log(`Error: ${err}`);
	});
}

async function addDocument(collectionName, documentID, obj) {
	return addDoc(collection(database, collectionName, documentID), obj).then((document) => {
		// 
	}).catch((err) => {
		//
	});
}

export { addDocument };
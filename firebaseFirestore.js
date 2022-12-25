import { app } from "./firebaseInit.js";
import { getFirestore, collection, doc, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const database = getFirestore(app);

async function addDocumentWithAutoID(collectionPath, obj) {
	return new Promise((resolve, reject) => {
		addDoc(collection(database, collectionPath), obj).then((docRef) => {
			console.log(`DocumentID: ${docRef.id}`);
			resolve(docRef);
		}).catch((error) => {
			console.log(`Error: ${error}`);
			reject(error)
		});
	});
}

async function addDocument(collectionPath, documentName, obj) {
	return new Promise((resolve, reject) => {
		setDoc(doc(database, collectionPath, documentName), obj).then(() => {
			resolve();
		}).catch((error) => {
			reject(error);
		})
	});
}

export { addDocumentWithAutoID, addDocument };
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyAoHPscXLUb52j-PbsakU_TuafJcGNA-3o",
	authDomain: "eztrippers-lq-mvp.firebaseapp.com",
	projectId: "eztrippers-lq-mvp",
	storageBucket: "eztrippers-lq-mvp.appspot.com",
	messagingSenderId: "1089945914767",
	appId: "1:1089945914767:web:b6b759161fc88fe2474ffa"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

function addDocument(collection, obj) {
	addDoc(collection(database, collection), obj).then((docID) => {
		console.log(`DocumentID: ${docID}`);
	}).catch(err => {
		console.log(`Error: ${err}`);
	})
}


export { addDocument };
console.log("1. Loading Module");
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-functions.js";

const firebaseConfig = {
	apiKey: "AIzaSyAoHPscXLUb52j-PbsakU_TuafJcGNA-3o",
	authDomain: "eztrippers-lq-mvp.firebaseapp.com",
	projectId: "eztrippers-lq-mvp",
	storageBucket: "eztrippers-lq-mvp.appspot.com",
	messagingSenderId: "1089945914767",
	appId: "1:1089945914767:web:b6b759161fc88fe2474ffa"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, "europe-west2")
console.log("3. All initialized");
const getDestinationsFromAPI = httpsCallable('getDestinationsFromAPI');

export { functions }

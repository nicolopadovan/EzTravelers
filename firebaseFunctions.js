import { app } from "./firebaseInit.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-functions.js";

const functions = getFunctions(app, "europe-west2")
const getDestinationsFromAPI = httpsCallable(functions, 'getDestinationsFromAPI');

export { getDestinationsFromAPI }
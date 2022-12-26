import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-check.js"

const firebaseConfig = {
	apiKey: "AIzaSyAoHPscXLUb52j-PbsakU_TuafJcGNA-3o",
	authDomain: "eztrippers.it",
	projectId: "eztrippers-lq-mvp",
	storageBucket: "eztrippers-lq-mvp.appspot.com",
	messagingSenderId: "1089945914767",
	appId: "1:1089945914767:web:db3f693327d2048b474ffa"
};

const app = initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider("6Ld8JqQjAAAAAINKqEOLG9gy4IHqoZojfFyQaNBW"),
	isTokenAutoRefreshEnabled: true
})

console.log("Version 1.0.2");

export { app, getToken };
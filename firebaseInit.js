import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-check.js"

const firebaseConfig = {
	apiKey: "AIzaSyAoHPscXLUb52j-PbsakU_TuafJcGNA-3o",
	authDomain: "eztrippers-lq-mvp.firebaseapp.com",
	projectId: "eztrippers-lq-mvp",
	storageBucket: "eztrippers-lq-mvp.appspot.com",
	messagingSenderId: "1089945914767",
	appId: "1:1089945914767:web:b6b759161fc88fe2474ffa"
};

const app = initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider("6Ld8JqQjAAAAAINKqEOLG9gy4IHqoZojfFyQaNBW"),
	isTokenAutoRefreshEnabled: true
})

export { app, getToken };
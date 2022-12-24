import { currentUser } from "./firebaseAuth.js";
import { addDocument } from "./firebaseFirestore.js";

const interests = {
	interests: [],
	tripGroupSize: 1
}

addDocument("users", currentUser.uid, interests);
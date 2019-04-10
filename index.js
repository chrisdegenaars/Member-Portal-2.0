const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();
exports.userDeleteTrigger = functions.firestore
  .document('users/{userId}')
  .onDelete((snap, context) => {
	const deleted = snap.data();
	admin.auth().deleteUser(deleted.user_id)
    .then(function() {
      console.log("Successfully deleted user");
    })
    .catch(function(error) {
      console.log("Error deleting user:", error);
    });
 	console.log(JSON.stringify(deleted));
});

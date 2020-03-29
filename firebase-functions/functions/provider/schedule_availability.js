// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Realtime Database under the path /timeslots/
exports.createAvailableTimeSlot = functions.https.onRequest(async (req, res) => {
  const timeSlot = {
    user: req.query.user,
    startTime: req.query.start,
    endTime: req.query.end
  }

  await admin.database().ref('/timeslots').push(timeSlot);

  return res.json(timeSlot);
});

// API endpoint created
// https://us-central1-care-consult.cloudfunctions.net/createAvailableTimeSlot

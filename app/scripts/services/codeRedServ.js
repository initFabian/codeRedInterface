'use strict';
/**
 * Use helper methods to get data from database such as attendees,
 * documents, and sponsor info
 */

app.factory('codeRED', function ($firebase, $q, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var attendees = $firebase(ref.child('attendees')).$asArray();
  var documents = $firebase(ref.child('documents')).$asArray();
  var sponsorDocuments = $firebase(ref.child('sponsor_documents')).$asArray();

  var codeRED = {
    getAttendees: function() {
      //Get all attendees
      return attendees;
    },
    create: function (post) {
      //Add attendee
      return attendees.$add(post);
    },
    get: function (postId) {
      //Get individual attendee
      return $firebase(ref.child('attendees').child(postId)).$asObject();
    },
    getDocuments: function() {
      //Get Documents
      return documents;
    },
    getSponsorDocs: function() {
      //Get Sponsor documents
      return sponsorDocuments;
    }
  };

  return codeRED;
});
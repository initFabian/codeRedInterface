'use strict';
/**
 * Use helper methods to get data from database such as attendees,
 * documents, and sponsor info
 */

app.factory('codeRED', function ($firebase, $q, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);

  var codeRED = {
    getAttendees: function() {

      //Get all attendees
      var attendees = $firebase(ref.child('attendees')).$asArray();

      return attendees;
    },
    create: function (post) {

      //Add attendee
      var attendees = $firebase(ref.child('attendees')).$asArray();
      return attendees.$add(post);
    },


//TODO: add attendee to firebase {attendeeID: true}
    checkIn: function (_attendee) {

      //Add attendee checkIn
      var attendees = $firebase(ref.child('checkedIn')).$asArray();
      return attendees.$add(_attendee);
    },

//TODO: remove attendee to firebase
    notCheckIn: function(_attendee) {
      //Remove attendee checkIn
      var attendees = $firebase(ref.child('checkedIn')).$asArray();
      return attendees.$remove(_attendee);
    },

    get: function (postId) {

      //Get individual attendee
      return $firebase(ref.child('attendees').child(postId)).$asObject();
    },
    getDocuments: function() {

      //Get Documents
      var documents = $firebase(ref.child('documents')).$asArray();
      return documents;
    },
    getSponsorDocs: function() {

      //Get Sponsor documents
      var sponsorDocuments = $firebase(ref.child('sponsor_documents')).$asArray();
      return sponsorDocuments;
    }
  };

  return codeRED;
});
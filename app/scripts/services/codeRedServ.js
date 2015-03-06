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

















    getCheckedIn: function(_attendee) {
      var deferred = $q.defer();

      // Is the attendee in the checkIn list?
      var ref = new Firebase(FIREBASE_URL).child('attendees/'+_attendee.$id+'/checkedIn');
      ref.on('value', function(snapshot) {
        //returns either true or false
        deferred.resolve(snapshot.val());
      });

      return deferred.promise;
    },

    checkIn: function (_attendee) {
      var deferred = $q.defer();
      //Add attendee checkIn
      var ref = new Firebase(FIREBASE_URL).child('attendees/'+_attendee.$id+'/checkedIn');
      ref.set(true,function(error) {
        if (!error) {
          // return false for the error
          deferred.resolve(false);
        } else {
          // return true for the error with error message
          deferred.resolve(true,'There was an issue while removing check in.');
        }
      });
      return deferred.promise;
    },

    notCheckIn: function(_attendee) {
      var deferred = $q.defer();

      //Remove attendee checkIn
      var ref = new Firebase(FIREBASE_URL).child('attendees/'+_attendee.$id+'/checkedIn');
      ref.set(null,function(error) {
        if (!error) {
          // return false for the error
          deferred.resolve(false);
        } else {
          // return true for the error with error message
          deferred.resolve(true,'There was an issue while removing check in.');
        }
      });
      return deferred.promise;
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
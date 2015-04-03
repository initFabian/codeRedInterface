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
      var deferred = $q.defer();
      var attendees = $firebase(ref.child('attendees')).$asArray();
       if(attendees.$add(post)){
        // if(true){
          console.log('registered: ',post);
          deferred.resolve('Successfully registered attendee!');
       } else {
          deferred.reject('Oops! Something went wrong, try again');
       }
      return deferred.promise;
    },
    dayOfRegister: function (post) {

      //Add attendee
      var deferred = $q.defer();
      var attendees = $firebase(ref.child('lateRegister')).$asArray();
       if(attendees.$add(post)){
          console.log('registered: ',post);
          deferred.resolve('Successfully registered attendee!');
       } else {
          deferred.reject('Oops! Something went wrong, try again');
       }
      return deferred.promise;
    },

















    getCheckedIn: function(_attendee) {
      var deferred = $q.defer();

      // Is the attendee in the checkIn list?
      var ref = new Firebase(FIREBASE_URL).child('checkedIn/'+_attendee.$id+'/checkedIn');
      ref.on('value', function(snapshot) {
        //returns either true or false
        console.log(snapshot.val());
        deferred.resolve(snapshot.val());
      });

      return deferred.promise;
    },

    checkIn: function (_attendee) {
      var deferred = $q.defer();
      //Add attendee checkIn
      var ref = new Firebase(FIREBASE_URL).child('checkedIn/'+_attendee.$id+'/checkedIn');
      ref.set(true,function(error) {
        if (error) {
          // return true for the error with error message
          deferred.reject(true,'There was an issue while check in.');
          console.log(error);
        }
      });
      var attendRef = new Firebase(FIREBASE_URL).child('attendees/'+_attendee.$id+'/checkedIn');
      attendRef.set(true,function(error) {
        if (error) {
          // return true for the error with error message
          deferred.reject(true,'There was an issue while check in.');
          console.log(error);
        }
      });
      var termRef = new Firebase(FIREBASE_URL).child('attendees/'+_attendee.$id+'/acceptedTerms');
      termRef.set(true,function(error) {
        if (error) {
          // return true for the error with error message
          deferred.reject(true,'There was an issue while check in.');
          console.log(error);
        } else {
          deferred.resolve();
        }
      });
      return deferred.promise;
    },

    notCheckIn: function(_attendee) {
      var deferred = $q.defer();

      //Remove attendee checkIn
      var ref = new Firebase(FIREBASE_URL).child('checkedIn/'+_attendee.$id+'/checkedIn');
      ref.set(null,function(error) {
        if (error) {
          // return true for the error with error message
          deferred.reject(true,'There was an issue while removing check in.');
          console.log(error);
        }
      });
      var attendRef = new Firebase(FIREBASE_URL).child('attendees/'+_attendee.$id+'/checkedIn');
      attendRef.set(null,function(error) {
        if (error) {
          // return true for the error with error message
          deferred.reject(true,'There was an issue while removing check in.');
          console.log(error);
        }
      });

      var termRef = new Firebase(FIREBASE_URL).child('attendees/'+_attendee.$id+'/acceptedTerms');
      termRef.set(null,function(error) {
        if (error) {
          // return true for the error with error message
          deferred.reject(true,'There was an issue while check in.');
          console.log(error);
        } else {
          deferred.resolve();
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

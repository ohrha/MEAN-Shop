console.log("userServices loaded");
(function(){

var app = angular.module('userServices',[]);

app.config(function(){

    console.log("testing services module");

});

app.factory('User', function($http){  //a way to organize the code..

 userFactory ={};

//User.create(regData);
 userFactory.create = function(regData){

     return $http.post('/api/users',regData); //no need for "this.regData"
 }
 //User.checkUsername(regData);
  userFactory.checkUsername = function(regData){

     return $http.post('/api/checkusername',regData); //no need for "this.regData"
 }
 //User.checkEmail(regData);
  userFactory.checkEmail= function(regData){

     return $http.post('/api/checkemail',regData); //no need for "this.regData"
 }
 //User.activateAccount(token);
 userFactory.activateAccount= function(token){
     return  $http.put('/api/activate/'+token);
 }
 //User.checkCredentials(LoginData);
 userFactory.checkCredentials = function(loginData){

    return $http.post('/api/resend',loginData);

 }
  //User.resendLink(username);
  userFactory.resendLink = function(username){

    return $http.put('/api/resend',username);


 }
   //User.sendUsername(username);
  userFactory.sendUsername = function(userData){

    return $http.put('/api/resetusername/'+userData);

 }
    //User.sendPassword(resetData);
  userFactory.sendPassword = function(resetData){

    return $http.put('/api/resetpassword',resetData);

 }
     //User.sendPassword(resetData);
  userFactory.resetUser = function(token){

    return $http.put('/api/resetpassword/'+token);

 }
      //User.savePassword(regData);
  userFactory.savePassword = function(regData){

    return $http.put('/api/savepassword/',regData);

 }
    //User.renewSession(username);
  userFactory.renewSession= function(username){

    return $http.put('/api/renewtoken/'+username);

 }
   //User.getPermission();
 userFactory.getPermission= function(){

    return $http.put('/api/permission');

 }
 //User.getUsers();
  userFactory.getUsers= function(){

    return $http.put('/api/management');

 }
  //User.delete();
  userFactory.deleteUser= function(username){

    return $http.delete('/api/management/'+username);

 }
   //User.getUser(id);
  userFactory.getUser= function(id){

    return $http.put('/api/edit/'+id);

 }
    //User.editUser(id);
  userFactory.editUser= function(id){

    return $http.put('/api/edit/',id);

 }

 

 return  userFactory;

});


}());
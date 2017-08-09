(function(){

var app =  angular.module('checkoutController',['shopServices','angularPayments']);

app.config(function(){

console.log("checkoutController loaded and initialized...");

});

app.controller('checkoutCtrl', function($scope, $rootScope,$window,Shop){
    $scope.country="Canada";
    $scope.expmonth = "Jan";
    $scope.expyear = "2017";
    $scope.alberta = .05;
    $scope.britishColumbia = .05;
    $scope.manitoba = .05;
    $scope.newBrunswick =.15;
    $scope.newFoundland = .15;
    $scope.nwT = .05;
    $scope.novaScotia = .05;
    $scope.nunavut = .05;
    $scope.ontario = .05;
    $scope.quebec = .05;
    $scope.pei = .05;
    $scope.saskatchewan = .05;
    $scope.yukon = 0.5;
    $scope.shoppingBagShoes=[];
    $scope.grandTotal= $window.localStorage.getItem('grandTotal');
    $scope.errorMsg;
    $scope.shipPhase= false;
    $scope.addNewShippingAddress = false;
    $scope.checkoutDataa=[];
    $scope.shippingFormDataa=[];
    $scope.creditFormDataa = [];
    $scope.finalCheckoutData =[];
    $rootScope.finalCheckoutData =[];
    $scope.invalid = false;
    $scope.addShippingAddressPhase = false;
    $scope.useBillingAddressSelected= false;
    $scope.finalCheckoutButton = false;
    $scope.ccPhase = false;
    $scope.startCheckout = false;
    $scope.checkoutPhase = true;
    $scope.paymentLoading = false;

    $scope.creditCardDataAdded= false;
       $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArrayy'));
       $scope.grandTotal = Number($window.localStorage.getItem('grandTotal'));
       $scope.totalAfterTax;
    console.log($scope.shoppingBagShoes);
   /* var stripe = Stripe('pk_test_aE3UDuxFXzcslBrNanFIIi6Q');
    console.log(stripe);
    //$scope.formName.inputName.$card=[];
*/
/*
var handler = StripeCheckout.configure({
  key: 'pk_test_aE3UDuxFXzcslBrNanFIIi6Q',
  image: '/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    // Use the token to create the charge with a server-side script.
    // You can access the token ID with `token.id`
  }
});

handler.open({
  name: 'Stripe.com',
  description: '2 widgets',
  amount: 2000
});
    var getTotal = function(){


        
    }
*/
    
    $scope.startCheckoutFunc = function(){

        $scope.startCheckout = true;
    }

    $scope.selectCountry = function(number){
            console.log("button pressed");
            if(number === 1){
                $scope.country = "Canada";

            }else{
                $scope.country = "United States";

            }

    };
    $scope.selectExpYear = function(number){
            if(number === 1){
                $scope.expyear = "2017";

            }else if(number === 2){
                $scope.expyear = "2018";
            }else if(number === 3){
                $scope.expyear = "2019";
            }else if(number === 4){
                $scope.expyear = "2020";
            }else if(number === 5){
                $scope.expyear = "2021";
            }else if(number === 6){
                $scope.expyear = "2022";
            }else if(number === 7){
                $scope.expyear = "2023";
            }else if(number === 8){
                $scope.expyear ="2024";
            }else if(number === 9){
                $scope.expyear = "2025";
            }else if(number === 10){
                $scope.expyear = "2026";
            }else if(number === 11){
                $scope.expyear = "2027";
            }else if(number === 12){
                $scope.expyear = "2028";
            }else{
                $scope.expyear = "2029";
            }

    }
    $scope.selectExpMonth = function(number){
        if(number === 1){
                $scope.expmonth = "January";

            }else if(number === 2){
                $scope.expmonth = "February";
            }else if(number === 3){
                $scope.expmonth = "March";
            }else if(number === 4){
                $scope.expmonth = "April";
            }else if(number === 5){
                $scope.expmonth = "May";
            }else if(number === 6){
                $scope.expmonth = "June";
            }else if(number === 7){
                $scope.expmonth = "July";
            }else if(number === 8){
                $scope.expmonth ="August";
            }else if(number === 9){
                $scope.expmonth = "September";
            }else if(number === 10){
                $scope.expmonth = "October";
            }else if(number === 11){
                $scope.expmonth = "November";
            }else{
                $scope.expmonth = "December";
            }
    }
    $scope.addShippingAddress = function(){
        $scope.addNewShippingAddress = true;
        $scope.useBillingAddressSelected = false;
        
        console.log($scope.addNewShippingAddress);

    };
    $scope.useBillingAddress = function(){
         $scope.shippingFormDataa.push( $scope.checkoutDataa[0]);
         $scope.finalCheckoutData[0]= $scope.shippingFormDataa[0];
         $scope.finalCheckoutData[1]= $scope.checkoutDataa[0];
         $rootScope.finalCheckoutData[1]= $scope.checkoutDataa[0];
         console.log($scope.finalCheckoutData);
         $scope.useBillingAddressSelected = false;
        // $scope.finalCheckoutButton = true;
         $scope.ccPhase = true;
         $scope.addNewShippingAddressPhase = false;
         $scope.shipPhase = false;


    };
    $scope.shippingFunc= function(shippingFormData){

        $scope.shippingFormDataa.push(shippingFormData);
                 $scope.finalCheckoutData[0]= $scope.shippingFormDataa[0];
         $scope.finalCheckoutData[1]= $scope.checkoutDataa[0];
         $rootScope.finalCheckoutData[1]= $scope.checkoutDataa[0];
        $scope.shipPhase = true;
        $scope.addNewShippingAddress = false;
        $scope.addNewShippingAddressPhase = true;
        $scope.finalCheckoutButton = true;
         $scope.useBillingAddressSelected = false;
         $scope.ccPhase = true;

    };

         /*Shop.checkout($scope.finalCheckoutData).then(function(data){

                console.log(data.data);

            });*/
    $scope.checkOutFunc = function(checkoutData,valid){
        console.log(checkoutData);
        console.log(valid);
        if(valid){
        $scope.checkoutDataa.push(checkoutData);
        $scope.shipPhase = true;
        $scope.invalid = false;
        $scope.useBillingAddressSelected = true;
        $scope.checkoutPhase = false;
        console.log(checkoutData.province);
        if(checkoutData.province == "Alberta"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.alberta);
            console.log($scope.totalAfterTax);
        }else if(checkoutData.province == "British Columbia"){
           
            $scope.totalAfterTax = $scope.grandTotal + ( $scope.grandTotal * $scope.britishColumbia);
            console.log($scope.totalAfterTax);
        }else if(checkoutData.province == "Saskatchewan"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.saskatchewan);
        }else if(checkoutData.province == "Manitoba"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.manitoba);
        }else if(checkoutData.province == "Quebec"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.quebec);
        }else if(checkoutData.province == "Ontario"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.ontario);
        }else if(checkoutData.province == "New Brunswick"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.newBrunswick);
        }else if(checkoutData.province == "Newfoundland"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.newFoundland);
        }else if(checkoutData.province == "Nova Scotia"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.novaScotia);
        }else {
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.nwT);
        }
        
        }else{
            $scope.errorMsg = "Please properly complete form...";
            $scope.invalid = true;
        }
    };
    $scope.addCreditCardFunc = function(creditData, valid){
        console.log(creditData);
        console.log(valid);
        creditData.grandTotal = $scope.grandTotal;
        if(valid){
            $scope.creditFormDataa.push(creditData)
            $scope.finalCheckoutData[2]= $scope.creditFormDataa[0];
            $rootScope.finalCheckoutData[2]= $scope.creditFormDataa[0];
            $scope.creditCardDataAdded= true;
            $scope.finalCheckoutButton= true;
            $scope.ccPhase = false;
        }{
            $scope.errorMsg = "Invalid Credit-Card Entry...";
        }
        

    };

    $scope.finalCheckout= function(){

        
             /* Shop.checkout($scope.finalCheckoutData).then(function(data){

                console.log(data.data);

            });*/
              Shop.stripeCheckout($scope.finalCheckoutData).then(function(data){
                    console.log(data.data.charge);

              });

    };
    




});




}());
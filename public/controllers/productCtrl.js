(function(){

var app = angular.module('productsController',['shopServices','heartServices','authServices',"userServices",'shopServices','cookieServices','ngAnimate']);

app.config(function(){

    console.log("shoesCtrl loaded");

});

app.controller('shoesCtrl',function(Shop,$scope,$rootScope,$window,Heart,Auth){
/*
    var pink =$window.localStorage.getItem('myLoves');
    console.log(pink);
    console.log($rootScope.myLoves[0]);
    if($rootScope.myLoves !== null || $rootScope.myLoves[0] != undefined){
        $window.localStorage.setItem('myLoves',$rootScope.myLoves);
    }
     */
   var changeTitle = function(){

        $rootScope.title ="HOJ | Shop";

    }
    changeTitle();
    var scope = this;
    var name = "Z!";
    scope.imageIndex=0;
    scope.loading= true;
    //$rootScope.heartss =$window.localStorage.getItem('cookieHearts');
    scope.sort;
    $scope.allShoes=[];
    $scope.shoes=[];
    $scope.shoesPaginated;
    $scope.hearts = 1;
    scope.hearts=false;
    $scope.loadme = false;

    var _page= -3;

                 if(Auth.isLoggedIn()){
          Auth.getUser().then(function(data){

            console.log(data.data);
            User.getUserProfile(data.data.username).then(function(data){
                console.log(data.data.user.loves.length);
                $rootScope.heartss = data.data.user.loves.length;
            })

          });

     }else{

         $rootScope.heartss = $window.localStorage.getItem('cookieHearts');
     }
    

    function getShoes(){

         Shop.getAllShoes().then(function(data){

            console.log(data.data.allshoes);
            changeTitle();
            for(var i = 0; i<8 ; i++){
                 $scope.allShoes.push(data.data.allshoes[i]);

                }    
                   
            Shop.getShoes().then(function(data){
                    console.log("getshoes");
                     console.log(data);
                     if(data.data.success){
                         $scope.shoes = $scope.allShoes;
                         //$scope.shoesPaginated = data.data.shoes[0].pages;
                         //console.log($scope.shoesPaginated);
                         $scope.loadme = true;
                     }else{
                        console.log("Something went wrong getting shoe filepaths...");
                        console.log(data.data.message);
                    }
                });
        })

 

    };
            getShoes();


function getPages() {

            Shop.getPages().then(function(data){
                console.log(data.data.page);
                $scope.shoesPaginated = data.data.page;
            });
 };
        getPages();

   $scope.heartAdderShop=function(shoename,shoeindex){

       console.log(shoename);
       console.log(shoeindex);
       console.log($scope.shoes[0]);
     

                               //TOTAL HEARTS FOR STORE ITEM..
                        Shop.incrementHearts(shoename).then(function(data){    //FIND STORE ITEM WITH ROUTE AND THEN INCREMENT HEARTS VALUE BY ONE...

                            console.log(data.data.shoe);
                            //THERE DOESN'T SEEM TO BE A Shop.incrementHearts() SERVICE USED... THOUGH ONE EXISTS...
                                Shop.getMensShoe(shoename).then(function(data){

                                        $scope.mensShoe = data.data.allshoe[0];
                                        //console.log(data.data.allshoe);
                                        //console.log($scope.mensShoe.hearts);
                                        $rootScope.totalHearts = data.data.allshoe[0].hearts;
                                        $scope.shoes[shoeindex].hearts= data.data.allshoe[0].hearts;
        
                                });
                                 Heart.activateHeart(shoename).then(function(data){

                                        console.log(data.data);
                            
                                        $scope.shoes[shoeindex].heartactivated = data.data.shoe.heartactivated;

                                });

                        });
   }
   
   $scope.heartSubtractorShop=function(shoename,shoeindex){

       console.log(shoename);
       console.log(shoeindex);
       console.log($scope.shoes[0]);
        
                               //TOTAL HEARTS FOR STORE ITEM..
                        Shop.decrementHearts(shoename).then(function(data){    //FIND STORE ITEM WITH ROUTE AND THEN INCREMENT HEARTS VALUE BY ONE...

                            console.log(data.data.shoe);
                            //THERE DOESN'T SEEM TO BE A Shop.incrementHearts() SERVICE USED... THOUGH ONE EXISTS...
                                Shop.getMensShoe(shoename).then(function(data){

                                        $scope.mensShoe = data.data.allshoe[0];
                                        //console.log(data.data.allshoe);
                                        //console.log($scope.mensShoe.hearts);
                                        $rootScope.totalHearts = data.data.allshoe[0].hearts;
                                        $scope.shoes[shoeindex].hearts = data.data.allshoe[0].hearts;
        
                                });

                                

                        });

                         Heart.deactivateHeart(shoename).then(function(data){
                            console.log(data.data);
                            
                            $scope.shoes[shoeindex].heartactivated = data.data.shoe.heartactivated;

                        });
   }

   $scope.loadMoreo = function(){
            _page++;
            scope.loading = true;
            console.log(_page);
            if($scope.shoesPaginated[0].pages[_page] !== undefined){
                console.log($scope.shoesPaginated[0].pages[_page]);
                $scope.shoes = $scope.shoes.concat($scope.shoesPaginated[0].pages[_page]);
               // scope.loading = false;
            }else{
                console.log("No more pages");
            }
            
    };

      //      function() {
    //	this.imageIndex = 0;
    	$scope.currentImageChange = function(imageNumber) {
        console.log("Hello");
      	console.log(imageNumber);
         $scope.imageIndex = imageNumber || 0;
    	};

        $scope.sortOrder= function(order){
            
            $scope.order = order;
            console.log($scope.order);
        };

    
});

app.controller('galleryCtrl',function(){
        this.imageIndex=0;

        	this.currentImageChange = function(imageNumber) {
        console.log("Hello");
      	console.log(imageNumber);
         this.imageIndex = imageNumber || 0;
    	};

});

app.controller('heartCtrl',function(){
        this.hearts=1;

       // this.currentImageChange = function(imageNumber) {
       // console.log("Hello");
      //	console.log(imageNumber);
        // this.imageIndex = imageNumber || 0;
    	//};

});

}());
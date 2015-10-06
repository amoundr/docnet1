'use strict';

angular.module('doctors').controller('SliderController', ['$scope', 'Authentication',
  function ($scope, Authentication) {


$scope.showSlider  =   function(){

    console.log("firest 1");
 setTimeout(hideURLbar, 0); 
 func1(); 
 func2(); 
 func3(); 

 console.log("3 func added");

  function hideURLbar(){ window.scrollTo(0,1); } 
        


        
                                    function  func1() {

                                        console.log("second");
                                        /*
                                        var defaults = {
                                            containerID: 'toTop', // fading element id
                                            containerHoverID: 'toTopHover', // fading element hover id
                                            scrollSpeed: 1200,
                                            easingType: 'linear' 
                                        };
                                           */
                                        $().UItoTop({ easingType: 'easeOutQuart' });
                                        
                                    }
                                

                function  func2() {
                  // Slideshow 4
                  $("#slider4").responsiveSlides({
                    auto: true,
                    pager: true,
                    nav: true,
                    speed: 500,
                    namespace: "callbacks",
                    before: function () {
                      $('.events').append("<li>before event fired.</li>");
                    },
                    after: function () {
                      $('.events').append("<li>after event fired.</li>");
                    }
                  });
            
                }
              






          
             /*   $(".scroll").click(function(event){     
                    event.preventDefault();
                    $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
                });
                    */
    
            function func3() {
                console.log("sys 6");
                var pull        = $('#pull');
                var menu        = $('nav ul');
                var menuHeight  = menu.height();
                $(pull).on('click', function(e) {
                    e.preventDefault();
                    menu.slideToggle();
                });
                $(window).resize(function(){
                    var w = $(window).width();
                    if(w > 320 && menu.is(':hidden')) {
                        menu.removeAttr('style');
                    }
                });
            }

       } // function showSlider     



 }
]);



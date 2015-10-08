'use strict';

angular.module('doctors').controller('Slider2Controller', ['$scope', 'Authentication',
  function ($scope, Authentication) {

$('head').append('<link  href="/modules/doctors/client/css/doctor2/styledoc2.css" rel="stylesheet">');
$('head').append('<link  href="/modules/doctors/client/css/doctor2/swipebox.css" rel="stylesheet">');

$scope.showSlider  =   function(){

 func1(); 
 func2(); 
 func3(); 

 console.log("3 func added");

  function hideURLbar(){ window.scrollTo(0,1); } 
        
        /*data: {
            css: '/modules/doctors/client/css/doctor2/styledoc2.css'
          }*/

        
                                    function  func1() {

                                        $( "span.menu" ).click(function() {
                                             $( "ul.nav1" ).slideToggle( 300, function() {
                                             // Animation complete.
                                              });
                                             });

                                        $().UItoTop({ easingType: 'easeOutQuart' });
                
                                        
                                    }
                                

                function  func2() {

                    $("#slider3").responsiveSlides({
                    auto: true,
                    pager: false,
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
              
                      $("#slider4").responsiveSlides({
                        auto:true,
                        pager: false,
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

                                $(".swipebox").swipebox();
                
                        // You can also use "$(window).load(function() {"
                          // Slideshow 5
                          $("#slider5").responsiveSlides({
                            auto: true,
                            pager: false,
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

       } // function showSlider     



 }
]);
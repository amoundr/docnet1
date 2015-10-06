'use strict';

angular.module('core').controller('StoreCtrl', ['$scope', 'Authentication', '$filter' ,
  function ($scope, Authentication ,$filter) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.templates = [
  {
    "id" : 1,
    "name" : "doctor fututre",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "html5",
    "price" : 9.99,
    "images" : [
      {
        "name" : "doctor-fututre.jpg"
      }
    ]
  },
  {
    "id" : 100,
    "name" : "Anesthesia",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "html5",
    "price" : 9.99,
    "images" : [
      {
        "name" : "Anesthesia.jpg"
      },
      {
        "name" : "2.jpg"
      },
      {
        "name" : "3.jpg"
      },
      {
        "name" : "4.jpg"
      },
      {
        "name" : "5.jpg"
      }
    ]
  },
  {
    "id" : 2,
    "name" : "dental care",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "html5",
    "price" : 9.99,
    "images" : [
      {
        "name" : "dental_care.jpg"
      }
    ]
  },
  {
    "id" : 3,
    "name" : "dental clinic",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "CSS",
    "price" : 9.99,
    "images" : [
      {
        "name" : "dental_clinic.jpg"
      },
      {
        "name" : "2.jpg"
      }
    ]
  },
  {
    "id" : 4,
    "name" : "dentist",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "BOOTSTRAP",
    "price" : 9.99,
    "images" : [
      
      {
        "name" : "dentist.jpg"
      },
      {
        "name" : "5.jpg"
      }
    ]
  },
  {
    "id" : 5,
    "name" : "doctor plus",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "XHTML",
    "price" : 9.99,
    "images" : [
      {
        "name" : "doctor_plus.jpg"
      },
      {
        "name" : "2.jpg"
      },
      {
        "name" : "3.jpg"
      },
      {
        "name" : "4.jpg"
      },
      {
        "name" : "5.jpg"
      }
    ]
  },
  {
    "id" : 6,
    "name" : "medical equipment",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "XHTML",
    "price" : 9.99,
    "images" : [
      {
        "name" : "medical_equipment.jpg"
      }
    ]
  },
  {
    "id" : 7,
    "name" : "medical clinic",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "XHTML",
    "price" : 9.99,
    "images" : [
      {
        "name" : "medical-clinic.jpg"
      }
    ]
  },
  {
    "id" : 8,
    "name" : "medicative",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "XHTML",
    "price" : 9.99,
    "images" : [
      {
        "name" : "medicative.jpg"
      }
    ]
  },
  {
    "id" : 9,
    "name" : "medicom",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "XHTML",
    "price" : 9.99,
    "images" : [
      {
        "name" : "medicom.jpg"
      }
    ]
  },
  {
    "id" : 10,
    "name" : "medicus",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "XHTML",
    "price" : 9.99,
    "images" : [
      {
        "name" : "medicus.jpg"
      }
    ]
  },
  {
    "id" : 11,
    "name" : "metge",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "XHTML",
    "price" : 9.99,
    "images" : [
      {
        "name" : "metge.jpg"
      }
    ]
  },
  {
    "id" : 12,
    "name" : "science lab",
    "description" : "empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à",
    "type" : "XHTML",
    "price" : 9.99,
    "images" : [
      {
        "name" : "science_lab.jpg"
      }
    ]
  }



]
   
  
 
  }
]);
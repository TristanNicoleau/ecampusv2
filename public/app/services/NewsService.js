// Service permettant les actions CRUD sur les News
angular.module('ecampusv2.services').factory('NewsService', function ($http) {


    var NewsService = {

        newsList: null,

        currentNews: {},

        setList: function () {
          $http.get('http://localhost:8080/api/news').
            success(function(data, status, headers, config) {
              NewsService.newsList = data;
              NewsService.parseDates();
              console.log(data);
            }).
            error(function(data, status, headers, config) {
              console.log(status);
            });
        },

        parseDates: function () {
          console.log('Parsing dates ...');
          console.log(NewsService.newsList.length);
          for(var i = 0 ; i < NewsService.newsList.length ; i++ ){
            console.log(NewsService.newsList[i].date);
            NewsService.newsList[i].date = new Date(NewsService.newsList[i].date);
          }
        },

        add: function (news){
          news.date = new Date();
          $http.post('http://localhost:8080/api/news',news).
            success(function(data, status, headers, config) {
              NewsService.newsList.unshift(news);
              $('#modalAddNews').modal('hide');
              NewsService.currentNews = {};
            }).
            error(function(data, status, headers, config) {
              console.log(status);
            });
        }
    }

    return NewsService;
});
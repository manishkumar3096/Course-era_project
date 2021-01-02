(function () {

    'use strict'
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .service('httpMenuSearchService', httpMenuSearchService)
        .directive('foundItems', foundItems)
        .constant('urlname', 'https://davids-restaurant.herokuapp.com')



    function foundItems() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&',
                lengthff:'<'
            },
            controller :directiveController,
            controllerAs:'ctrl',
            bindToController:true,
            transclude:true
        }
        return ddo;
    }

    function directiveController(){
        var ctrl = this;
        console.log("directctrl this is: =>",ctrl)
        //return null;
    }

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var list = this;
        console.log("NarrowItDownController this is:", list)
        list.found='';
        list.searchTerm ='';
            list.getMatchedMenuItems = function(){
                 MenuSearchService.getMatchedMenuItems(list.searchTerm);
                //console.log("list.found",list.found)
            }
            list.found = function(){
            var data = MenuSearchService.getMatchedMenuItemsdata();
            console.log("list.found",data)
            return data;
            
            }
            list.removeMenuItems = function(index){
                MenuSearchService.removeMenuItems(index)
            }
            list.dataload = function(){
                var databool = MenuSearchService.lengthofmenu();
                return databool;
            }
    }

    MenuSearchService.$inject = ['httpMenuSearchService'];
    function MenuSearchService(httpMenuSearchService) {
        var service = this;
        service.listofitems = [];
        service.getMatchedMenuItems = function (searchTerm) {
           console.log("searchTerm",searchTerm);
            var promise = httpMenuSearchService.getMatchedMenuItemshtt();
            promise.then(function (response) {
                var foundItems = response.data.menu_items;
               service.listofitems = [];
                console.log("menu_items", searchTerm.length)
                if(searchTerm !==undefined && searchTerm !==''){
                for (var index = 0; index < foundItems.length; index++) {
                    if (foundItems[index].description.toLowerCase().indexOf(searchTerm) !== -1) {
                        var items = foundItems[index];
                        var data = {
                            name: items.name,
                            short_name: items.short_name,
                            description: items.description,
                        }
                        service.listofitems.push(data);
                    }
                }
            }
                console.log("service.listofitems",service.listofitems)
                //return service.listofitems;
            })
                .catch(function (errresopnse) {
                    console.log("some error caught in http resopnse")
                })
        }
        service.removeMenuItems = function(index){
             service.listofitems.splice(index,1)
        }
        service.getMatchedMenuItemsdata = function(){
            return service.listofitems
        }
        service.lengthofmenu = function(){
            if(service.listofitems.length > 0)
            return false;
            else
            return true;
        }
    }

    httpMenuSearchService.$inject = ['$http', 'urlname'];
    function httpMenuSearchService($http, urlname) {
        var htppservice = this;
        htppservice.getMatchedMenuItemshtt = function () {
            var datapr = $http({
                method: 'GET',
                url: (urlname + '/menu_items.json')
            })
            console.log("datapr",datapr)
            return datapr;
        }

    }
})();
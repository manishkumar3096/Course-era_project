(function () {
    'use strict'


    angular.module('shoplistcheck', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('listfactory', ShoppingListCheckOffService)
        //.factory('listfactory', listfactory);
        //.provider('listfactory', ShoppingListServiceProviderfnname)

        //using factory or provider
    // ToBuyController.$inject = ['listfactory'];
    // function ToBuyController(listfactory) {
    //     var listobj1 = this;
    //     //var factoryserv = listfactory();
    //     var factoryserv = listfactory; //incase of provider
    //     listobj1.buyitems = factoryserv.getitemtobuy();
    //     console.log("listobj1.items", listobj1)
    //     listobj1.sendtobougth = function (index) {
    //         factoryserv.addtobought(index);
    //         listobj1.buylistempty = factoryserv.tobuyempty;
    //         //console.log("factoryserv.getitembought()",factoryserv.getitembought())
    //     }

    //     //listobj1.boughtitems = factoryserv.getitembought();
    // }

    // AlreadyBoughtController.$inject = ['listfactory']
    // function AlreadyBoughtController(listfactory) {
    //     var listobj2 = this;
    //     //var factoryserv = listfactory();
    //     var factoryserv = listfactory;// incase of provider
    //     listobj2.boughtitems = factoryserv.getitembought();
    //     listobj2.boughtlistempty = factoryserv.boughtemptydata();
    //     console.log("listobj2.boughtitems", listobj2.boughtitems, factoryserv.boughtempty)

    // }

    ToBuyController.$inject = ['listfactory'];
    function ToBuyController(listfactory) {
        var listobj1 = this;
        //var factoryserv = listfactory();
        var factoryserv = listfactory; //incase of provider or service
        listobj1.buyitems = factoryserv.getitemtobuy();
        console.log("listobj1.items", listobj1)
        listobj1.sendtobougth = function (index) {
            factoryserv.addtobought(index);
            listobj1.buylistempty = factoryserv.tobuyempty;
            //console.log("factoryserv.getitembought()",factoryserv.getitembought())
        }

        //listobj1.boughtitems = factoryserv.getitembought();
    }

    AlreadyBoughtController.$inject = ['listfactory']
    function AlreadyBoughtController(listfactory) {
        var listobj2 = this;
        //var factoryserv = listfactory();
        var factoryserv = listfactory;// incase of provider or service
        listobj2.boughtitems = factoryserv.getitembought();
        // listobj2.boughtlistempty = factoryserv.boughtemptydata();
        listobj2.boughtlistempty = function(){
            return factoryserv.boughtemptydata();
            // if((listobj2.boughtitems).length > 0){ return false;}
            // else{ return true;}
        }
        //factoryserv.boughtemptydata();
        console.log("listobj2.boughtitems", listobj2.boughtitems, factoryserv.boughtempty)

    }


    function ShoppingListCheckOffService() {
        var servicelist = this;
        servicelist.tobuyempty = "";
        servicelist.boughtempty = true ;
        servicelist.tobuylist = [{ name: "cookies", quantity: 1 }, { name: "ketchup", quantity: 11 }, { name: "choclate", quantity: 17 },
        { name: "chips", quantity: 12 }, { name: "banana", quantity: 4 }];
        servicelist.boughtlist = [];
        servicelist.getitemtobuy = function () {
            return servicelist.tobuylist;
        }
        servicelist.addtobought = function (index) {
            console.log(index, servicelist.tobuylist, servicelist.boughtlist)
            var data = servicelist.tobuylist[index]
            servicelist.tobuylist.splice(index, 1);
            var item = {
                name: data.name,
                quantity: data.quantity
            };
            servicelist.boughtlist.push(item);
            servicelist.boughtempty = false;
            if ((servicelist.tobuylist).length === 0) {
                servicelist.tobuyempty = true;
            }
            // else{

            // }
            console.log(index, servicelist.tobuylist, servicelist.boughtlist)
        }
        servicelist.boughtemptydata = function () {
            console.log("servicelist.boughtempty",servicelist.boughtempty)
            return servicelist.boughtempty
        }
        servicelist.getitembought = function () {
            console.log("dasss", servicelist.boughtlist)
            if ((servicelist.boughtlist).length > 0) {
                servicelist.boughtempty = false
            }
            else {
                servicelist.boughtempty = true
            }
            return servicelist.boughtlist

        }


    }

    function listfactory() {
        // var factory = this;
        var data = function () {
            return new ShoppingListCheckOffService();
        }
        return data;
    }

    function ShoppingListServiceProviderfnname() {
        var factory = this;
        factory.$get = function () {
            var data = new ShoppingListCheckOffService();
            return data
        }
        // return factory;
    }

})();
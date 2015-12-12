class IndexController {

    constructor($scope) {
        console.log('Yes!');
        this.$inject = ['$scope'];
    }

}

app.controller('IndexController', IndexController);
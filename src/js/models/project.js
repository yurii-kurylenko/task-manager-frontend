app.factory('Project', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: 'http://localhost:3000/api/projects/{{id}}',
        name: 'project'
    });
}]);
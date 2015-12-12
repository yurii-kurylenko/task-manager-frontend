app.factory('Task', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: 'http://localhost:3000/api/projects/{{projectId}}/tasks/{{id}}',
        name: 'task',
        done: () => {
          console.log(this.id);
        }
    });
}]);
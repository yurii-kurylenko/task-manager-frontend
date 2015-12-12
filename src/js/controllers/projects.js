app.controller('ProjectsController', [
  '$scope', 'Project', 'Task',
  ($scope, Project, Task) => {

    Project.get().then((projects) =>{
      $scope.projects = projects;

      $scope.projects = _.map($scope.projects, (project) => {
        project.tasks = _.map(project.tasks, (task) => {
          return (new Task(task))
        });
        return project;
      });
    });

    $scope.doneTask = (task) => {
      task.status = 'done';
      task.update();
    };

    $scope.deleteTask = (project, task) => {
      var confirmation = confirm('Are you sure?');
      if (confirmation == true)  {
        _.remove(project.tasks, (t) => {
          return task == t
        });
        task.delete();
      };
    };

    $scope.deleteProject = (project) => {
      var confirmation = confirm('Are you sure?');
      if (confirmation == true)  {
        _.remove($scope.projects, (p) => {
          return project.id == p.id
        });
        project.delete();
      };
    };
  }
]);
app.controller('AddTaskController', [
  '$scope', 'Task', '$state', '$stateParams',
  ($scope, Task, $state, $stateParams) => {

    $scope.task = new Task({projectId: $stateParams.projectId });

    $scope.submitTask = () => {
      $scope.task.save().then((resp) =>{
        $state.go('dashboard.projects');
      });
    };
  }
]);
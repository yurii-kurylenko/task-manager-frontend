app.controller('UpdateTaskController', [
  '$scope', 'Task', '$state', '$stateParams',
  ($scope, Task, $state, $stateParams) => {

    Task.get({projectId: $stateParams.projectId, id: $stateParams.id}).then((task) => {
      $scope.task = task;
      $scope.task.deadline = new Date(task.deadline);
    });

    $scope.submitTask = () => {
      $scope.task.save().then((resp) =>{
        $state.go('dashboard.projects');
      });
    };
  }
]);
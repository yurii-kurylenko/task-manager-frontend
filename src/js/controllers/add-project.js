app.controller('AddProjectController', [
  '$scope', 'Project', '$state',
  ($scope, Project, $state) => {

    $scope.project = new Project();

    $scope.submitProject = () => {
      $scope.project.save().then((resp) =>{
        $state.go('dashboard.projects');
      });
    };
  }
]);
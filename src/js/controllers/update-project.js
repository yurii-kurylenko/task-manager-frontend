app.controller('UpdateProjectController', [
  '$scope', 'Project', '$state', '$stateParams',
  ($scope, Project, $state, $stateParams) => {

    Project.get($stateParams.id).then((project) => {
      $scope.project = project;
    });

    $scope.submitProject = () => {
      $scope.project.save().then((resp) =>{
        $state.go('dashboard.projects');
      });
    };
  }
]);
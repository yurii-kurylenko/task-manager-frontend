app.controller('SignInController', [
  '$rootScope', '$scope', '$auth', '$state',
  ($rootScope, $scope, $auth, $state) => {

    $rootScope.currentUserEmail = null;
    $scope.showError = false;

    $scope.submitLoginForm = () => {
      $auth.submitLogin($scope.loginForm).then((success) => {
        $rootScope.currentUserEmail = $scope.loginForm.email
        $state.go('dashboard.projects');
      })
      .catch((error) => {
        $scope.showError = true;
      })
    }
  }
]);
app.controller('DashboardController', [
  '$scope', '$auth', '$state',
  ($scope, $auth, $state) => {

    $auth.validateUser().then()
    .catch((error) => {
        $state.go('welcome');
      }
    );


    $scope.signout = () => {
      $auth.signOut().then(
        () => {
          $state.go('welcome');
        }
      )
    };
  }
]);
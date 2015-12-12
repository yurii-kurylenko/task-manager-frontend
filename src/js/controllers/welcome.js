app.controller('WelcomeController', ['$auth', '$state', ($auth, $state) => {
  $auth.validateUser().then(() => {
    $state.go('dashboard.projects');
  })
}])
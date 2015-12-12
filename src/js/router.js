app.config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'signin.html',
        controller: 'SignInController'
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'welcome.html',
        controller: 'WelcomeController'
      })
      .state('dashboard', {
        url: '',
        templateUrl: 'dashboard.html',
        controller: 'DashboardController',
        abstract: true
      })
      .state('dashboard.projects', {
        url: '/projects',
        templateUrl: 'projects/index.html',
        controller: 'ProjectsController'
      })
      .state('dashboard.add_project', {
        url: '/add_project',
        templateUrl: 'projects/form.html',
        controller: 'AddProjectController'
      })
      .state('dashboard.update_project', {
        url: '/update_project/:id',
        templateUrl: 'projects/form.html',
        controller: 'UpdateProjectController'
      })
      .state('dashboard.add_task', {
        url: '/:projectId/add_task',
        templateUrl: 'projects/task.html',
        controller: 'AddTaskController'
      })
      .state('dashboard.update_task', {
        url: '/:projectId/update_task/:id',
        templateUrl: 'projects/task.html',
        controller: 'UpdateTaskController'
      })

    $urlRouterProvider.otherwise('/welcome');
    return $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
      html5Mode: true
    });
  }
]);
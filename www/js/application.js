'use strict';

var app = angular.module('app', ['templates', 'ui.router', 'ng-token-auth', 'rails', 'ui.bootstrap']);

app.config(function ($authProvider) {
  $authProvider.configure({ apiUrl: 'http://localhost:3000/api' });
});
'use strict';

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider.state('signin', {
    url: '/signin',
    templateUrl: 'signin.html',
    controller: 'SignInController'
  }).state('welcome', {
    url: '/welcome',
    templateUrl: 'welcome.html',
    controller: 'WelcomeController'
  }).state('dashboard', {
    url: '',
    templateUrl: 'dashboard.html',
    controller: 'DashboardController',
    abstract: true
  }).state('dashboard.projects', {
    url: '/projects',
    templateUrl: 'projects/index.html',
    controller: 'ProjectsController'
  }).state('dashboard.add_project', {
    url: '/add_project',
    templateUrl: 'projects/form.html',
    controller: 'AddProjectController'
  }).state('dashboard.update_project', {
    url: '/update_project/:id',
    templateUrl: 'projects/form.html',
    controller: 'UpdateProjectController'
  }).state('dashboard.add_task', {
    url: '/:projectId/add_task',
    templateUrl: 'projects/task.html',
    controller: 'AddTaskController'
  }).state('dashboard.update_task', {
    url: '/:projectId/update_task/:id',
    templateUrl: 'projects/task.html',
    controller: 'UpdateTaskController'
  });

  $urlRouterProvider.otherwise('/welcome');
  return $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
    html5Mode: true
  });
}]);
'use strict';

app.controller('AddProjectController', ['$scope', 'Project', '$state', function ($scope, Project, $state) {

  $scope.project = new Project();

  $scope.submitProject = function () {
    $scope.project.save().then(function (resp) {
      $state.go('dashboard.projects');
    });
  };
}]);
'use strict';

app.controller('AddTaskController', ['$scope', 'Task', '$state', '$stateParams', function ($scope, Task, $state, $stateParams) {

  $scope.task = new Task({ projectId: $stateParams.projectId });

  $scope.submitTask = function () {
    $scope.task.save().then(function (resp) {
      $state.go('dashboard.projects');
    });
  };
}]);
'use strict';

app.controller('DashboardController', ['$scope', '$auth', '$state', function ($scope, $auth, $state) {

  $auth.validateUser().then().catch(function (error) {
    $state.go('welcome');
  });

  $scope.signout = function () {
    $auth.signOut().then(function () {
      $state.go('welcome');
    });
  };
}]);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IndexController = function IndexController($scope) {
    _classCallCheck(this, IndexController);

    console.log('Yes!');
    this.$inject = ['$scope'];
};

app.controller('IndexController', IndexController);
'use strict';

app.controller('ProjectsController', ['$scope', 'Project', 'Task', function ($scope, Project, Task) {

  Project.get().then(function (projects) {
    $scope.projects = projects;

    $scope.projects = _.map($scope.projects, function (project) {
      project.tasks = _.map(project.tasks, function (task) {
        return new Task(task);
      });
      return project;
    });
  });

  $scope.doneTask = function (task) {
    task.status = 'done';
    task.update();
  };

  $scope.deleteTask = function (project, task) {
    var confirmation = confirm('Are you sure?');
    if (confirmation == true) {
      _.remove(project.tasks, function (t) {
        return task == t;
      });
      task.delete();
    };
  };

  $scope.deleteProject = function (project) {
    var confirmation = confirm('Are you sure?');
    if (confirmation == true) {
      _.remove($scope.projects, function (p) {
        return project.id == p.id;
      });
      project.delete();
    };
  };
}]);
'use strict';

app.controller('SignInController', ['$rootScope', '$scope', '$auth', '$state', function ($rootScope, $scope, $auth, $state) {

  $rootScope.currentUserEmail = null;
  $scope.showError = false;

  $scope.submitLoginForm = function () {
    $auth.submitLogin($scope.loginForm).then(function (success) {
      $rootScope.currentUserEmail = $scope.loginForm.email;
      $state.go('dashboard.projects');
    }).catch(function (error) {
      $scope.showError = true;
    });
  };
}]);
'use strict';

app.controller('UpdateProjectController', ['$scope', 'Project', '$state', '$stateParams', function ($scope, Project, $state, $stateParams) {

  Project.get($stateParams.id).then(function (project) {
    $scope.project = project;
  });

  $scope.submitProject = function () {
    $scope.project.save().then(function (resp) {
      $state.go('dashboard.projects');
    });
  };
}]);
'use strict';

app.controller('UpdateTaskController', ['$scope', 'Task', '$state', '$stateParams', function ($scope, Task, $state, $stateParams) {

  Task.get({ projectId: $stateParams.projectId, id: $stateParams.id }).then(function (task) {
    $scope.task = task;
    $scope.task.deadline = new Date(task.deadline);
  });

  $scope.submitTask = function () {
    $scope.task.save().then(function (resp) {
      $state.go('dashboard.projects');
    });
  };
}]);
'use strict';

app.controller('WelcomeController', ['$auth', '$state', function ($auth, $state) {
  $auth.validateUser().then(function () {
    $state.go('dashboard.projects');
  });
}]);
'use strict';

app.factory('Project', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: 'http://localhost:3000/api/projects/{{id}}',
        name: 'project'
    });
}]);
'use strict';

app.factory('Task', ['railsResourceFactory', function (railsResourceFactory) {
    var _this = this;

    return railsResourceFactory({
        url: 'http://localhost:3000/api/projects/{{projectId}}/tasks/{{id}}',
        name: 'task',
        done: function done() {
            console.log(_this.id);
        }
    });
}]);
"use strict";
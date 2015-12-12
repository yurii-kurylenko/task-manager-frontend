var app = angular.module('app', ['templates', 'ui.router', 'ng-token-auth', 'rails', 'ui.bootstrap'])

app.config( ($authProvider) => {
  $authProvider.configure({ apiUrl: 'http://localhost:3000/api' })
})

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    baseUrl: 'https://jegybazar-24574.firebaseio.com',
    registrationUrl: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser',
    loginUrl: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword',
    apiKey: 'AIzaSyCLZy6rc2t-xPyXoEJWhHDkyviOXxjXclo',
    authDomain: 'jegybazar-24574.firebaseapp.com',
    databaseURL: 'https://jegybazar-24574.firebaseio.com',
    projectId: 'jegybazar-24574',
    storageBucket: '',
    messagingSenderId: '170241997792'
    // apikey: 'AIzaSyCLZy6rc2t-xPyXoEJWhHDkyviOXxjXclo'
  }
};

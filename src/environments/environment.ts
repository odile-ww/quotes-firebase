// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDI3Ir8arnqHmPpumTquH4frjPmKU8WE6s',
    authDomain: 'quotes-api-angular.firebaseapp.com',
    databaseURL: 'https://quotes-api-angular.firebaseio.com',
    projectId: 'quotes-api-angular',
    storageBucket: 'quotes-api-angular.appspot.com',
    messagingSenderId: '710953902904'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

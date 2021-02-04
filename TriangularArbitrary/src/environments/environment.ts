// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAGVrbwqSR3WZjlUpL_13y7lLDe8e1kYWA",
    authDomain: "triangulararbitrary.firebaseapp.com",
    databaseURL: "https://triangulararbitrary.firebaseio.com",
    projectId: "triangulararbitrary",
    storageBucket: "triangulararbitrary.appspot.com",
    messagingSenderId: "991332102738",
    appId: "1:991332102738:web:1399c62301d65b001fe58b",
    measurementId: "G-QRJ5RJR3F8"
  },
  cryptoAPIConfig: {
    xApiKey: 'Vhcl75IoYr5JhVxiaYHArbQydrj0ax',
    xApiSecret: 'BiXE5D7gpAW0Wr3iQoTKp8lwHcNwIyyuscYhIzdKYL6lm',
    xApiRapidApiHost:'crypto-asset-market-data-unified-apis-for-professionals.p.rapidapi.com',
    xRapidApiKey:'dab15a3f9cmshddce05f66ea95dcp13569ejsn701258d7a016'
  },
  yahooAPIConfig: {
    xRapidApiHost: 'yahoo-finance15.p.rapidapi.com',
    xRapidApiKey: 'dab15a3f9cmshddce05f66ea95dcp13569ejsn701258d7a016'
  },
  alphaVantageAPIConfig: {
    xRapidApiHost: 'alpha-vantage.p.rapidapi.com',
    xRapidApiKeys: ['3a817c55c4mshffc3fa4189b8ad3p11a7fajsn7113f1cd4087',
                    'eabd6f1d50mshd5adec4f4498824p14f0a8jsn50d4d4ddca7b',
                    'dab15a3f9cmshddce05f66ea95dcp13569ejsn701258d7a016',
                    'd3cf60b0d3msh3c528cb3930b910p18949cjsn95bdb34db2ae',
                    'd8c2daa417msh5c07760f621b084p1c7e69jsn34d8015c952e',
                    '145ded9cfamsh08ed6a4bdb93b21p13450ejsnd8b0546faaf6',
                    '2c42f9b7damsh0337a009b8e72f8p15e9d8jsn6f2f2f1c6f70',
                    '1eba3876a0msh68dce7c6f2dd412p1885aajsn2b03db874223'
                  ]
  },
  socialAuthService: {
    provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('413592386133-89m1je7fsgf4h65unfqrct9mmnqh4pk5.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig
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

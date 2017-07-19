import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
 
// used to create fake backend
import { BaseRequestOptions } from '@angular/http';

//import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';

import { AppState, InternalStateType } from './app.service';
 
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
 
import { AuthGuard } from './_guards/auth.guard';

import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/index';
import { NoContentComponent } from './no-content/no-content.component';

import {
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';

// Application wide providers
const APP_PROVIDERS = [
  //AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};
 
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        NoContentComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
         AuthHttp,
        provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'bearer',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('currentUser')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            //noJwtError: true
        }),
        // providers used to create fake backend
        //fakeBackendProvider,
       // MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})
 
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    //public appState: AppState
  ) {}

  // public hmrOnInit(store: StoreType) {
  //   if (!store || !store.state) {
  //     return;
  //   }
  //   console.log('HMR store', JSON.stringify(store, null, 2));
  //   /**
  //    * Set state
  //    */
  //   //this.appState._state = store.state;
  //   /**
  //    * Set input values
  //    */
  //   if ('restoreInputValues' in store) {
  //     let restoreInputValues = store.restoreInputValues;
  //     setTimeout(restoreInputValues);
  //   }

  //   this.appRef.tick();
  //   delete store.state;
  //   delete store.restoreInputValues;
  // }

  // public hmrOnDestroy(store: StoreType) {
  //   const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
  //   /**
  //    * Save state
  //    */
  //   const state = this.appState._state;
  //   store.state = state;
  //   /**
  //    * Recreate root elements
  //    */
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   /**
  //    * Save input values
  //    */
  //   store.restoreInputValues  = createInputTransfer();
  //   /**
  //    * Remove styles
  //    */
  //   removeNgStyles();
  // }

  // public hmrAfterDestroy(store: StoreType) {
  //   /**
  //    * Display new elements
  //    */
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }
}
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import {
//   NgModule,
//   ApplicationRef
// } from '@angular/core';
// import {
//   removeNgStyles,
//   createNewHosts,
//   createInputTransfer
// } from '@angularclass/hmr';
// import {
//   RouterModule,
//   PreloadAllModules
// } from '@angular/router';

// /*
//  * Platform and Environment providers/directives/pipes
//  */
// import { ENV_PROVIDERS } from './environment';
// import { ROUTES } from './app.routes';
// // App is our top level component
// import { AppComponent } from './app.component';
// import { APP_RESOLVER_PROVIDERS } from './app.resolver';
// import { AppState, InternalStateType } from './app.service';
// import { HomeComponent } from './home';
// import { AboutComponent } from './about';
// import { NoContentComponent } from './no-content';
// import { XLargeDirective } from './home/x-large';

// import '../styles/styles.scss';
// import '../styles/headings.css';

// // Application wide providers
// const APP_PROVIDERS = [
//   ...APP_RESOLVER_PROVIDERS,
//   AppState
// ];

// type StoreType = {
//   state: InternalStateType,
//   restoreInputValues: () => void,
//   disposeOldHosts: () => void
// };

// /**
//  * `AppModule` is the main entry point into Angular2's bootstraping process
//  */
// @NgModule({
//   bootstrap: [ AppComponent ],
//   declarations: [
//     AppComponent,
//     AboutComponent,
//     HomeComponent,
//     NoContentComponent,
//     XLargeDirective
//   ],
//   /**
//    * Import Angular's modules.
//    */
//   imports: [
//     BrowserModule,
//     FormsModule,
//     HttpModule,
//     RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
//   ],
//   /**
//    * Expose our Services and Providers into Angular's dependency injection.
//    */
//   providers: [
//     ENV_PROVIDERS,
//     APP_PROVIDERS
//   ]
// })
// export class AppModule {

//   constructor(
//     public appRef: ApplicationRef,
//     public appState: AppState
//   ) {}

//   public hmrOnInit(store: StoreType) {
//     if (!store || !store.state) {
//       return;
//     }
//     console.log('HMR store', JSON.stringify(store, null, 2));
//     /**
//      * Set state
//      */
//     this.appState._state = store.state;
//     /**
//      * Set input values
//      */
//     if ('restoreInputValues' in store) {
//       let restoreInputValues = store.restoreInputValues;
//       setTimeout(restoreInputValues);
//     }

//     this.appRef.tick();
//     delete store.state;
//     delete store.restoreInputValues;
//   }

//   public hmrOnDestroy(store: StoreType) {
//     const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
//     /**
//      * Save state
//      */
//     const state = this.appState._state;
//     store.state = state;
//     /**
//      * Recreate root elements
//      */
//     store.disposeOldHosts = createNewHosts(cmpLocation);
//     /**
//      * Save input values
//      */
//     store.restoreInputValues  = createInputTransfer();
//     /**
//      * Remove styles
//      */
//     removeNgStyles();
//   }

//   public hmrAfterDestroy(store: StoreType) {
//     /**
//      * Display new elements
//      */
//     store.disposeOldHosts();
//     delete store.disposeOldHosts;
//   }

// }
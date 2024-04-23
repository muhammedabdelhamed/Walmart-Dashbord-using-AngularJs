import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { NgToastModule } from 'ng-angular-popup';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { adminTokenInterceptor } from './app/admin-token.interceptor';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app-routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ReactiveFormsModule, FormsModule, NgxDropzoneModule, NgToastModule),
        provideClientHydration(),
        provideHttpClient(withFetch()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: adminTokenInterceptor,
            multi: true,
        },
    provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));

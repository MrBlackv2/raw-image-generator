import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuth0, authHttpInterceptorFn } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { environment } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideAuth0({
      ...environment.auth0,
      httpInterceptor: {
        allowedList: ['http://127.0.0.1:3000/api/*']
      }
    }),
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn])
    ),
  ]
};


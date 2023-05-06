import { AuthConfig } from '@auth0/auth0-angular';

export const environment: {
  api: { hostname: string },
  auth0: AuthConfig;
} = {
  api: {
    hostname: 'http://127.0.0.1:3000'
  },
  auth0: {
    domain: 'dev-68ucbh254hvghi6c.us.auth0.com',
    clientId: 'vSV27mokeNqBWjZ9uixq1ODTRfEjbp1U',
    authorizationParams: {
      audience: 'https://raw-images/api',
      redirect_uri: window.location.origin,
      scope: 'generate:full'
    }
  }
};

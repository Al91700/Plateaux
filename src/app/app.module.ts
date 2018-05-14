import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { offlineProviders } from '@ngx-pwa/offline';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './ui/layout';
import { OopsModule } from './oops/oops.module';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthInterceptor } from './core/auth/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    NoopAnimationsModule,
    OverlayModule,
    LayoutModule,
    OopsModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    offlineProviders({ routeOffline: '/oops/offline', routeUnavailable: '/oops/unavailable' }),
  ]
})
export class AppModule {}

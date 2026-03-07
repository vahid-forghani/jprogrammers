import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { JwtInterceptor } from "./security/jwt.interceptor";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      MatMenuModule,
      MatButtonModule,
      MatListModule,
      MatToolbarModule,
      MatIconModule,
      MatInputModule,
      MatGridListModule,
      MatCardModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
}

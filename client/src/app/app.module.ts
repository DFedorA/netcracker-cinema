import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import { OrderByPipe } from './shared/pipes/order-by.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import {FilmPageComponent} from './film-page/film-page.component';
import { FilmComponent } from './shared/components/film/film.component';
import {SharedModule} from './shared/shared.module';
import { FilmworksPageComponent } from './filmworks-page/filmworks-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PersonDescriptionComponent } from './person-description/person-description.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';
import {MainLayoutHeaderComponent} from "./shared/components/main-layout-header/main-layout-header.component";
import { FilteringPipe } from './shared/pipes/filtering.pipe';
import { FormsModule } from '@angular/forms';

registerLocaleData(ruLocale, 'ru');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainLayoutHeaderComponent,
    HomePageComponent,
    FilmPageComponent,
    FilmComponent,
    FilmworksPageComponent,
    FilteringPipe,
    PersonDescriptionComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }

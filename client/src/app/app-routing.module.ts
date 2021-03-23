import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {FilmPageComponent} from './film-page/film-page.component';
import {FilmworksPageComponent} from './filmworks-page/filmworks-page.component';
import {PersonDescriptionComponent} from "./person-description/person-description.component";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'filmworks', component: FilmworksPageComponent},
      {path: 'film/:id', component: FilmPageComponent},
      {path: 'actor/:id', component: PersonDescriptionComponent}
    ]
  },
  {
  path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

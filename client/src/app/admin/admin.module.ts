import {NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './shared/services/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './shared/services/token.interceptor';
import {CreatePagePersonComponent} from './create-page-person/create-page-person.component';
import {EditPagePersonComponent} from './edit-page-person/edit-page-person.component';
import {SearchPipe, SearchPipeProduct} from './shared/search.pipe';
import { CreatePageProductComponent } from './create-page-product/create-page-product.component';
import { EditPageProductComponent } from './edit-page-product/edit-page-product.component';
import { FeedbackPageViewComponent } from './feedback-page-view/feedback-page-view.component';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: TokenInterceptor
};


@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    DashboardPageComponent,
    CreatePagePersonComponent,
    EditPagePersonComponent,
    SearchPipe,
    SearchPipeProduct,
    CreatePageProductComponent,
    EditPageProductComponent,
    FeedbackPageViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'createperson', component: CreatePagePersonComponent, canActivate: [AuthGuard]},
          {path: 'createproduct', component: CreatePageProductComponent, canActivate: [AuthGuard]},
          {path: 'person/:id/edit-person', component: EditPagePersonComponent, canActivate: [AuthGuard]},
          {path: 'product/:id/edit-product', component: EditPageProductComponent, canActivate: [AuthGuard]},
          {path: 'feedback', component: FeedbackPageViewComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard, INTERCEPTOR_PROVIDER]
})
export class AdminModule {

}

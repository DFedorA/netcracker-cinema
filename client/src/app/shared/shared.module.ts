import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { MainLayoutFooterComponent } from './components/main-layout-footer/main-layout-footer.component';
import { PopupFeedbackComponent } from './components/popup-feedback/popup-feedback.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  exports: [HttpClientModule, MainLayoutFooterComponent, PopupFeedbackComponent],
  declarations: [MainLayoutFooterComponent, PopupFeedbackComponent]
})
export class SharedModule {

}

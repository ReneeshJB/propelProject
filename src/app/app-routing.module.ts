import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquiryComponent } from './enquiry/enquiry.component';

const routes: Routes = [
  {path:'enquiry', component:EnquiryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

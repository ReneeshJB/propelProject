import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { EnquiryComponent } from './enquiry/enquiry.component';

const routes: Routes = [
  {path:'enquiry', component:EnquiryComponent},
  {path:'coordinator', component:CoordinatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

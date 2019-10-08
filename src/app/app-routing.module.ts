import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { AreaComponent } from './area/area.component';
import { CustomerComponent } from './customer/customer.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  
  {
    path:'area', component:AreaComponent
  },
  {
    path:'customer', component:CustomerComponent
  },
  {
    path:'report', component:ReportComponent
  },
  {
    path:'', component:DriverComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

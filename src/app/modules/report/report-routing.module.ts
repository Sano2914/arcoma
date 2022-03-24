import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportListService } from 'app/services/report-list.service';
import { ReportListComponent } from './report-list/report-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ReportListComponent,
    resolve: {
      ues: ReportListService
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }

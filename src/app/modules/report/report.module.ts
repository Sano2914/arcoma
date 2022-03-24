import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ReportRoutingModule } from './report-routing.module';
import { ReportListService } from 'app/services/report-list.service';
import { ReportListComponent } from './report-list/report-list.component';

@NgModule({
  declarations: [ 
    ReportListComponent
  ],

  imports: [
    CommonModule,
    ReportRoutingModule,
    CoreCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    CKEditorModule,
    ContentHeaderModule,
    QuillModule.forRoot(),
  ],
  providers: [ReportListService]
})
export class ReportModule { }

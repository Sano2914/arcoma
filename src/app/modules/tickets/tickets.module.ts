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

import { TicketRoutingModule } from './tickets-routing.module';
import { TicketCreateEditComponent } from './ticket-create-edit/ticket-create-edit.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketsService } from 'app/services/tickets.service';
import { TicketsCreateService } from 'app/services/tickets-create.service';


@NgModule({
  declarations: [
    TicketListComponent,
    TicketCreateEditComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
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
  providers: [TicketsService, TicketsCreateService]
})
export class TicketsModule { }

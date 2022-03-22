import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsCreateService } from 'app/services/tickets-create.service';
import { TicketsService } from 'app/services/tickets.service';
import { TicketCreateEditComponent } from './ticket-create-edit/ticket-create-edit.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: TicketListComponent,
    // resolve: {
    //   uls: TicketService
    // },
  },
  {
    path: 'edit',
    component: TicketCreateEditComponent,
    resolve: {
      ues: TicketsCreateService
    },
  },
  {
    path: ' edit/:id',
    component: TicketCreateEditComponent,
    resolve: {
      ues: TicketsCreateService
    },
  },
  {
    path: 'view/:id',
    // component: TicketDetailsComponent,
    component: TicketCreateEditComponent,
    resolve: {
      ues: TicketsCreateService
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }

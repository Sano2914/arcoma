import { Component, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { TicketsService } from 'app/services/tickets.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  public contentHeader: object;
  public sidebarToggleRef = false;
  public rows = [
    {
      ticketid: '2022',
      customerName: 'Asfaq',
      category: 'check',
      subcategory: 'enter',
      description: 'Type here',
      user: 'user1',
      status: 'Closed',
      priority: 'Medium',
      criticality: 'High'
    },
    {
     ticketid: '2021',
     customerName: 'shams',
     category: 'check',
     subcategory: 'enter',
     description: 'Type here',
     user: 'user1',
     status: 'In Progess',
     priority: 'High',
     criticality: 'Highly critical'
   },
   {
     ticketid: '2085',
     customerName: 'Omar',
     category: 'check',
     subcategory: 'enter',
     description: 'Type here',
     user: 'user1',
     status: 'Escalated',
     priority: 'Low',
     criticality: 'Low'
   },
   {
     ticketid: '2057',
     customerName: 'Immam',
     category: 'check',
     subcategory: 'enter',
     description: 'Type here',
     user: 'user1',
     status: 'Abandoned',
     priority: 'Medium',
     criticality: 'Medium'
   },
   {
     ticketid: '2051',
     customerName: 'shams',
     category: 'check',
     subcategory: 'enter',
     description: 'Type here',
     user: 'user1',
     status: 'In Progress',
     priority: 'High',
     criticality: 'High'
   },
  
  ];
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousStatusFilter = '';

  public selectAvailability: any = [
    { name: 'All', value: '' },
    { name: 'High', value: 'high' },
    { name: 'Medium', value: 'medium' },
    { name: 'Low', value: 'low'}
  ];

  public selectedAvailability = [];
  public searchValue = '';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  private tempData = [
    {
      ticketid: '2022',
      customerName: 'Asfaq',
      category: 'check',
      subcategory: 'enter',
      description: 'Type here',
      user: 'user1',
      status: 'Closed',
      priority: 'Medium',
      criticality: 'High'
    },
    {
      ticketid: '2021',
      customerName: 'shams',
      category: 'check',
      subcategory: 'enter',
      description: 'Type here',
      user: 'user1',
      status: 'In Progess',
      priority: 'High',
      criticality: 'Highly critical'
    },
    {
      ticketid: '2085',
      customerName: 'Omar',
      category: 'check',
      subcategory: 'enter',
      description: 'Type here',
      user: 'user1',
      status: 'Escalated',
      priority: 'Low',
      criticality: 'Low'
    },
    {
      ticketid: '2057',
      customerName: 'Immam',
      category: 'check',
      subcategory: 'enter',
      description: 'Type here',
      user: 'user1',
      status: 'Abandoned',
      priority: 'Medium',
      criticality: 'Medium'
    },
    {
      ticketid: '2051',
      customerName: 'shams',
      category: 'check',
      subcategory: 'enter',
      description: 'Type here',
      user: 'user1',
      status: 'In Progress',
      priority: 'High',
      criticality: 'High'
    },
  ];
  private _unsubscribeAll: Subject<any>;

  constructor(
      private_ticketsService: TicketsService,
      private _coreSidebarService: CoreSidebarService,
      private _coreConfigService: CoreConfigService,
      private router: Router) {
      this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
      this.contentHeader = {
        headerTitle: 'Tickets',
        breadcrumb: {
          type: '',
          links: [
            // {
            //   name: 'Home',
            //   isLink: true,
            //   link: '/'
            // },
            // {
            //   name: 'eCommerce',
            //   isLink: true,
            //   link: '/'
            // },
            {
              name: 'List',
              isLink: false
            }
          ]
        }
      };
    }
  filterUpdate(event) {
    this.selectedAvailability = this.selectAvailability[0];
 
    const val = event.target.value.toLowerCase();
 
    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.customerName.toLowerCase().indexOf(val) !== -1 || !val;
    });
 
    this.rows = temp;
    this.table.offset = 0;
  }
 
   filterByStatus(event) {
     const filter = event ? event.value : '';
     this.previousStatusFilter = filter;
     this.temp = this.filterRows(filter);
     this.rows = this.temp;
   }
 
   filterRows(statusFilter): any[] {
     // Reset search on select change
     this.searchValue = '';
 
     statusFilter = statusFilter.toLowerCase();
 
     return this.tempData.filter(row => {
       const isPartialNameMatch = row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
       return isPartialNameMatch;
     });
   }
 
  //  editTicket(id){
  //    if (id) {
  //      this.router.navigate(['/Ticket/edit', id, {mode:'edit'}]);
  //    }
  //  }
 
   viewTicket(id){
     console.log('test');
     if (id) {
       this.router.navigate(['/ticket/view', id, {mode:'view'}]);
     }
   }
   deleteTicket(ticketName){
    console.log('test');
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete Ticket:  " +ticketName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then(function (result) {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Ticket has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    });
  }
 
   createTicket(){
     this.router.navigate(['tickets/edit', {mode:'add'}])
   }

}

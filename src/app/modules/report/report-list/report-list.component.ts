import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ReportListService } from 'app/services/report-list.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  public contentHeader: object;
  public sidebarToggleRef = false;
  public selectedOption = 10;
  public rows;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previouscustomerNameFilter = '';
  public previousticketStatusFilter = '';
  public previoususerNameFilter = '';
  public previouscategoryFilter = '';
  public previousstartDateFilter = '';
  public previousendDateFilter = '';

  public selectcustomerName: any = [
    {name : 'All', value: ''},
    {name : 'Asfaq', value: 'asfaq'},
    {name : 'Omar', value: 'Omar'},
    {name : 'Immam', value: 'Immam'},
    {name : 'Saif', value: 'Saif'},
    {name : 'Ahamed', value: 'Ahamed'}
    ];

    public selectticketStatus: any = [
      {name : 'All', value: ''},
      {name : 'In Progress', value: 'In Progress'},
      {name : 'Closed', value: 'Closed'},
      {name : 'Escalated', value: 'Escaled'},
      {name : 'Abandoned', value: 'Abandoned'},
      {name : 'Breached', value: 'Breached'}
      ];

      public selectuserName: any = [
        {name : 'All', value: ''},
        {name : 'Azeem', value: 'Azeem'},
        {name : 'mohammed', value: 'mohammed'},
        {name : 'alman', value: 'alman'},
        {name : 'shamar', value: 'shamar'},
        {name : 'munif', value: 'munif'}
      ];

      public selectcategory: any = [
          {name : 'All', value: ''},
          {name : 'Checked', value: 'checked'},
          {name : 'Finished', value: 'Finished'},
          {name : 'Completed', value: 'Completed'}
      ];

      public selectstartDate: any = [
          {name : 'All', value: ''},
          {name : 'Admin', value: 'Admin'},
          {name : 'Author', value: 'Author'},
          {name : 'Editor', value: 'Editor'},
          {name : 'Maintainer', value: 'Maintainer'},
          {name : 'Subscriber', value: 'Subscriber'}
      ];

      public selectendDate: any = [
            {name : 'All', value: ''},
            {name : 'Admin', value: 'Admin'},
            {name : 'Author', value: 'Author'},
            {name : 'Editor', value: 'Editor'},
            {name : 'Maintainer', value: 'Maintainer'},
            {name : 'Subscriber', value: 'Subscriber'}
      ];


      public selectedcustomerName = []
      public selectedticketStatus = []
      public selecteduserName = []
      public selectedcategory = []
      public selectedstartDate = []
      public selectedendDate = []
      public searchValue = '';

  @ViewChild(DatatableComponent) table: DatatableComponent;
  private tempData =[];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private_reportListService: ReportListService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private router: Router) {
      this._unsubscribeAll = new Subject();
     }

  filterUpdate(event) {
    this.selectedcustomerName = this.selectcustomerName[0];
    this.selectedticketStatus = this.selectticketStatus[0];
    this.selecteduserName = this.selectuserName[0];
    this.selectedcategory = this.selectcategory[0];
    this.selectedstartDate = this.selectstartDate[0];
    this.selectedendDate = this.selectendDate[0];
 
    const val = event.target.value.toLowerCase();
 
    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.customerName.toLowerCase().indexOf(val) !== -1 || !val;
    });
 
    this.rows = temp;
    this.table.offset = 0;
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
   toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  filterBycustomerName(event) {
    const filter = event ? event.value : '';
    this.previouscustomerNameFilter = filter;
    this.temp = this.filterRows(filter, this.previousticketStatusFilter, this.previoususerNameFilter, this.previouscategoryFilter, this.previousstartDateFilter, this.previousendDateFilter);
    this.rows = this.temp;
  }
  filterByticketStatus(event) {
    const filter = event ? event.value : '';
    this.previousticketStatusFilter = filter;
    this.temp = this.filterRows(filter, this.previouscustomerNameFilter, this.previoususerNameFilter, this.previouscategoryFilter, this.previousstartDateFilter, this.previousendDateFilter);
    this.rows = this.temp;
  }
  filterByuserName(event) {
    const filter = event ? event.value : '';
    this.previoususerNameFilter = filter;
    this.temp = this.filterRows(filter, this.previousticketStatusFilter, this.previouscustomerNameFilter, this.previouscategoryFilter, this.previousstartDateFilter, this.previousendDateFilter);
    this.rows = this.temp;
  }
  filterBycategory(event) {
    const filter = event ? event.value : '';
    this.previouscategoryFilter = filter;
    this.temp = this.filterRows(filter, this.previousticketStatusFilter, this.previoususerNameFilter, this.previouscustomerNameFilter, this.previousstartDateFilter, this.previousendDateFilter);
    this.rows = this.temp;
  }
  filterBystartDate(event) {
    const filter = event ? event.value : '';
    this.previousstartDateFilter = filter;
    this.temp = this.filterRows(filter, this.previousticketStatusFilter, this.previoususerNameFilter, this.previouscategoryFilter, this.previouscustomerNameFilter, this.previousendDateFilter);
    this.rows = this.temp;
  }
  filterByendDate(event) {
    const filter = event ? event.value : '';
    this.previousendDateFilter = filter;
    this.temp = this.filterRows(filter, this.previousticketStatusFilter, this.previoususerNameFilter, this.previouscategoryFilter, this.previousstartDateFilter, this.previouscustomerNameFilter);
    this.rows = this.temp;
  }


  filterRows(customerNameFilter, ticketStatusFilter, userNameFilter, categoryFilter, startDateFilter, endDateFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    customerNameFilter = customerNameFilter.toLowerCase();
    ticketStatusFilter = ticketStatusFilter.toLowerCase();
    userNameFilter = userNameFilter.toLowerCase();
    categoryFilter = categoryFilter.toLowerCase();
    startDateFilter = startDateFilter.toLowerCase();
    endDateFilter = endDateFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialcustomerNameMatch = row.customerName.toLowerCase().indexOf(customerNameFilter) !== -1 || !customerNameFilter;
      const isPartialticketStatusMatch = row.ticketStatus.toLowerCase().indexOf(ticketStatusFilter) !== -1 || !ticketStatusFilter;
      const isPartialuserNameMatch = row.userName.toLowerCase().indexOf(userNameFilter) !== -1 || !userNameFilter;
      const isPartialcategoryMatch = row.category.toLowerCase().indexOf(categoryFilter) !== -1 || !categoryFilter;
      const isPartialstartDateMatch = row.startDate.toLowerCase().indexOf(startDateFilter) !== -1 || !startDateFilter;
      const isPartialendDateMatch = row.endDate.toLowerCase().indexOf(endDateFilter) !== -1 || !endDateFilter;
      return isPartialcustomerNameMatch && isPartialticketStatusMatch && isPartialuserNameMatch && isPartialcategoryMatch && isPartialstartDateMatch && isPartialendDateMatch;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
   ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Report',
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
    // Subscribe config change
    // this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
    //   if (config.layout.animation === 'zoomIn') {
    //     setTimeout(() => {
    //       this._reportListService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //         this.rows = response;
    //         this.tempData = this.rows;
    //       });
    //     }, 450);
    //   } else {
    //     this._reportListService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //       this.rows = response;
    //       this.tempData = this.rows;
    //     });
    //   }
    // });
  }
  onSubmit() {
    
  }

}

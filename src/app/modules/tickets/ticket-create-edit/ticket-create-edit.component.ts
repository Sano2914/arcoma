import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { ClassicEditor } from '@ckeditor/ckeditor5-build-classic';
import { TicketsCreateService } from 'app/services/tickets-create.service';
import { TicketDetails } from 'app/interface/ticket-details';

@Component({
  selector: 'app-ticket-create-edit',
  templateUrl: './ticket-create-edit.component.html',
  styleUrls: ['./ticket-create-edit.component.scss']
})
export class TicketCreateEditComponent implements OnInit {

  form: FormGroup;
  public ticketData: TicketDetails;
  public tempRow;
 public avatarImage: string;
 public Editor = ClassicEditor;
 description = 'Specification';
 data: any = `<p>Hello, world!</p>`;
 paramData: string;
 paramMode: string;
 headText: string;
 readMode = false;
 urls = [];

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


  constructor(public fb: FormBuilder, private router: Router, private route: ActivatedRoute, private_ticketsCreateService: TicketsCreateService) { }

  ngOnInit() {
    this.initiallize();
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      description: ['', Validators.required,],
      user: ['', Validators.required,],
      status: ['', Validators.required,],
      priority: ['', Validators.required,],
      criticality: ['', Validators.required,],
    });
    this.paramData = this.route.snapshot.paramMap.get('id');
    this.paramMode = this.route.snapshot.paramMap.get('mode');

    if(this.paramData){
      this.rows.map(row => {
        if (row.ticketid == this.paramData) {
          this.ticketData = row;
        }
      });
    }
    if(this.paramMode === 'edit'){
      this.headText = 'Edit Ticket Details';
    } else if (this.paramMode === 'add'){
      this.headText = 'Add New Ticket';
    } else {
      this.headText = 'Ticket Details';
      this.readMode = true;
    }
  }
  resetForm() {
    this.form.reset();
    this.urls = [];
  }
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
 
      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };
 
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onSubmit() {
    
  }
 
  back(){
   this.router.navigate(['tickets/list'])
  }

  initiallize() {
    this.ticketData = {
      customerName: '',
      category:'',
      subcategory: '',
      description: '',
      user: '',
      status:'',
      priority:'',
      criticality:''
    };
    }

    onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
          var filesAmount = event.target.files.length;
          for (let i = 0; i < filesAmount; i++) {
                  var reader = new FileReader();
  
                  reader.onload = (event:any) => {
                    // console.log(event.target.result);
                     this.urls.push(event.target.result); 
                  }
  
                  reader.readAsDataURL(event.target.files[i]);
          }
      }
    }
    removeImage(i){
      this.urls.splice(i,1);
    }

}

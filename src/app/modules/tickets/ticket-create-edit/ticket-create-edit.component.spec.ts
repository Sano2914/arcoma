import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCreateEditComponent } from './ticket-create-edit.component';

describe('TicketCreateEditComponent', () => {
  let component: TicketCreateEditComponent;
  let fixture: ComponentFixture<TicketCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

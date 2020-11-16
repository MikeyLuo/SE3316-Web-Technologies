import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSchedulesComponent } from './delete-schedules.component';

describe('DeleteSchedulesComponent', () => {
  let component: DeleteSchedulesComponent;
  let fixture: ComponentFixture<DeleteSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCodesComponent } from './search-codes.component';

describe('SearchCodesComponent', () => {
  let component: SearchCodesComponent;
  let fixture: ComponentFixture<SearchCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

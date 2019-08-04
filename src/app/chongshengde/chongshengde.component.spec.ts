import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChongshengdeComponent } from './chongshengde.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ChongshengdeComponent', () => {
  let component: ChongshengdeComponent;
  let fixture: ComponentFixture<ChongshengdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ ChongshengdeComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChongshengdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

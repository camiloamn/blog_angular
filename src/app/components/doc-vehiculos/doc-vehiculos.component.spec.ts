import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVehiculosComponent } from './doc-vehiculos.component';

describe('DocVehiculosComponent', () => {
  let component: DocVehiculosComponent;
  let fixture: ComponentFixture<DocVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocVehiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

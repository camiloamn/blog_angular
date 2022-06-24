import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVeComponent } from './lista-ve.component';

describe('ListaVeComponent', () => {
  let component: ListaVeComponent;
  let fixture: ComponentFixture<ListaVeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaVeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

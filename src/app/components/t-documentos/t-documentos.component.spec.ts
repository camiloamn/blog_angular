import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TDocumentosComponent } from './t-documentos.component';

describe('TDocumentosComponent', () => {
  let component: TDocumentosComponent;
  let fixture: ComponentFixture<TDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

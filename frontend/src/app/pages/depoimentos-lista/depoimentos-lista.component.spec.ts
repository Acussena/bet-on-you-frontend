import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoimentosListaComponent } from './depoimentos-lista.component';

describe('DepoimentosListaComponent', () => {
  let component: DepoimentosListaComponent;
  let fixture: ComponentFixture<DepoimentosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepoimentosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepoimentosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

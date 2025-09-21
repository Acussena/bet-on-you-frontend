import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConscientizacaoComponent } from './conscientizacao.component';

describe('ConscientizacaoComponent', () => {
  let component: ConscientizacaoComponent;
  let fixture: ComponentFixture<ConscientizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConscientizacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConscientizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeApoioComponent } from './redeApoio.component';

describe('RedeApoioComponent', () => {
  let component: RedeApoioComponent;
  let fixture: ComponentFixture<RedeApoioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeApoioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeApoioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

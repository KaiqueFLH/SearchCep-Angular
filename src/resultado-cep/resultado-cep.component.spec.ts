import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoCepComponent } from './resultado-cep.component';

describe('ResultadoCepComponent', () => {
  let component: ResultadoCepComponent;
  let fixture: ComponentFixture<ResultadoCepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoCepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

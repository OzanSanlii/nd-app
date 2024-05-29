import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HastaListesiComponent } from './hasta-listesi.component';

describe('HastaListesiComponent', () => {
  let component: HastaListesiComponent;
  let fixture: ComponentFixture<HastaListesiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HastaListesiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HastaListesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

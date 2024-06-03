import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HastaDetayComponent } from './hasta-detay.component';

describe('HastaDetayComponent', () => {
  let component: HastaDetayComponent;
  let fixture: ComponentFixture<HastaDetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HastaDetayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HastaDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

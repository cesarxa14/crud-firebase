import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewFullscreenComponent } from './modal-view-fullscreen.component';

describe('ModalViewFullscreenComponent', () => {
  let component: ModalViewFullscreenComponent;
  let fixture: ComponentFixture<ModalViewFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewFullscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

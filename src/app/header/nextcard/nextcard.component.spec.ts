import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextcardComponent } from './nextcard.component';

describe('NextcardComponent', () => {
  let component: NextcardComponent;
  let fixture: ComponentFixture<NextcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglesMeetingComponent } from './singles-meeting.component';

describe('SinglesMeetingComponent', () => {
  let component: SinglesMeetingComponent;
  let fixture: ComponentFixture<SinglesMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglesMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglesMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMainComponent } from './update-main.component';

describe('UpdateMainComponent', () => {
  let component: UpdateMainComponent;
  let fixture: ComponentFixture<UpdateMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

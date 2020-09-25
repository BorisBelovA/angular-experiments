import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipsTestComponent } from './tooltips-test.component';

describe('TooltipsTestComponent', () => {
  let component: TooltipsTestComponent;
  let fixture: ComponentFixture<TooltipsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooltipsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

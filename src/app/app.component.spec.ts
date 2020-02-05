import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonService } from './services/common.service';
import { Employee } from './models/Employee.model';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [CommonService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should check form is submitted with empty form fields', () => {
    expect(component.submitted).toBe(false);
    component.registerForm = formBuilder.group({
      name: null,
      empcode: null,
      department: null,
      grade: null
    });
    component.onSubmit();
    // fixture.detectChanges();
    expect(component.submitted).toBe(true);
  });

  xit('should validate form after entering values in the form', () => {
    expect(component.submitted).toBe(false);
    component.registerForm = formBuilder.group({
      name: 'amitddd',
      empcode: 10101,
      department: 'os',
      grade: 'L4'
    });
    component.onSubmit();
    expect(component.submitted).toBe(true);
  });

  // it(`should have as title 'test-angular-app'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('test-angular-app');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('test-angular-app app is running!');
  // });
});

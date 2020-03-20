import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonService } from './services/common.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Constants } from './constants/app.constant';

xdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  const formBuilder: FormBuilder = new FormBuilder();
  let httpMock: HttpTestingController;
  let service: CommonService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [CommonService]
    }).compileComponents();

    service = TestBed.get(CommonService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    // fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should check form is submitted with empty form fields', () => {
    expect(component.registerForm.invalid).toBeTruthy();
  });

  it('should check name field validity', () => {
    let name = component.registerForm.controls['name'];
    expect(name.valid).toBeFalsy();

    let errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should validate form after entering values in the form', () => {
    expect(component.submitted).toBe(false);
    // component.registerForm = formBuilder.group(Users[0]);
    component.registerForm.controls['name'].setValue('amitd');
    component.registerForm.controls['empcode'].setValue('15263');
    component.registerForm.controls['department'].setValue('OS');
    component.registerForm.controls['grade'].setValue('L5');
    component.onSubmit();
    expect(component.submitted).toBe(true);
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should initiate service', inject([CommonService], (service:CommonService) => {
      expect(service).toBeDefined();
  }));

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('angular-practice app is running!');
  // });
});

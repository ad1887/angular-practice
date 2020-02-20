import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Users } from './mockdata/Users';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  const formBuilder: FormBuilder = new FormBuilder();
  let service: CommonService;
  let apiUrl = 'http://localhost:3000/api/';
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

  it('should have add function in service', inject([CommonService], (service:CommonService) => {
      expect(service.add).toBeTruthy();
  }));

  it('should add correctly', inject([CommonService], (service:CommonService) => {
    expect(service.add(2,3)).toEqual(5);
  }));

  xit('should fetch the employees data from common service', inject([CommonService, HttpTestingController], (service: CommonService, httpMock: HttpTestingController) => {

    // call service
    service.getEmployData().subscribe((res) => {
      console.log('response >>>', res.data.length);
      expect(res.data.length).toBe(4);
    });

    // set the expectations for the HttpClient mock
    let req = httpMock.expectOne(apiUrl + 'employee');
    expect(req.request.url).toBe(apiUrl + 'employee');
    expect(req.request.method).toEqual('GET');

    // set the fake data to be returned by the mock
    req.flush(Users); 
    httpMock.verify();
  }));

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('angular-practice app is running!');
  // });
});

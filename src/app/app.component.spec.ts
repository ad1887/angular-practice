import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Users } from './mockdata/Users';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
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

  it('should validate form after entering values in the form', () => {
    expect(component.submitted).toBe(false);
    component.registerForm = formBuilder.group(Users[0]);
    component.onSubmit();
    expect(component.submitted).toBe(true);
  });

  // it('should fetch the employees data from common service', inject([CommonService, HttpTestingController], (service: CommonService, backend: HttpTestingController) => {
  //   // service initiated
  //   expect(service).toBeTruthy();
  //   service.getEmployData().subscribe((res) => {
  //     console.log('response >>>', res.length);
  //   });
  // }));

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('test-angular-app app is running!');
  // });
});

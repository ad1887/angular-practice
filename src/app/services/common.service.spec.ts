import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonService } from './common.service';
import { Constants } from '../constants/app.constant';
import { Users } from '../mockdata/Users';

describe('CommonService', () => {
  let httpMock: HttpTestingController;
  let service: CommonService;
  let apiUrl = Constants.apiUrl;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [CommonService]
    }).compileComponents();

    service = TestBed.get(CommonService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  it('should fetch the employees data from common service', () => {
    let mockData = {
      'status': 200,
      'message': 'success', 
      'data': Users
    };
    // set the expectations for the HttpClient mock
    service.getEmployData().subscribe((res) => {
      // console.log('=====>>>>', res.data);
      expect(res.data.length).toBeGreaterThan(0);
      expect(res.data).toEqual(mockData.data);
    });
    const req = httpMock.expectOne(apiUrl + 'employee');
    expect(req.request.url).toBe(apiUrl + 'employee');
    expect(req.request.method).toEqual('GET');
    // set the fake data to be returned by the mock
    req.flush(mockData); 
    httpMock.verify();
  });
});

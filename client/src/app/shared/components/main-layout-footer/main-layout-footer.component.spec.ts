import {TestBed} from '@angular/core/testing';
import {MainLayoutFooterComponent} from './main-layout-footer.component';

describe('FooterComponent', () => {
  let app: MainLayoutFooterComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainLayoutFooterComponent]
    });
    app = TestBed.inject(MainLayoutFooterComponent);
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreategroupLastPhasePage } from './creategroup-last-phase.page';

describe('CreategroupLastPhasePage', () => {
  let component: CreategroupLastPhasePage;
  let fixture: ComponentFixture<CreategroupLastPhasePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreategroupLastPhasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreategroupLastPhasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

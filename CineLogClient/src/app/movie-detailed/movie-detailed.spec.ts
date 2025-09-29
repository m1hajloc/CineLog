import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailed } from './movie-detailed';

describe('MovieDetailed', () => {
  let component: MovieDetailed;
  let fixture: ComponentFixture<MovieDetailed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

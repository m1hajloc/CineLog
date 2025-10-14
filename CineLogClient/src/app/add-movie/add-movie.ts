import { Component, OnInit } from '@angular/core';
import { CreateMovie, Genre } from '../contracts';
import { LookupService } from '../services/lookup.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { createMovie, newMovie } from '../movies/movies.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-movie',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.css',
})
export class AddMovie implements OnInit {
  constructor(
    private lookupService: LookupService,
    private movieService: MovieService,
    private router: Router,
    private store: Store
  ) {}

  genreOptions!: Genre[];
  preview!: string;

  async ngOnInit(): Promise<void> {
    this.genreOptions = await this.lookupService.getGenre();
  }

  public addMovieForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    releaseDate: new FormControl(null),
    overview: new FormControl(null, [Validators.required]),
    genres: new FormControl<number[]>([]),
    poster: new FormControl<string | null>(null),
  });

  private getFormValue(): CreateMovie {
    return {
      title: this.addMovieForm.controls.title.value ?? '',
      releaseDate: this.addMovieForm.controls.releaseDate.value ?? undefined,
      overview: this.addMovieForm.controls.overview.value ?? '',
      genres: this.addMovieForm.controls.genres.value ?? [],
      poster: this.addMovieForm.controls.poster.value ?? undefined,
    };
  }

  public onSubmit() {
    this.store.dispatch(createMovie({ movie: this.getFormValue() }));
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const posterBase64 = reader.result as string;
        this.addMovieForm.patchValue({ poster: posterBase64 as string });
        this.preview = posterBase64;
      };
      reader.readAsDataURL(file);
    }
  }

  onGenreChange(event: Event, genreId: number) {
    const checked = (event.target as HTMLInputElement).checked;
    const genres = this.addMovieForm.controls.genres.value ?? [];

    if (checked) {
      this.addMovieForm.patchValue({ genres: [...genres, genreId] });
    } else {
      this.addMovieForm.patchValue({
        genres: genres.filter((id) => id !== genreId),
      });
    }
  }
}

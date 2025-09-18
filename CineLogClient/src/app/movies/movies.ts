import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {}

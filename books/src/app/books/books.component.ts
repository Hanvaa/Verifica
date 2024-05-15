import { Component } from '@angular/core';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  books = [
    {
      author: 'Hans Christian Andersen',
      country: 'Denmark',
      pages: 784,
      title: 'Fairy tales',
      year: 1836
    },
    {
      author: 'Dante Alighieri',
      country: 'Italia',
      pages: 928,
      title: 'The Divine Comedy',
      year: 1315
    },
    {
      author: 'Jane Austen',
      country: 'United Kingdom',
      pages: 226,
      title: 'Pride and Prejudice',
      year: 1813
    },
    {
      author: 'Samuel Beckett',
      country: 'Republic of Ireland',
      pages: 256,
      title: 'Molloy, Malone Dies, The Unnamable, the trilogy',
      year: 1952
    },
    {
      author: 'Giovanni Boccaccio',
      country: 'Italia',
      pages: 1024,
      title: 'The Decameron',
      year: 1351
    },
    {
      author: 'Miguel de Cervantes',
      country: 'Spain',
      pages: 1056,
      title: 'Don Quijote De La Mancha',
      year: 1610
    },
    {
      author: 'Geoffrey Chaucer',
      country: 'England',
      pages: 544,
      title: 'The Canterbury Tales',
      year: 1450
    },
    {
      author: 'Anton Chekhov',
      country: 'Russia',
      pages: 194,
      title: 'Stories',
      year: 1886
    }
  ];
}

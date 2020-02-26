import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuotesService } from '../../services/quotes.service';
import { Author } from '../../models/AuthorModel';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors: Author[];

  constructor(private quoteService: QuotesService, private router: Router) {}

  ngOnInit() {
    this.quoteService.getAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }
}

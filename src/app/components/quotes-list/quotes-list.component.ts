import { Component, OnInit } from '@angular/core';

import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../models/QuoteModel';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {
  quotes: Quote[];
  hasFilter: boolean;

  constructor(private quoteService: QuotesService) {}

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.quoteService.getQuotes().subscribe(quotes => {
      this.quotes = quotes;
    });
  }

  filterQuotesByAuthor(event, value) {
    this.quoteService.getQuotesByKey('author', value).subscribe(filteredQuotes => {
      this.quotes = filteredQuotes;
      this.hasFilter = true;
    });
  }

  filterQuotesByTitle(event, value) {
    this.quoteService.getQuotesByKey('title', value).subscribe(filteredQuotes => {
      this.quotes = filteredQuotes;
      this.hasFilter = true;
    });
  }

  filterQuotesByTag(event, tag) {
    this.quoteService.getQuotesByTag(tag).subscribe(filteredQuotes => {
      this.quotes = filteredQuotes;
      this.hasFilter = true;
    });
  }

  clearFilter(event) {
    this.getQuotes();
    this.hasFilter = false;
  }

}

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
  filteredValue: string;

  constructor(private quoteService: QuotesService) {}

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.quoteService.getQuotes().subscribe(quotes => {
      this.quotes = quotes;
    });
  }

  filterQuotesByTag(tag) {
    this.quoteService.getQuotesByTag(tag).subscribe(filteredQuotes => {
      this.quotes = filteredQuotes;
      this.hasFilter = true;
      this.filteredValue = tag;
    });
  }

  clearFilter() {
    this.getQuotes();
    this.hasFilter = false;
    this.filteredValue = '';
  }

  filterQuotesByKey(key, value) {
    this.quoteService.getQuotesByKey(key, value).subscribe(filteredQuotes => {
      this.quotes = filteredQuotes;
      this.hasFilter = true;
      this.filteredValue = value;
    });
  }
}

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

  constructor(private quoteService: QuotesService) {}

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.quoteService.getQuotes().subscribe(quotes => {
      this.quotes = quotes;
    });
  }

  filterQuotesByAuthor(event, author) {
    this.quoteService.getQuotesByAuthor(author).subscribe(filteredQuotes => {
      this.quotes = filteredQuotes;
    });
  }

}

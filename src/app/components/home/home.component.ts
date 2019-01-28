import { Component, OnInit } from '@angular/core';

import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../models/QuoteModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredQuotes: Quote[];
  constructor(private quoteService: QuotesService) {}

  ngOnInit() {
    this.quoteService.getQuotes().subscribe(quotes => {
      this.featuredQuotes = quotes.filter(quote => {
        return quote.isFeatured === true;
      });
    });
  }
}

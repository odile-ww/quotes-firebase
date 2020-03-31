import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../models/QuoteModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {
  quotes: Quote[];
  hasFilter: boolean;
  filteredValue: string;
  isLoggedIn: boolean;
  message: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quoteService: QuotesService,
    private authService: AuthService
  ) {
    this.message = quoteService.message;
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
      }
    });

    const queryKey = Object.keys(this.route.snapshot.queryParams)[0],
      queryValue = this.route.snapshot.queryParams[queryKey];

    if (queryKey) {
      const serializedParamValue = this.serializeUrl(queryValue);

      this.filterQuotesByKey(queryKey, serializedParamValue);
    } else {
      this.getQuotes();
    }
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
      this.router.navigate(['quotes'], { queryParams: { tag } });
    });
  }

  filterQuotesByKey(key, value) {
    this.quoteService.getQuotesByKey(key, value).subscribe(filteredQuotes => {
      this.quotes = filteredQuotes;
      this.hasFilter = true;
      this.filteredValue = value;
      this.router.navigate(['quotes'], { queryParams: { key, value } });
    });
  }

  clearFilter() {
    if (Object.keys(this.route.snapshot.queryParams).length > 0) {
      this.router.navigate(['quotes'], { replaceUrl: true });
    }
    this.getQuotes();
    this.hasFilter = false;
    this.filteredValue = '';
  }
  // TO DO: move to some utility file
  serializeUrl(value: string): string {
    return value.replace(/-/gi, ' ');
  }
}

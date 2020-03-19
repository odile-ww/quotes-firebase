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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quoteService: QuotesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
      }
    });

    const snapshotParams = Object.keys(this.route.snapshot.params),
      queryKey = snapshotParams[0];

    if (snapshotParams.length > 0) {
      const serializedParamValue = this.serializeUrl(
        this.route.snapshot.params.author
      );

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
    });
  }

  clearFilter() {
    if (Object.keys(this.route.snapshot.params).length > 0) {
      this.route.snapshot.params = {};
      this.router.navigate(['quotes']);
    }
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
  // TO DO: move to some utility file
  serializeUrl(value: string): string {
    return value.replace(/-/gi, ' ');
  }
}

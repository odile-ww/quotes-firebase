import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quote } from '../models/QuoteModel';
import { Author } from '../models/AuthorModel';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  quotesCollection: AngularFirestoreCollection<Quote>;
  quoteDoc: AngularFirestoreDocument<Quote>;
  authorsCollection: AngularFirestoreCollection<Author>;
  authorDoc: AngularFirestoreDocument<Author>;

  quotes: Observable<Quote[]>;
  quote: Observable<Quote>;
  authors: Observable<Author[]>;
  author: Observable<Author>;

  constructor(private afs: AngularFirestore) {
    this.quotesCollection = this.afs.collection('quotes', ref =>
      ref.orderBy('author')
    );
    this.authorsCollection = this.afs.collection('autors', ref =>
      ref.orderBy('lastName')
    );
  }

  getQuotes(): Observable<Quote[]> {
    this.quotes = this.quotesCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Quote;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.quotes;
  }

  addQuote(quote: Quote) {
    this.quotesCollection.add(quote);
  }

  getAuthors(): Observable<Author[]> {
    this.authors = this.authorsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Author;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.authors;
  }
}

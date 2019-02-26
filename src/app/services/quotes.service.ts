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

  getSingleQuote(id: string): Observable<Quote> {
    this.quoteDoc = this.afs.doc<Quote>(`quotes/${id}`);
    this.quote = this.quoteDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Quote;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.quote;
  }

  addQuote(quote: Quote) {
    this.quotesCollection.add(quote);
  }

  updateQuote(quote: Quote) {
    this.quoteDoc = this.afs.doc(`quotes/${quote.id}`);
    this.quoteDoc.update(quote);
  }

  deleteQuote(quote: Quote) {
    this.quoteDoc = this.afs.doc(`quotes/${quote.id}`);
    this.quoteDoc.delete();
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

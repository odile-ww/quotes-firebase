import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quote } from '../models/QuoteModel';
import { Author } from '../models/AuthorModel';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  quotesCollection: AngularFirestoreCollection<Quote>;
  quoteDoc: AngularFirestoreDocument<Quote>;
  authorsCollection: AngularFirestoreCollection<Author>;
  quotes: Observable<Quote[]>;
  quote: Observable<Quote>;
  authors: Observable<Author[]>;
  author: Observable<Author>;
  message: string;

  constructor(private afs: AngularFirestore) {
    this.quotesCollection = this.afs.collection('quotes', (ref) =>
      ref.orderBy('author')
    );
    this.authorsCollection = this.afs.collection('autors', (ref) =>
      ref.orderBy('lastName')
    );
  }

  getQuotes(): Observable<Quote[]> {
    this.message = undefined;
    return this.quotesCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          return <Quote>{
            id: action.payload.doc['id'],
            ...action.payload.doc.data(),
          };
        });
      })
    );
  }

  getQuotesByKey(key, value): Observable<Quote[]> {
    return this.afs
      .collection('quotes', (ref) => ref.where(key, '==', value))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            const data = snap.payload.doc.data() as Quote;
            data.id = snap.payload.doc['id'];
            return data;
          });
        })
      );
  }

  getQuotesByTag(tag): Observable<Quote[]> {
    return this.afs
      .collection('quotes', (ref) => ref.where('tags', 'array-contains', tag))
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            const data = snap.payload.doc.data() as Quote;
            data.id = snap.payload.doc['id'];
            return data;
          });
        })
      );
  }

  getSingleQuote(id: string): Observable<Quote> {
    this.quoteDoc = this.afs.doc<Quote>(`quotes/${id}`);
    return this.quoteDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          return <Quote>{
            id: action.payload['id'],
            ...action.payload.data(),
          };
        }
      })
    );
  }

  addQuote(quote: Quote) {
    this.quotesCollection.add(quote);
    this.message = 'You have successfully added a new quote!';
  }

  updateQuote(quote: Quote) {
    this.afs.doc(`quotes/${quote.id}`).update(quote);
    this.message = 'You have successfuly updated the quote!';
  }

  deleteQuote(quote: Quote) {
    this.afs.doc(`quotes/${quote.id}`).delete();
    this.message = 'You have successfully deleted the quote!';
  }

  getAuthors(): Observable<Author[]> {
    return this.authorsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          return {
            id: action.payload.doc['id'],
            ...action.payload.doc.data(),
          };
        });
      })
    );
  }
}

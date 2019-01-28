import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quote } from '../models/QuoteModel';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  quotesCollection: AngularFirestoreCollection<Quote>;
  quoteDoc: AngularFirestoreDocument<Quote>;
  quotes: Observable<Quote[]>;
  quote: Observable<Quote>;

  constructor(private afs: AngularFirestore) {
    this.quotesCollection = this.afs.collection('quotes', ref =>
      ref.orderBy('author')
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
}

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UrlSerializer } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { QuotesListComponent } from './components/quotes-list/quotes-list.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { QuoteCreateComponent } from './components/quote-create/quote-create.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { CustomSerializer } from './utils/custom-url-serializer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuotesListComponent,
    AuthorsComponent,
    QuoteCreateComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    CarouselModule.forRoot()
  ],
  providers: [{ provide: UrlSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}

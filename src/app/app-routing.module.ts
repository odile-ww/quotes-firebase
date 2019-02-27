import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsComponent } from './components/authors/authors.component';
import { HomeComponent } from './components/home/home.component';
import { QuoteCreateComponent } from './components/quote-create/quote-create.component';
import { QuotesListComponent } from './components/quotes-list/quotes-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'quotes', component: QuotesListComponent },
  { path: 'add', component: QuoteCreateComponent },
  { path: 'edit/:quoteId', component: QuoteCreateComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

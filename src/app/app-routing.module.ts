import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './services/auth-guard-service';

import { AuthorsComponent } from './components/authors/authors.component';
import { HomeComponent } from './components/home/home.component';
import { QuoteCreateComponent } from './components/quote-create/quote-create.component';
import { QuotesListComponent } from './components/quotes-list/quotes-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'quotes', component: QuotesListComponent },
  { path: 'add', component: QuoteCreateComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:quoteId',
    component: QuoteCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

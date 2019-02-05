import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { QuotesService } from '../../services/quotes.service';

@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.scss']
})
export class QuoteCreateComponent implements OnInit {
  quoteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quotesService: QuotesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.quoteForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
      isFeatured: false,
      author: '',
      title: '',
      tags: this.fb.array([this.fb.control('')])
    });
  }

  get content() {
    return this.quoteForm.get('content');
  }
  get tags() {
    return this.quoteForm.get('tags') as FormArray;
  }

  addTag(e) {
    e.preventDefault();
    this.tags.push(this.fb.control(''));
  }

  deleteTag(i) {
    this.tags.removeAt(i);
  }

  saveQuote() {
    if (this.quoteForm.invalid) {
      return;
    }
    this.quotesService.addQuote(this.quoteForm.value);
    this.router.navigate(['/']);
  }
}

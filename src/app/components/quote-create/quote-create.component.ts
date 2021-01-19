import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../models/QuoteModel';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.scss'],
})
export class QuoteCreateComponent implements OnInit {
  quoteForm: FormGroup;
  mode = 'create';
  quote: Quote;
  private quoteId: string;
  bsModalRef: BsModalRef;
  message: string;

  constructor(
    private fb: FormBuilder,
    private quotesService: QuotesService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private storage: AngularFirestore
  ) {}

  ngOnInit() {
    this.quoteId = this.route.snapshot.params['id'];

    this.quoteForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(20)]],
      isFeatured: false,
      author: ['', [Validators.required]],
      title: ['', [Validators.required]],
      tags: this.fb.array([this.fb.control('')]),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('quoteId')) {
        this.mode = 'edit';
        this.quoteId = paramMap.get('quoteId');
        this.quotesService
          .getSingleQuote(this.quoteId)
          .subscribe((quoteData) => {
            this.quote = quoteData;
            this.quoteForm.patchValue({
              content: this.quote.content,
              author: this.quote.author,
              title: this.quote.title,
              isFeatured: this.quote.isFeatured,
            });
            this.quoteForm.setControl(
              'tags',
              this.fb.array(this.quote.tags || [])
            );
          });
      } else {
        this.mode = 'create';
        this.quoteId = null;
      }
    });
  }

  get content() {
    return this.quoteForm.get('content');
  }
  get author() {
    return this.quoteForm.get('author');
  }
  get title() {
    return this.quoteForm.get('title');
  }
  get tags() {
    return this.quoteForm.get('tags') as FormArray;
  }

  uploadFile(e) {
    const file: File = e.target.files[0];
    const filepath: string = ``;
  }

  addTag(e) {
    e.preventDefault();
    this.tags.push(this.fb.control(''));
  }

  deleteTag(i) {
    this.tags.removeAt(i);
  }

  saveQuote(value: Quote) {
    if (this.quoteForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.quotesService.addQuote(value);
    } else {
      value.id = this.quoteId;
      this.quotesService.updateQuote(value);
    }
    this.router.navigate(['/quotes']);
  }

  deleteQuote() {
    this.quotesService.deleteQuote(this.quote);
    this.router.navigate(['/quotes']);
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  confirm(): void {
    this.bsModalRef.hide();
    this.deleteQuote();
  }

  decline(): void {
    this.bsModalRef.hide();
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { QuotesService } from "../../services/quotes.service";
import { Quote } from "../../models/QuoteModel";

@Component({
  selector: "app-quote-create",
  templateUrl: "./quote-create.component.html",
  styleUrls: ["./quote-create.component.scss"]
})
export class QuoteCreateComponent implements OnInit {
  quoteForm: FormGroup;
  mode = "create";
  quote: Quote;
  private quoteId: string;

  constructor(
    private fb: FormBuilder,
    private quotesService: QuotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.quoteId = this.route.snapshot.params["id"];

    this.quoteForm = this.fb.group({
      content: ["", [Validators.required, Validators.minLength(5)]],
      isFeatured: false,
      author: "",
      title: "",
      tags: this.fb.array([this.fb.control("")])
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("quoteId")) {
        this.mode = "edit";
        this.quoteId = paramMap.get("quoteId");
        this.quotesService.getSingleQuote(this.quoteId).subscribe(quoteData => {
          this.quote = quoteData;
          this.quoteForm.patchValue({
            content: this.quote.content,
            author: this.quote.author,
            title: this.quote.title,
            isFeatured: this.quote.isFeatured
          });
          this.quoteForm.setControl(
            "tags",
            this.fb.array(this.quote.tags || [])
          );
        });
      } else {
        this.mode = "create";
        this.quoteId = null;
      }
    });
  }

  get content() {
    return this.quoteForm.get("content");
  }
  get tags() {
    return this.quoteForm.get("tags") as FormArray;
  }

  addTag(e) {
    e.preventDefault();
    this.tags.push(this.fb.control(""));
  }

  deleteTag(i) {
    this.tags.removeAt(i);
  }

  saveQuote(value: Quote) {
    if (this.quoteForm.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.quotesService.addQuote(value);
    } else {
      value.id = this.quoteId;
      this.quotesService.updateQuote(value);
    }
    this.router.navigate(["/quotes"]);
  }

  deleteQuote(e) {
    if (confirm("Are you sure you want to delete this quote?")) {
      this.quotesService.deleteQuote(this.quote);
    }
    this.router.navigate(["/quotes"]);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogStateService } from './state/blog-state.service';
import { CreatedBlog } from 'src/app/core/blog-data.service';

type InvalidFormGroup = {
  title: FormControl<string | null>;
  content: FormControl<string | null>;
};

@Component({
  selector: 'app-add-blog-page',
  templateUrl: './add-blog-page.component.html',
  styleUrls: ['./add-blog-page.component.scss'],
})
export class AddBlogPageComponent implements OnInit {
  myForm!: FormGroup<InvalidFormGroup>;

  constructor(public blogStateService: BlogStateService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup<InvalidFormGroup>({
      title: new FormControl<string | null>('an existing title', [
        Validators.required,
        Validators.pattern('^[A-Z]+(.)*'),
      ]),
      content: new FormControl<string | null>('null'),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm);
      this.blogStateService.addBlog(this.myForm.value as CreatedBlog);
    } else {
      console.log('Form is invalid.');
    }
  }
}

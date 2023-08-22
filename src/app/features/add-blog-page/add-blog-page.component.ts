import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-blog-page',
  templateUrl: './add-blog-page.component.html',
  styleUrls: ['./add-blog-page.component.scss'],
})
export class AddBlogPageComponent implements OnInit {

  myForm!: FormGroup<InvalidFormGroup>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = new FormGroup<InvalidFormGroup>({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form submitted:', this.myForm.value);
    } else {
      console.log('Form is invalid.');
    }
  }
}

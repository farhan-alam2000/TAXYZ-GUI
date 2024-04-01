import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss',
})
export class RequestFormComponent {
  contactForm: FormGroup;
  postUrl: string = 'http://localhost:5000/callbacks/add';

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.httpClient.post(this.postUrl, formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        },
      });
    } else {
      // Form is invalid, handle validation errors as needed
      console.error('form invalid', )
    }
  }
}

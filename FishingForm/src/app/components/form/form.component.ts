import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  durations = [
    "1 week",
    "1 month",
    "6 month",
    "1 year"
  ]

  price: number = 0;

  submitData() {
    console.log('Submit works')
  }

  ticketForm = this.fb.group({
    profile: this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      idCardNumber: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      address: this.fb.group({
        country: ['', Validators.required],
        area: ['', Validators.required],
        municipality: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
      }),
    }),
    ticket: this.fb.group({
      duration: ['', Validators.required],
      type: ['', Validators.required]
    })
  });



  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.ticketForm.controls['duration'].valueChanges.subscribe((value) => {
    //   console.log(value);

    this.ticketForm.valueChanges.subscribe(console.log)

  }

}

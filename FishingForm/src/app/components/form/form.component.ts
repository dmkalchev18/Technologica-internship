import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Ticket } from 'src/app/Ticket';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  @Output() onAddTicket: EventEmitter<Ticket> = new EventEmitter()

  durations = [
    "1 седмица",
    "1 месец",
    "6 месеца",
    "1 година"
  ]

  types = [
    "Детски",
    "Стандартен",
    "Пенсионерски"
  ]

  price: number = 0;

  // 1 седмица = 4 lv
  // 1 месец = 8 lv
  // 6 месеца = 15 lv
  // 1 година = 25 lv 
  // year (14-18 || >=60w || >=65m) -> price /= 2

  onSubmit() {
    if (this.ticketForm.status === "VALID") {
      console.log("shte se pratq")
      const newTicket = this.ticketForm.value;
      this.onAddTicket.emit(newTicket)

    }
    else{
      console.log("nqma da se pratq")
    }
  }

  submitData() {
  }

  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let egn = control.value?.toString();

      if (egn.length == 0) {
        return null;
      }

      let isValid = this.isEGNValid(egn);
      return isValid ? null : { forbiddenName: { value: control.value } };
    };
  }

  ticketForm = this.fb.group({
    profile: this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      idCardNumber: ['', [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
      identificationNumber: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999), this.forbiddenNameValidator()]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.email]],
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
      type: ['', Validators.required],
      price: this.price
    })
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.ticketForm.controls['ticket'].valueChanges.subscribe((value) => { this.price = (this.calcTicket()) });

  }

  calcTicket() {
    let duration: string = this.ticketForm.controls['ticket'].value.duration;
    let type: string = this.ticketForm.controls['ticket'].value.type;

    // console.log((this.ticketForm.controls['profile'] as FormGroup).controls['firstName'].hasError('required'));
    console.log(this.ticketForm.get('profile.firstName')?.hasError('required'));

    this.price = this.calcByDuration(duration);
    this.price = this.calcByType(type);
    return this.price;
  }

  calcByDuration(duration: string) {
    return (duration === "1 седмица") ? 4 : (duration === "1 месец") ? 8 : (duration === "6 месеца") ? 15 : (duration === "1 година") ? 25 : 0;
  }
  calcByType(type: string) {
    return (type === "Детски" || type === "Пенсионерски") ? this.price /= 2 : this.price = this.price;
  }

  isDigit(str: string) {
    var test = "" + str;
    if (test >= "0" && test <= "9") {
      return true;
    }
    else {
      return false;
    }
  }

  areAllElementsDigits(egn: string) {
    var test = "" + egn;
    for (var k = 0; k < test.length; k++) {
      var c = test.substring(k, k + 1);
      if (this.isDigit(c) == false) {
        return false;
      }
    }
    return true;
  }

  isValidDate(egn: string) {
    var test = "" + egn;
    var gg = parseInt(test.substring(0, 2), 10);
    var mm = parseInt(test.substring(2, 4), 10);
    var dd = parseInt(test.substring(4, 6), 10);

    if (!((mm >= 1 && mm <= 12) || (mm >= 21 && mm <= 32) || (mm >= 41 && mm <= 52))) {

      return false;
    }
    if (dd < 1 || dd > 31) {

      return false;
    }
    return true;
  }

  makeArray(number: number) {
    let arr: number[] = [];
    arr.length = number;
    for (let i = 1; i <= number; i++) {
      arr[i] = 0;
    }
    return arr;
  }

  isEGN(str: string) {
    let koef: number[] = this.makeArray(10);
    koef[0] = 2;
    koef[1] = 4;
    koef[2] = 8;
    koef[3] = 5;
    koef[4] = 10;
    koef[5] = 9;
    koef[6] = 7;
    koef[7] = 3;
    koef[8] = 6;
    koef[9] = 0;
    var sum = 0;

    var arr = this.makeArray(10);

    var test = '' + str;
    for (var i = 0; i < 9; i++) {
      arr[i] = parseInt(test.substring(i, i + 1), 10);
      sum += arr[i] * koef[i];
    }
    sum = sum % 11;
    if (sum == 10) {
      sum = 0;
    }

    if (sum == parseInt(test.substring(9, 10), 10)) {
      return true;
    }
    else {

      return false;
    }
  }

  isEGNValid(egn: string) {
    if (egn.length !== 10) {
      return false;
    }

    if (this.areAllElementsDigits(egn.substring(0, 10)) == false) {
      return false;
    }

    if (this.isValidDate(egn.substring(0, 6)) == false) {
      return false;
    }

    if (this.isEGN(egn.substring(0, 10)) == false) {
      return false;
    }

    return true;
  }
}

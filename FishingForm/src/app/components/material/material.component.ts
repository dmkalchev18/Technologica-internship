import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  constructor() { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  ngOnInit(): void {
  }

}

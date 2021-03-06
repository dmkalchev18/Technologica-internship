import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() text: string = "";
  @Input() identificator: string = ""; 

  constructor() { }

  ngOnInit(): void {
  }

}

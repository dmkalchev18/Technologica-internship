import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

const MaterialComponent = [
  MatInputModule,
  MatButtonModule
]

@NgModule({
  
  imports: [MaterialComponent],
  exports: [MaterialComponent]
})
export class MaterialModule { }

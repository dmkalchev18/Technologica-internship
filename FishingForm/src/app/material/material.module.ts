import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';



const MaterialComponent = [
  MatInputModule,
  MatButtonModule,
  MatSelectModule
]

@NgModule({
  
  imports: [MaterialComponent],
  exports: [MaterialComponent]
})
export class MaterialModule { }

import { Component, forwardRef, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ToggleButtonComponent),
    }
  ]
})
export class ToggleButtonComponent implements ControlValueAccessor  {
  toggleOptions: Array<String> = ["Australian Passport", "Driver Licence", "Foreign Passport", "Foreign ID Card"];
  
  public selectedButtons : String[];
  public disabled: boolean;
  private onChange: Function;
  private onTouched: Function;

  constructor() {
  this.onChange =  (_: any) => {};
  this.onTouched = (_: any) => {};
  this.disabled = false; 
  this.selectedButtons =[];
  }  

  writeValue(obj: any): void {
    console.log("obj:")
    console.log(obj)
    this.selectedButtons = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onToggleGroupChange(item: any) {
    // console.log("Selected Button: " + item.value);

    //Add selected button to the array
    this.selectedButtons.push(item.value);
    //this.selectedButtons.forEach(i => {console.log("Included Item: ")
   // console.log(i)});
   this.onChange(this.selectedButtons);
  }
  
}
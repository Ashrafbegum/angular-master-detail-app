import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide : NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomControlComponent),
  multi : true, 
  }; 
  
@Component({
  selector: 'app-custom-control',
  providers : [CUSTOM_VALUE_ACCESSOR],
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.css']
})
export class CustomControlComponent implements ControlValueAccessor {

  private level: string='';
  // private disabled: boolean;
  public disabled: boolean;

  private onChange: Function; 
  private onTouched: Function; 
  
  constructor() {
  this.onChange = (_: any) => {};
  this.onTouched = () => {};
  this.disabled = false; 
  } 
  
  public isActive(value: string): boolean {
  return value === this.level; 
  } 
  
  public setLevel(value: string): void {
  this.level = value;
  this.onChange(this.level);
  this.onTouched(); 
  } 
  
  writeValue(obj: any): void {
  this.level = obj; 
  } 
  
  registerOnChange(fn: any): void{
  this.onChange = fn; 
  } 
  
  registerOnTouched(fn: any): void {
  this.onTouched = fn; 
  } 
  
  setDisabledState(isDisabled: boolean): void {
  this.disabled = isDisabled; 
  }
}

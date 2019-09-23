/**
 * @description: Used to restrict the user inputs
 * it allows alphabets and space by checking the Pattern ^[a-zA-Z ]*$
 * @class: PreventNumbersDirective
 *
 */

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[authorityPreventNumbers]',
})
export class PreventNumbersDirective {

  pattern = new RegExp(/^[a-zA-Z ]*$/);
  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  _onKeypress(e) {
    const keyCode = (e.which) ? e.which : e.keyCode;
    const commonKeyCodes = [8, 9, 32];
    if (keyCode) {
      if (!((keyCode > 96 && keyCode < 123) || (keyCode > 64 && keyCode < 91)) && commonKeyCodes.indexOf(keyCode) < 0) {
        e.preventDefault();
      }
    }
  }

  @HostListener('paste', ['$event'])
  _paste(e) {
    if (!this.pattern.test(e.clipboardData.getData('Text'))) {
      e.preventDefault();
    }

  }

}

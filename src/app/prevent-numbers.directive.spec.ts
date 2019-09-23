import { PreventNumbersDirective } from './prevent-numbers.directive';
import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'authority-mock-input',
  template: `<div>
  <input type=text authorityPreventNumbers>
  </div>`
})
class MockComponent {
  constructor() { }
}
describe('PreventNumbersDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let component: MockComponent;
  let inputEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent, PreventNumbersDirective
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  describe('Test keypress events', () => {
    it('should restrict number', () => {
      const event = generateKeypressEvent('0', 48);
      const event2 = generateKeypressEvent('numpad1', 97);
      spyOn(event, 'preventDefault');
      spyOn(event2, 'preventDefault');
      inputEl.triggerEventHandler('keypress', event);
      fixture.detectChanges();

      expect(event.preventDefault).toHaveBeenCalled();

      inputEl.triggerEventHandler('keypress', event2);
      fixture.detectChanges();

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should allow alphabets', () => {
      const event = generateKeypressEvent('a', 65);
      const event2 = generateKeypressEvent('m', 77);
      spyOn(event, 'preventDefault');
      spyOn(event2, 'preventDefault');
      inputEl.triggerEventHandler('keypress', event);
      fixture.detectChanges();

      expect(event.preventDefault).not.toHaveBeenCalled();

      inputEl.triggerEventHandler('keypress', event2);
      fixture.detectChanges();

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should allow tab', () => {
      const event = generateKeypressEvent('Tab', 9);
      spyOn(event, 'preventDefault');
      inputEl.triggerEventHandler('keypress', event);
      fixture.detectChanges();

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
    it('should allow Backspace', () => {
      const event = generateKeypressEvent('Backspace', 8);
      spyOn(event, 'preventDefault');
      inputEl.triggerEventHandler('keypress', event);
      fixture.detectChanges();

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
    it('should allow Spacebar', () => {
      const event = generateKeypressEvent('Space', 32);
      spyOn(event, 'preventDefault');
      inputEl.triggerEventHandler('keypress', event);
      fixture.detectChanges();

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });
  describe('Test Paste event', () => {
    it('should restrict paste if it is not satisfing the RegExp', () => {
      const event: ClipboardEvent = generatePasteEvent('123 123');
      spyOn(event, 'preventDefault');

      inputEl.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(event.preventDefault).toHaveBeenCalled();
    });
    it('should allow paste if it satisfy the RegExp', () => {
      const event: ClipboardEvent = generatePasteEvent('abc abc');
      spyOn(event, 'preventDefault');

      inputEl.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  /**
   * GENERATE KEYBOARD EVENT FOR MOCKING KEYPRESS
   * @param keyData KEY NAME
   * @param keyCodeData KEY CODE
   * @param whichData KEY WHICH
   */
  function generateKeypressEvent(keyData: string, keyCode?: number): KeyboardEvent {
    let event;
    try {
      // Other Browser
      event = new KeyboardEvent('keypress', { key: keyData });
      if (keyCode) {
        Object.defineProperty(event, 'keyCode', { value: keyCode });
      }
    } catch (e) {
      // IE
      event = document.createEvent('KeyboardEvent');
      event.initKeyboardEvent('keypress', true, false, null, keyData, null, '', false, '');
    }
    return event;
  }

  function generatePasteEvent(data: any): ClipboardEvent {
    let event;
    try {
      event = new ClipboardEvent('paste', { dataType: 'text/plain', data: data, });
    } catch (e) {
      event = document.createEvent('Event');
      event.initEvent('paste', false, false);
    }
    Object.defineProperty(event, 'clipboardData', { 'value': { 'getData': (): string => data } });
    return event;
  }
});

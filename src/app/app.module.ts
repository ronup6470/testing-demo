import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchPipe } from './search-pipe.pipe';
import { PreventNumbersDirective } from './prevent-numbers.directive';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    PreventNumbersDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

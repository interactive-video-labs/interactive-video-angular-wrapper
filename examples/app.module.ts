import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InteractiveVideoComponent } from '@interactive-video-labs/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InteractiveVideoComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

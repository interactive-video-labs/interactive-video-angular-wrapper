
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Simple Interactive Video Example</h1>
    <iv-interactive-video
      [videoUrl]="'https://storage.googleapis.com/interactive-video-labs-public/demo-assets/a-z/video.mp4'"
      [cues]="[
        {
          id: 'cue-1',
          time: 5,
          payload: {
            type: 'text',
            data: {
              text: 'This is a simple text overlay.',
            },
          },
        }
      ]"
      (analyticsEvent)="onAnalyticsEvent($event)"
    ></iv-interactive-video>
  `,
})
export class AppComponent {
  onAnalyticsEvent(event: any) {
    console.log('Analytics Event:', event);
  }
}

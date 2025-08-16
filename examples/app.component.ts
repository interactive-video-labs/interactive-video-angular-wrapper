import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf
import { InteractiveVideoModule } from '@interactive-video-labs/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InteractiveVideoModule], // Import the Angular wrapper module
  template: `
    <h1>Simple Interactive Video Example</h1>
    <iv-interactive-video
      [videoUrl]="'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'"
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


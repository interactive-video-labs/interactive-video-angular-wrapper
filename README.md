# @interactive-video-labs/angular

Thin Angular wrapper for the `@interactive-video-labs/core` engine. Enables cue-based interactive video playback in Angular applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [With Cue Points](#with-cue-points)
  - [With Translations](#with-translations)
  - [With Analytics Events](#with-analytics-events)
  - [Mounting to an External Element](#mounting-to-an-external-element)
- [API Reference](#api-reference)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

YouTo install the package, use your preferred package manager:

```bash
# Using pnpm
pnpm add @interactive-video-labs/angular @interactive-video-labs/core

# Using npm
npm install @interactive-video-labs/angular @interactive-video-labs/core

# Using yarn
yarn add @interactive-video-labs/angular @interactive-video-labs/core
```

## Usage

Import `InteractiveVideoComponent` into your Angular component's `imports` array:

```typescript
import { InteractiveVideoComponent } from '@interactive-video-labs/angular';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [InteractiveVideoComponent],
  template: `
    <iv-interactive-video videoUrl="your-video-url.mp4"></iv-interactive-video>
  `,
})
export class MyComponent {}
```

### Basic Usage

```html
<iv-interactive-video videoUrl="https://example.com/your-video.mp4"></iv-interactive-video>
```

### With Cue Points

```typescript
import { Component } from '@angular/core';
import { InteractiveVideoComponent, CuePoint } from '@interactive-video-labs/angular';

@Component({
  selector: 'app-cue-point-example',
  standalone: true,
  imports: [InteractiveVideoComponent],
  template: `
    <iv-interactive-video
      videoUrl="https://example.com/video-with-cues.mp4"
      [cues]="myCues"
    ></iv-interactive-video>
  `,
})
export class CuePointExampleComponent {
  myCues: CuePoint[] = [
    { time: 5, type: 'text', value: 'Hello at 5 seconds!' },
    { time: 10, type: 'image', value: 'https://example.com/image.png' },
  ];
}
```

### With Translations

```typescript
import { Component } from '@angular/core';
import { InteractiveVideoComponent, Translations } from '@interactive-video-labs/angular';

@Component({
  selector: 'app-translation-example',
  standalone: true,
  imports: [InteractiveVideoComponent],
  template: `
    <iv-interactive-video
      videoUrl="https://example.com/video.mp4"
      locale="es"
      [translations]="spanishTranslations"
    ></iv-interactive-video>
  `,
})
export class TranslationExampleComponent {
  spanishTranslations: Translations = {
    play: 'Reproducir',
    pause: 'Pausar',
    // ... other translations
  };
}
```

### With Analytics Events

```typescript
import { Component } from '@angular/core';
import { InteractiveVideoComponent, AnalyticsEvent, AnalyticsPayload } from '@interactive-video-labs/angular';

@Component({
  selector: 'app-analytics-example',
  standalone: true,
  imports: [InteractiveVideoComponent],
  template: `
    <iv-interactive-video
      videoUrl="https://example.com/video.mp4"
      (analyticsEvent)="handleAnalytics($event)"
    ></iv-interactive-video>
  `,
})
export class AnalyticsExampleComponent {
  handleAnalytics(event: [event: AnalyticsEvent, payload?: AnalyticsPayload]): void {
    const [eventName, payload] = event;
    console.log(`Analytics Event: ${eventName}`, payload);
    // Send to your analytics service
  }
}
```

### Mounting to an External Element

You can mount the player to an existing HTML element by providing its ID to the `targetElementId` input.

```html
<div id="my-custom-player-container" style="width: 100%; height: 400px;"></div>
<iv-interactive-video
  videoUrl="https://example.com/video.mp4"
  targetElementId="my-custom-player-container"
></iv-interactive-video>
```

## API Reference

### Inputs

| Name            | Type                                     | Description                                                               | Default     | Required |
| :-------------- | :--------------------------------------- | :------------------------------------------------------------------------ | :---------- | :------- |
| `videoUrl`      | `string`                                 | The URL of the video to be loaded.                                        | `undefined` | Yes      |
| `cues`          | `CuePoint[]`                             | An array of cue points for interactive events.                            | `undefined` | No       |
| `translations`  | `Translations`                           | An object containing translations for the player.                         | `undefined` | No       |
| `autoplay`      | `boolean`                                | Whether the video should start playing automatically.                     | `false`     | No       |
| `loop`          | `boolean`                                | Whether the video should loop.                                            | `false`     | No       |
| `locale`        | `string`                                 | The locale to be used for the player.                                     | `'en'`      | No       |
| `targetElementId` | `string`                                 | The ID of an external HTML element where the player will be mounted.      | `undefined` | No       |

### Outputs

| Name             | Type                                                               | Description                                     |
| :--------------- | :----------------------------------------------------------------- | :---------------------------------------------- |
| `analyticsEvent` | `EventEmitter<[event: AnalyticsEvent, payload?: AnalyticsPayload]>` | Emits analytics events from the player.         |

## Development

For detailed instructions on setting up your development environment, installing dependencies, running tests, and building the project, please refer to the [DEVELOPER.md](DEVELOPER.md) file.

## Contributing

We welcome contributions to `@interactive-video-labs/angular`! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the [MIT License](LICENSE).
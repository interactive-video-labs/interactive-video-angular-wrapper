import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IVLabsPlayer, PlayerConfig, CuePoint, Translations, type AnalyticsEvent, type AnalyticsPayload } from '@interactive-video-labs/core';

/**
 * A standalone Angular component that wraps the IVLabsPlayer to provide interactive video capabilities.
 * It handles the lifecycle of the player, including initialization, updates, and destruction.
 */
@Component({
  selector: 'iv-interactive-video',
  template: `
    <div *ngIf="!targetElementId" #playerContainer [id]="playerTargetId" style="width: 100%; height: auto;" data-testid="interactive-video-container"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InteractiveVideoComponent implements AfterViewInit, OnDestroy, OnChanges {
  /**
   * The URL of the video to be loaded.
   */
  @Input({ required: true }) videoUrl!: string;

  /**
   * An array of cue points for interactive events.
   */
  @Input() cues?: CuePoint[];

  /**
   * An object containing translations for the player.
   */
  @Input() translations?: Translations;

  /**
   * Whether the video should start playing automatically.
   */
  @Input() autoplay: boolean = false;

  /**
   * Whether the video should loop.
   */
  @Input() loop: boolean = false;

  /**
   * The locale to be used for the player.
   */
  @Input() locale: string = 'en';

  /**
   * The ID of an external HTML element where the player will be mounted.
   * If provided, the component will not render its own container div.
   */
  @Input() targetElementId?: string;

  /**
   * Emits analytics events from the player.
   * The payload is a tuple containing the event name and the associated data.
   */
  @Output() analyticsEvent = new EventEmitter<[event: AnalyticsEvent, payload?: AnalyticsPayload]>();

  @ViewChild('playerContainer') playerContainer?: ElementRef<HTMLDivElement>;

  public player: IVLabsPlayer | null = null;
  public playerTargetId: string;

  constructor() {
    this.playerTargetId = this.targetElementId || `ivlabs-player-${Math.random().toString(36).substring(2, 9)}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.player) {
      const shouldReinitialize =
        (changes['videoUrl'] && changes['videoUrl'].currentValue) ||
        (changes['autoplay'] && changes['autoplay'].currentValue != null) ||
        (changes['loop'] && changes['loop'].currentValue != null);

      if (shouldReinitialize) {
        this.player.destroy();
        this.player = null;
        this.initializePlayer();
      } else {
        if (changes['cues'] && changes['cues'].currentValue) {
          this.player.loadCues(changes['cues'].currentValue);
        }
        if (changes['translations'] && changes['translations'].currentValue) {
          this.player.loadTranslations(this.locale, changes['translations'].currentValue);
        }
        if (changes['locale'] && changes['locale'].currentValue) {
          this.player.setLocale(changes['locale'].currentValue);
        }
      }
    }
  }

  ngAfterViewInit(): void {
    // Use a timeout to ensure the view is fully initialized and the target element is in the DOM.
    setTimeout(() => this.initializePlayer(), 0);
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
  }

  private initializePlayer(): void {
    if (this.player) {
      return; // Already initialized
    }

    const targetId = this.targetElementId || this.playerTargetId;

    // Ensure the target element exists in the DOM.
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      console.error(`IVLabsPlayer target element with ID '${targetId}' not found.`);
      return;
    }

    const playerConfig: PlayerConfig = {
      videoUrl: this.videoUrl,
      autoplay: this.autoplay,
      loop: this.loop,
      locale: this.locale,
    };

    try {
      this.player = new IVLabsPlayer(targetId, playerConfig);

      if (this.analyticsEvent.observed) {
        const eventsToRegister: AnalyticsEvent[] = [
          'PLAYER_LOADED',
          'VIDEO_STARTED',
          'VIDEO_PAUSED',
          'VIDEO_ENDED',
          'CUE_TRIGGERED',
          'INTERACTION_COMPLETED',
          'ERROR',
        ];
        eventsToRegister.forEach((event) => {
          this.player?.on(event, (payload?: AnalyticsPayload) => {
            this.analyticsEvent.emit([event, payload]);
          });
        });
      }

      if (this.cues) {
        this.player.loadCues(this.cues);
      }

      if (this.translations) {
        this.player.loadTranslations(this.locale, this.translations);
      }
    } catch (error) {
      console.error('Error initializing IVLabsPlayer:', error);
    }
  }
}

/**
 * @deprecated This module is deprecated. Import `InteractiveVideoComponent` directly as it is a standalone component.
 * A module for the InteractiveVideoComponent for non-standalone usage.
 */
@NgModule({
  imports: [CommonModule, InteractiveVideoComponent],
  exports: [InteractiveVideoComponent],
})
export class InteractiveVideoModule {}

// For backwards compatibility and to expose the component directly
export {
  IVLabsPlayer,
  type PlayerConfig,
  type CuePoint,
  type Translations,
  type AnalyticsEvent,
  type AnalyticsPayload,
} from '@interactive-video-labs/core';
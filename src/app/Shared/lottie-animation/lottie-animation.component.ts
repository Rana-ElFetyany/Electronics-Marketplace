import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-lottie-animation',
  standalone: true,
  template: '<div #lottieContainer class="lottie-container"></div>',
  styles: [
    `
      .lottie-container {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class LottieAnimationComponent implements AfterViewInit, OnDestroy {
  @Input() animationPath!: string;
  @Input() loop: boolean = true;
  @Input() autoplay: boolean = true;

  private animation!: AnimationItem;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.animation = lottie.loadAnimation({
      container: this.el.nativeElement.querySelector('.lottie-container'),
      renderer: 'svg',
      loop: this.loop,
      autoplay: this.autoplay,
      path: this.animationPath,
    });
  }

  // Public methods to control animation
  play(): void {
    this.animation.play();
  }

  pause(): void {
    this.animation.pause();
  }

  stop(): void {
    this.animation.stop();
  }

  ngOnDestroy() {
    this.animation.destroy();
  }
}

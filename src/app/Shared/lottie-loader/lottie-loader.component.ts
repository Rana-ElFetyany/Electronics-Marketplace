import { Component, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import lottie from 'lottie-web';

@Component({
  selector: 'app-lottie-loader',
  standalone: true,
  templateUrl: './lottie-loader.component.html',
  styleUrls: ['./lottie-loader.component.scss'],
  // template: '<span class="loader"></span>',
  // template: '<div #lottieContainer class="loader-container"></div>',
  // styles: [
  //   `
  //     .loader-container {
  //       position: fixed;
  //       top: 0;
  //       left: 0;
  //       width: 100vw;
  //       height: 100vh;
  //       background: white;
  //       z-index: 9999;
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //     }
  //   `,
  // ],
})
export class LottieLoaderComponent implements OnInit {
  private animation: any;

  constructor(private el: ElementRef) {}

  // Add error handling:
  ngOnInit(): void {
  
    try {
      this.animation = lottie.loadAnimation({
        container: this.el.nativeElement.querySelector('.lottie-container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../../../json/animation_1745670581082.json',
      });

      console.log('Animation loaded:', this.animation); // Debug log
    } catch (error) {
      console.error('Lottie error:', error);
    }
  

  
    // Auto-hide after 7 seconds
    setTimeout(() => {
      this.el.nativeElement.style.display = 'none';
    }, 7000);
  }

  // ngOnDestroy() {
  //   this.animation.destroy();
  // }
}


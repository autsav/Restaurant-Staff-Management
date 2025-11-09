import { Component, ChangeDetectionStrategy, input, viewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

declare var Chart: any; // Using Chart.js from CDN

@Component({
  selector: 'app-chart',
  template: `<div class="w-full h-full"><canvas #canvas></canvas></div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  
  type = input.required<'bar' | 'line' | 'pie' | 'doughnut'>();
  data = input.required<any>();
  options = input<any>({});

  private chart: any;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }

  private createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = this.canvas().nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: this.type(),
        data: this.data(),
        options: this.options(),
      });
    }
  }
}

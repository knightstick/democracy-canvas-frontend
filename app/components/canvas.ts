import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
interface CanvasArgs {
}

const Colours = [
  'green',
  'purple',
  'blue'
]

export default class Canvas extends Component<CanvasArgs> {
  canvasElement?: HTMLCanvasElement;
  @tracked isDrawing = false;

  randomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  renderSquare(x: number, y: number, color: any, size: number) {
    const ctx = this.canvasElement?.getContext('2d')!;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size)
  }

  @action
  drawRandomRectangle() {
    const color = Colours[this.randomNumber(3)];
    this.renderSquare(this.randomNumber(100),this.randomNumber(100), color,this.randomNumber(200))
  }

  @action
  startDrawing() {
    this.isDrawing = true;
  }

  @action
  keepDrawing(mouseEvent: MouseEvent) {
    if (this.isDrawing) {
      const color = 'green';

      const x = mouseEvent.clientX - (this.canvasElement?.offsetLeft || 0);
      const y = mouseEvent.clientY - (this.canvasElement?.offsetTop || 0);
      const size = 1;

      this.renderSquare(x, y, color, size);
    }
  }

  @action
  stopDrawing() {
    this.isDrawing = false;
  }

  @action
  renderCanvas(element: HTMLCanvasElement) {
    this.canvasElement = element;
  }
}

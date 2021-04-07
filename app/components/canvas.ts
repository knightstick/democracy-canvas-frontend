import Component from '@glimmer/component';
import { action } from '@ember/object';

// TODO
// add a type for colour
// add a type for a point
// reuseable code cleanup
// clear canvas button
// store current drawing colour as state
// implement fan mode
// implement rainbow road

interface CanvasArgs {}

const Colours = [
  'green',
  'purple',
  'blue',
  'aqua',
  'teal',
  'yellow',
  'fuschia',
  'orange',
  'papyrus',
];

export default class Canvas extends Component<CanvasArgs> {
  canvasElement?: HTMLCanvasElement;
  drawingX: number | null = null;
  drawingY: number | null = null;

  randomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  renderSquare(x: number, y: number, color: any, size: number) {
    const ctx = this.canvasElement?.getContext('2d')!;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
  }

  @action
  drawRandomRectangle() {
    const color = Colours[this.randomNumber(Colours.length)];
    const element = this.canvasElement!;

    this.renderSquare(
      this.randomNumber(element.width),
      this.randomNumber(element.height),
      color,
      this.randomNumber(200)
    );
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, colour: any) {
    const ctx = this.canvasElement?.getContext('2d')!;

    ctx.beginPath();
    ctx.strokeStyle = colour;
    ctx.lineWidth = 3;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }

  @action
  drawRandomLine() {
    const colour = Colours[this.randomNumber(Colours.length)];
    const element = this.canvasElement!;

    this.drawLine(
      this.randomNumber(element.width),
      this.randomNumber(element.height),
      this.randomNumber(element.width),
      this.randomNumber(element.height),
      colour
    );
  }

  @action
  startDrawing(mouseEvent: MouseEvent) {
    this.drawingX = mouseEvent.clientX - (this.canvasElement?.offsetLeft || 0);
    this.drawingY = mouseEvent.clientY - (this.canvasElement?.offsetTop || 0);
  }

  @action
  keepDrawing(mouseEvent: MouseEvent) {
    if (this.drawingX && this.drawingY) {
      const colour = Colours[this.randomNumber(Colours.length)];

      const x = mouseEvent.clientX - (this.canvasElement?.offsetLeft || 0);
      const y = mouseEvent.clientY - (this.canvasElement?.offsetTop || 0);
      this.drawLine(this.drawingX, this.drawingY, x, y, colour);
      this.drawingX = x;
      this.drawingY = y;
    }
  }

  @action
  keepDrawingFan(mouseEvent: MouseEvent) {
    if (this.drawingX && this.drawingY) {
      const colour = Colours[this.randomNumber(Colours.length)];

      const x = mouseEvent.clientX - (this.canvasElement?.offsetLeft || 0);
      const y = mouseEvent.clientY - (this.canvasElement?.offsetTop || 0);
      this.drawLine(this.drawingX, this.drawingY, x, y, colour);
    }
  }

  @action
  stopDrawing() {
    this.drawingX = null;
    this.drawingY = null;
  }

  @action
  renderCanvas(element: HTMLCanvasElement) {
    this.canvasElement = element;
  }
}

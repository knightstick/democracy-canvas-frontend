import Component from '@glimmer/component';
import { action } from '@ember/object';
interface CanvasArgs {
}

const Colours = [
  'green',
  'purple',
  'blue'
]

export default class Canvas extends Component<CanvasArgs> {
  canvasElement?: HTMLCanvasElement;

  @action
  renderCanvas(element: HTMLCanvasElement) {
    this.canvasElement = element;
  }

  randomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  @action
  renderRectangle() {
    const ctx = this.canvasElement?.getContext('2d')!;

    ctx.fillStyle = Colours[this.randomNumber(3)];
    ctx.fillRect(this.randomNumber(100),this.randomNumber(100),this.randomNumber(200), this.randomNumber(150))
  }
}

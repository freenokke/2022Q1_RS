/* eslint-disable no-console */
import ICar from '../../../../types/ICar';
import Control from '../../../Control';
import AppController from '../../../controller/AppController';
import Track from './track/Track';

class Garage extends Control {
  private displayedCars: Array<Track>;
  private controller: AppController;

  constructor(
    parentNode: HTMLElement,
    tag: string,
    className: string,
    content: string,
    controller: AppController
  ) {
    super(parentNode, tag, className, content);
    this.controller = controller;
  }

  render(cars: Array<ICar>): void {
    if (this.node.firstElementChild) {
      this.clear();
    }
    const arr = cars.map((element) => {
      const track = new Track(
        this.node,
        'div',
        'track',
        element.name,
        element.color,
        element.id,
        this.controller,
        (carsList) => this.render(carsList)
      );
      return track;
    });

    this.displayedCars = arr;
  }
}

export default Garage;

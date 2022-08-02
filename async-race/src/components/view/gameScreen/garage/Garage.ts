import Control from '../../../Control';
import AppController from '../../../controller/AppController';

class Garage extends Control {
  displayedCars: Array<Track>;
  controller: AppController;

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

}

export default Garage;

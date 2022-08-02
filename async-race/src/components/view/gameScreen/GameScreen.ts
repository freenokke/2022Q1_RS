import Garage from './garage/Garage';
import ScreenRouter from '../ViewRouter';
import AppController from '../../controller/AppController';

class GameScreen extends ScreenRouter {
  garage: Garage;
  private controller: AppController;

  constructor(
    parentNode: HTMLElement,
    tagName: string,
    className: string,
    content: string,
    controller: AppController
  ) {
    super(parentNode, tagName, className, content);
    this.controller = controller;
    this.garage = new Garage(this.node, 'div', 'garage mt-3', '', controller);
  }
}
export default GameScreen;

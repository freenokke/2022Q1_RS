import GameHadler from './handling/GameHandler';
import Garage from './garage/Garage';
import ScreenRouter from '../ViewRouter';
import AppController from '../../controller/AppController';

class GameScreen extends ScreenRouter {
  public handler: GameHadler;
  public garage: Garage;

  constructor(
    parentNode: HTMLElement,
    tagName: string,
    className: string,
    content: string,
    controller: AppController
  ) {
    super(parentNode, tagName, className, content);
    this.handler = new GameHadler(this.node, 'div', 'handler', '', controller);
    this.garage = new Garage(
      this.node,
      'div',
      'garage mt-3 flex flex-col gap-2',
      '',
      controller
    );
    this.handler.GARAGE = this.garage;
  }
}
export default GameScreen;

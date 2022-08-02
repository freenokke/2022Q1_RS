import Control from '../Control';
import AppController from '../controller/AppController';
import GameScreen from './gameScreen/GameScreen';
import ScreenToggler from './screenToggler/ScreenToggler';
import WinnersScreen from './winnerScreen/WinnersScreen';

class AppView extends Control {
  public screenToggler: ScreenToggler;
  public gameScreen: GameScreen;
  public winnerScreen: WinnersScreen;

  constructor(
    parentNode: HTMLElement,
    tag: string,
    className: string,
    content: string,
    controller: AppController
  ) {
    super(parentNode, tag, className, content);
    this.gameScreen = new GameScreen(
      this.node,
      'main',
      'view__gamescreen w-[100%] bg-red-200 absolute top-[45px] left-0 px-3 hidden',
      '',
      controller
    );
    this.winnerScreen = new WinnersScreen(
      this.node,
      'div',
      'view__winnerScreen w-[100%] h-[500px] bg-blue-200 absolute top-[45px] left-0 hidden'
    );
    this.screenToggler = new ScreenToggler(
      parentNode,
      'div',
      'view__screen-toggler',
      '',
      this.gameScreen,
      this.winnerScreen
    );
  }
}

export default AppView;

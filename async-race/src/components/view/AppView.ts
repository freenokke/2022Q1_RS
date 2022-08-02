import Control from '../Control';
import AppController from '../controller/AppController';
import GameScreen from './gameScreen/GameScreen';
import WinnersScreen from './winnerScreen/WinnersScreen';
class AppView extends Control {
  controller: AppController;
  gameScreen: GameScreen;
  winnerScreen: WinnersScreen;

  constructor(
    parentNode: HTMLElement,
    tag: string,
    className: string,
    content: string,
    controller: AppController
  ) {
    super(parentNode, tag, className, content);
    this.controller = controller;
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
  }
}

export default AppView;

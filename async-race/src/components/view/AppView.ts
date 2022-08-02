import Control from '../Control';
import AppController from '../controller/AppController';
import GameScreen from './gameScreen/GameScreen';
class AppView extends Control {
  controller: AppController;
  gameScreen: GameScreen;
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
  }
}

export default AppView;

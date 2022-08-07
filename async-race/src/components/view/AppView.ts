import Control from '../helpers/Control';
import AppController from '../controller/AppController';
import GameScreen from './gameScreen/GameScreen';
import ScreenToggler from './screenToggler/ScreenToggler';
import WinnersScreen from './winnerScreen/WinnersScreen';
import IWinner from '../../types/IWinner';

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
    this.winnerScreen = new WinnersScreen(
      this.node,
      'div',
      'view__winnerScreen w-[100%] absolute top-[45px] left-0 flex justify-center hidden',
      controller
    );
    this.gameScreen = new GameScreen(
      this.node,
      'main',
      'view__gamescreen w-[100%] absolute top-[45px] left-0 px-3 hidden',
      '',
      controller
    );
    this.screenToggler = new ScreenToggler(
      parentNode,
      'div',
      'view__screen-toggler',
      '',
      this.gameScreen,
      this.winnerScreen
    );
    this.gameScreen.garage.rerenderWinners = (winners: IWinner[]) =>
      this.winnerScreen.table.render(winners);
  }
}

export default AppView;

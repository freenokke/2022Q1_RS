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
      null,
      'main',
      'view__winnerScreen w-[100%] absolute top-[70px] left-0 flex justify-center',
      controller
    );
    this.gameScreen = new GameScreen(
      null,
      'main',
      'view__gamescreen w-[100%] absolute top-[70px] left-0 px-3',
      '',
      controller
    );
    this.screenToggler = new ScreenToggler(
      parentNode,
      'div',
      'view__screen-toggler flex justify-center p-3 gap-3',
      '',
      this.gameScreen,
      this.winnerScreen,
      this.node
    );
    this.gameScreen.garage.rerenderWinners = (winners: IWinner[]) =>
      this.winnerScreen.table.render(winners);
    this.gameScreen.handler.disableViewButtons = (boolean: boolean) => {
      this.screenToggler.disableViewsButtons(boolean);
    };
  }
}

export default AppView;

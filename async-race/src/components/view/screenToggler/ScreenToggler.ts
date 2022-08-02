import Control from '../../Control';
import GameScreen from '../gameScreen/GameScreen';
import WinnersScreen from '../winnerScreen/WinnersScreen';

class ScreenToggler extends Control {
  showGameViewButton: Control<HTMLElement>;
  showWinnersViewButton: Control<HTMLElement>;
  winnersScreen: any;
  gameScreen: any;

  constructor(
    parentNode: HTMLElement,
    tag: string,
    className: string,
    content: string,
    gameScreen: GameScreen,
    winnersScreen: WinnersScreen
  ) {
    super(parentNode, tag, className, content);
    this.showGameViewButton = new Control(
      this.node,
      'button',
      'btn btn-red',
      'Game'
    );
    this.showWinnersViewButton = new Control(
      this.node,
      'button',
      'btn btn-blue',
      'Winners'
    );

    this.gameScreen = gameScreen;
    this.winnersScreen = winnersScreen;

    this.showGameViewButton.node.onclick = () => {
      this.gameScreen.showScreen();
      this.winnersScreen.hideScreen();
      localStorage.setItem('screen', 'game');
    };

    this.showWinnersViewButton.node.onclick = () => {
      this.gameScreen.hideScreen();
      this.winnersScreen.showScreen();
      localStorage.setItem('screen', 'winners');
    };
  }
}

export default ScreenToggler;

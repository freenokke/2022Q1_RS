import Control from '../../helpers/Control';
import GameScreen from '../gameScreen/GameScreen';
import WinnersScreen from '../winnerScreen/WinnersScreen';

class ScreenToggler extends Control {
  private showGameViewButton: Control<HTMLElement>;
  private showWinnersViewButton: Control<HTMLElement>;
  private winnersScreen: WinnersScreen;
  private gameScreen: GameScreen;

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
      sessionStorage.setItem('screen', 'game');
    };

    this.showWinnersViewButton.node.onclick = () => {
      this.gameScreen.hideScreen();
      this.winnersScreen.showScreen();
      sessionStorage.setItem('screen', 'winners');
    };
  }

  public disableViewsButtons(boolean: boolean) {
    if (boolean) {
      this.showGameViewButton.node.classList.remove('btn-red');
      this.showWinnersViewButton.node.classList.remove('btn-blue');
      this.showGameViewButton.node.classList.add(
        'pointer-events-none',
        'btn-pressed'
      );
      this.showWinnersViewButton.node.classList.add(
        'pointer-events-none',
        'btn-pressed'
      );
    } else {
      this.showGameViewButton.node.classList.add('btn-red');
      this.showWinnersViewButton.node.classList.add('btn-blue');
      this.showGameViewButton.node.classList.remove(
        'pointer-events-none',
        'btn-pressed'
      );
      this.showWinnersViewButton.node.classList.remove(
        'pointer-events-none',
        'btn-pressed'
      );
    }
  }
}

export default ScreenToggler;

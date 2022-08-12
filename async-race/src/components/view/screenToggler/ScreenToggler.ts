import Control from '../../helpers/Control';
import GameScreen from '../gameScreen/GameScreen';
import WinnersScreen from '../winnerScreen/WinnersScreen';

class ScreenToggler extends Control {
  private showGameViewButton: Control<HTMLElement>;
  private showWinnersViewButton: Control<HTMLElement>;
  private winnersScreen: WinnersScreen;
  private gameScreen: GameScreen;
  private gameState: HTMLElement;
  private winnerState: HTMLElement;
  private appViewNode: HTMLElement;

  constructor(
    parentNode: HTMLElement,
    tag: string,
    className: string,
    content: string,
    gameScreen: GameScreen,
    winnersScreen: WinnersScreen,
    appView: HTMLElement
  ) {
    super(parentNode, tag, className, content);
    this.appViewNode = appView;
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
      this.gameState = this.gameScreen.node;
      this.winnerState = this.winnersScreen.node;
      this.appViewNode.innerHTML = '';
      this.appViewNode.append(this.gameState);
      sessionStorage.setItem('screen', 'game');
    };
    this.showWinnersViewButton.node.onclick = () => {
      this.gameState = this.gameScreen.node;
      this.winnerState = this.winnersScreen.node;
      this.appViewNode.innerHTML = '';
      this.appViewNode.append(this.winnerState);
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

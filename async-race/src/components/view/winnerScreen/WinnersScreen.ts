import ScreenRouter from '../ViewRouter';

class WinnersScreen extends ScreenRouter {
  state: string;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);

    this.state = '';
  }
}

export default WinnersScreen;

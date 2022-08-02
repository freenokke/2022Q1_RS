import Control from '../Control';

class ScreenRouter extends Control {
  public showScreen(): void {
    this.node.classList.remove('hidden');
  }

  public hideScreen(): void {
    this.node.classList.add('hidden');
  }
}

export default ScreenRouter;

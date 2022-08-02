import Control from '../Control';

class ScreenRouter extends Control {
  showScreen() {
    this.node.classList.remove('hidden');
  }

  hideScreen() {
    this.node.classList.add('hidden');
  }
}

export default ScreenRouter;

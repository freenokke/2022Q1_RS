import Control from '../Control';
import AppController from '../controller/AppController';
class AppView extends Control {
  controller: AppController;
  constructor(
    parentNode: HTMLElement,
    tag: string,
    className: string,
    content: string,
    controller: AppController
  ) {
    super(parentNode, tag, className, content);
    this.controller = controller;
  }
}

export default AppView;

import ICar from '../types/ICar';
import Control from './Control';
import AppController from './controller/AppController';
import AppModel from './model/AppModel';
import AppView from './view/AppView';

class Application extends Control {
  controller: AppController;
  view: AppView;
  model: AppModel;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.model = new AppModel();
    this.controller = new AppController();
    this.view = new AppView(
      this.node,
      'div',
      'view relative',
      '',
      this.controller
    );
  }

  public async init(): Promise<void> {
    this.checkActiveScreen();
    const cars = await this.model.getCars();
    this.renderCarsInGarage(cars);
  }

  private async renderCarsInGarage(cars: Array<ICar>): Promise<void> {
    this.view.gameScreen.garage.render(cars);
  }
}

export default Application;

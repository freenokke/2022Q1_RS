import ICar from '../types/ICar';
import Control from './helpers/Control';
import AppController from './controller/AppController';
import AppModel from './model/AppModel';
import AppView from './view/AppView';
import IWinner from '../types/IWinner';

class Application extends Control {
  private controller: AppController;
  private view: AppView;
  private model: AppModel;
  private startPage: number;

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
    this.sessionPreset();
    const cars = await this.model.getCars(this.startPage);
    this.renderCarsInGarage(cars);
    const winners = await this.model.getWinners();
    this.renderWinners(winners);
  }

  private checkActiveScreen(): void {
    if (sessionStorage.getItem('screen') === 'winners') {
      this.view.winnerScreen.showScreen();
      return;
    }
    if (sessionStorage.getItem('screen') === 'game') {
      this.view.gameScreen.showScreen();
      return;
    }
    this.view.gameScreen.showScreen();
  }

  private async renderCarsInGarage(cars: Array<ICar>): Promise<void> {
    this.view.gameScreen.garage.render(cars);
  }

  private async renderWinners(winners: Array<IWinner>): Promise<void> {
    // удаляет победителя, который изначально присутствует в API
    if (winners[0] && !('color' in winners[0])) {
      await this.model.deleteWinner(winners[0].id);
    }
    const updatedWinners = await this.model.getWinners(this.startPage);
    this.view.winnerScreen.table.render(updatedWinners);
  }

  private sessionPreset() {
    sessionStorage.removeItem('timeSort');
    sessionStorage.removeItem('timeSortOrder');
    sessionStorage.removeItem('winsSort');
    sessionStorage.removeItem('wins');
    this.startPage = 1;
  }
}

export default Application;

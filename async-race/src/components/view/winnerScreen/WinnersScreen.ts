import AppController from '../../controller/AppController';
import ScreenRouter from '../ViewRouter';
import WinnersTable from './WinnerTable/WinnersTable';

class WinnersScreen extends ScreenRouter {
  public table: WinnersTable;

  constructor(
    parentNode: HTMLElement,
    tagName: string,
    className: string,
    controller: AppController
  ) {
    super(parentNode, tagName, className);

    this.table = new WinnersTable(
      this.node,
      'div',
      'flex flex-col items-center'
    );
    this.table.controller = controller;
  }
}

export default WinnersScreen;

import AppController from '../../controller/AppController';
import Control from '../../helpers/Control';
import WinnersTable from './WinnerTable/WinnersTable';

class WinnersScreen extends Control {
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
      'flex flex-col items-center',
      controller
    );
  }
}

export default WinnersScreen;

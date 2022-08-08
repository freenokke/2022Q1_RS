import IWinner from '../../../../types/IWinner';
import AppController from '../../../controller/AppController';
import Control from '../../../helpers/Control';

class WinnersTable extends Control {
  private limitOnPage: number;
  private allWinners: string;
  private currentPage: string;
  private lastPage: number;
  private displayedWinners: HTMLElement[];
  private prevButton: Control<HTMLElement>;
  private nextButton: Control<HTMLElement>;
  private pagination: Control<HTMLElement>;
  public controller: AppController;
  private timeSortOrder: string;
  private winsSortOrder: string;
  private winsColumn: Control<HTMLElement>;
  private timeColumn: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, tag: string, className: string) {
    super(parentNode, tag, className);
    this.limitOnPage = 10;
  }

  public render(winners: Array<IWinner>): void {
    if (this.node.firstElementChild) {
      this.clear();
    }
    // обновление данных о состоянии победителей
    this.currentPage = sessionStorage.getItem('currentWinnerPage');
    this.allWinners = sessionStorage.getItem('totalWinnersCount');
    this.lastPage = Math.ceil(Number(this.allWinners) / this.limitOnPage);
    let num: number;
    if (Number(this.currentPage) === 1) {
      num = 1;
    } else {
      num = Number(`${+this.currentPage - 1}1`);
    }
    this.showWinnersCount();

    this.displayedWinners = winners.map((winner) => {
      const winnerField = new Control(this.node, 'tr', '');
      winnerField.node.innerHTML = `
      <tr class="p-3">
        <td class="p-3">${num}</td>
        <td class="p-3">
          <svg width="100" height="50" class="relative rotate-[-90] mr-1" fill="${winner.color}">
            <use xlink:href="./assets/images/sprite-car.svg#car"></use>
          </svg>
        </td>
        <td class="p-3">${winner.name}</td>
        <td class="p-3">${winner.wins}</td>
        <td class="p-3">${winner.time}</td>
      </tr>
      `;
      num += 1;
      return winnerField.node;
    });

    if (this.displayedWinners.length !== 0) {
      this.showTable(this.displayedWinners);
      this.drawWinnersPagination();
    }
  }

  private showWinnersCount(): void {
    if (Number(this.allWinners) === 0) {
      const startMessage = new Control(
        this.node,
        'div',
        'mt-10 text-center font-extrabold text-white w-max text-3xl tracking-wider p-2 bg-black bg-opacity-25 rounded-xl'
      );
      startMessage.node.innerHTML = `No winners yet.<br/>
        Play the game with a race mode if you wanna determine them`;
    } else {
      const counter = new Control(
        this.node,
        'div',
        'font-extrabold text-white w-max text-xl tracking-wider p-1 bg-black bg-opacity-25 rounded-xl p-1'
      );
      counter.node.textContent = `Winners(${this.allWinners})`;
    }
  }

  private showTable(winnersToShow: HTMLElement[]): void {
    const table = new Control(
      this.node,
      'table',
      'p-3 mt-5 bg-white rounded-xl bg-opacity-25'
    );
    table.node.innerHTML = `
    <thead class="text-center font-semibold text-lg">
    <tr>
      <th class="p-2">№</th>
      <th class="p-2">Car</th>
      <th class="p-2">Name</th>
    </tr>
  </thead>
  `;
    this.winsColumn = new Control(
      table.node.firstElementChild.firstElementChild as HTMLElement,
      'th',
      'p-2 cursor-pointer hover:bg-orange-200',
      'Wins'
    );
    this.timeColumn = new Control(
      table.node.firstElementChild.firstElementChild as HTMLElement,
      'th',
      'p-2 cursor-pointer hover:bg-orange-200',
      'Best time'
    );
    const tbody = new Control(
      this.node,
      'tbody',
      'text-center text-lg font-medium'
    );
    tbody.node.append(...winnersToShow);
    table.node.append(tbody.node);

    this.createListenersForTable();
  }

  private drawWinnersPagination(): void {
    const container = new Control(
      this.node,
      'div',
      'flex p-3 gap-2 items-center'
    );
    this.prevButton = new Control(
      container.node,
      'button',
      'btn btn-red',
      'Prev'
    );
    this.nextButton = new Control(
      container.node,
      'button',
      'btn btn-blue',
      'Next'
    );

    this.pagination = new Control(
      container.node,
      'span',
      'font-extrabold tracking-wider'
    );
    this.pagination.node.innerHTML = `
      Page: ${this.currentPage} / ${this.lastPage}
      `;
    this.pagination.node.className =
      'font-extrabold text-xl text-white bg-black bg-opacity-25 rounded-xl p-1';
    this.isActive();
    this.prevButtonListener();
    this.nextButtonListener();
  }

  // Проверят какие кнопки пагинации должны быть неактивны
  private isActive(): void {
    if (Number(this.currentPage) === 1) {
      this.prevButton.node.classList.add('btn-pressed', 'pointer-events-none');
    }
    if (Number(this.allWinners) <= 10) {
      this.nextButton.node.classList.add('btn-pressed', 'pointer-events-none');
    }
    if (Number(this.allWinners) > 10) {
      this.nextButton.node.classList.remove(
        'btn-pressed',
        'pointer-events-none'
      );
    }
    if (+this.currentPage === this.lastPage) {
      this.nextButton.node.classList.add('btn-pressed', 'pointer-events-none');
    }
  }

  // Навешивает обработчики кликов на кнопки пагинации
  private prevButtonListener(): void {
    this.prevButton.node.onclick = async () => {
      const prevPage = +this.currentPage - 1;

      let winners: IWinner[];
      if (sessionStorage.getItem('timeSort') !== null) {
        winners = await this.controller.sortWinners(
          prevPage,
          'time',
          sessionStorage.getItem('timeSortOrder')
        );
      } else if (sessionStorage.getItem('winsSort') !== null) {
        winners = await this.controller.sortWinners(
          prevPage,
          'wins',
          sessionStorage.getItem('winsSortOrder')
        );
      } else {
        winners = await this.controller.getWinners(prevPage);
      }
      this.currentPage = prevPage.toString();
      sessionStorage.setItem('currentWinnerPage', this.currentPage);
      this.render(winners);
    };
  }

  private nextButtonListener() {
    this.nextButton.node.onclick = async () => {
      const nextPage = +this.currentPage + 1;

      let winners: IWinner[];
      if (sessionStorage.getItem('timeSort') !== null) {
        winners = await this.controller.sortWinners(
          nextPage,
          'time',
          sessionStorage.getItem('timeSortOrder')
        );
      } else if (sessionStorage.getItem('winsSort') !== null) {
        winners = await this.controller.sortWinners(
          nextPage,
          'wins',
          sessionStorage.getItem('winsSortOrder')
        );
      } else {
        winners = await this.controller.getWinners(nextPage);
      }
      this.currentPage = nextPage.toString();
      sessionStorage.setItem('currentWinnerPage', this.currentPage);
      this.render(winners);
    };
  }

  private createListenersForTable() {
    this.sortingByTime();
    this.sortingByWins();
  }

  private sortingByTime() {
    this.timeColumn.node.onclick = async () => {
      sessionStorage.setItem('timeSort', 'true');
      if (!this.timeSortOrder) {
        this.timeSortOrder = 'asc';
        sessionStorage.setItem('timeSortOrder', this.timeSortOrder);
        const winners = await this.controller.sortWinners(
          +sessionStorage.getItem('currentWinnerPage'),
          'time',
          this.timeSortOrder
        );
        this.render(winners);
        this.timeColumn.node.textContent = 'Best time ↑';
        this.timeColumn.node.classList.add('bg-gray-200');
      } else if (this.timeSortOrder === 'asc') {
        this.timeSortOrder = 'desc';
        sessionStorage.setItem('timeSortOrder', this.timeSortOrder);
        const winners = await this.controller.sortWinners(
          +sessionStorage.getItem('currentWinnerPage'),
          'time',
          this.timeSortOrder
        );
        this.render(winners);
        this.timeColumn.node.textContent = 'Best time ↓';
        this.timeColumn.node.classList.add('bg-gray-200');
      } else {
        this.timeSortOrder = null;
        sessionStorage.removeItem('timeSortOrder');
        sessionStorage.removeItem('timeSort');
        const winners = await this.controller.getWinners(
          +sessionStorage.getItem('currentWinnerPage')
        );
        this.render(winners);
        this.timeColumn.node.textContent = 'Best time';
        this.timeColumn.node.classList.remove('bg-gray-200');
      }
    };
  }

  private sortingByWins() {
    this.winsColumn.node.onclick = async () => {
      sessionStorage.setItem('winsSort', 'true');
      if (!this.winsSortOrder) {
        this.winsSortOrder = 'asc';
        sessionStorage.setItem('winsSortOrder', this.winsSortOrder);
        const winners = await this.controller.sortWinners(
          +sessionStorage.getItem('currentWinnerPage'),
          'wins',
          this.winsSortOrder
        );
        this.render(winners);
        this.winsColumn.node.textContent = 'Wins ↑';
        this.winsColumn.node.classList.add('bg-gray-200');
      } else if (this.winsSortOrder === 'asc') {
        this.winsSortOrder = 'desc';
        sessionStorage.setItem('winsSortOrder', this.winsSortOrder);
        const winners = await this.controller.sortWinners(
          +sessionStorage.getItem('currentWinnerPage'),
          'wins',
          this.winsSortOrder
        );
        this.render(winners);
        this.winsColumn.node.textContent = 'Wins ↓';
        this.winsColumn.node.classList.add('bg-gray-200');
      } else {
        this.winsSortOrder = null;
        sessionStorage.removeItem('winsSortOrder');
        sessionStorage.removeItem('winsSort');
        const winners = await this.controller.getWinners(
          +sessionStorage.getItem('currentWinnerPage')
        );
        this.render(winners);
        this.winsColumn.node.textContent = 'Wins';
        this.winsColumn.node.classList.remove('bg-gray-200');
      }
    };
  }
}

export default WinnersTable;

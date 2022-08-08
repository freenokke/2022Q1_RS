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
  controller: AppController;

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
    let num = 1;

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
    }
    this.drawWinnersPagination();
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
      <th class="p-2 cursor-pointer hover:bg-orange-200 bg-opacity-20">Wins ⇅</th>
      <th class="p-2 cursor-pointer hover:bg-orange-200 bg-opacity-20">Best time ⇅</th>
    </tr>
  </thead>
  `;
    const tbody = new Control(
      this.node,
      'tbody',
      'text-center text-lg font-medium'
    );
    tbody.node.append(...winnersToShow);
    table.node.append(tbody.node);
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
    this.createPaginationListeners();
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
  private createPaginationListeners(): void {
    this.nextButton.node.onclick = async () => {
      const nextPage = +this.currentPage + 1;
      const winners = await this.controller.getWinners(nextPage);
      this.currentPage = nextPage.toString();
      sessionStorage.setItem('currentWinnerPage', this.currentPage);
      this.render(winners);
    };
    this.prevButton.node.onclick = async () => {
      const prevPage = +this.currentPage - 1;
      const winners = await this.controller.getWinners(prevPage);
      this.currentPage = prevPage.toString();
      sessionStorage.setItem('currentWinnerPage', this.currentPage);
      this.render(winners);
    };
  }
}

export default WinnersTable;

/* eslint-disable no-console */
import ICar from '../../../../types/ICar';
import Control from '../../../Control';
import AppController from '../../../controller/AppController';
import Track from './track/Track';

class Garage extends Control {
  private controller: AppController;
  private carsInGarage: string;
  private nextButton: Control<HTMLElement>;
  private prevButton: Control<HTMLElement>;
  private pagination: Control<HTMLElement>;
  private limitOnPage: number;
  private currentPage: string;
  private lastPage: number;

  constructor(
    parentNode: HTMLElement,
    tag: string,
    className: string,
    content: string,
    controller: AppController
  ) {
    super(parentNode, tag, className, content);
    this.controller = controller;
    this.limitOnPage = 7;
    this.currentPage = sessionStorage.getItem('currentGamePage');
    this.carsInGarage = sessionStorage.getItem('totalCarsCount');
    this.lastPage = Math.ceil(Number(this.carsInGarage) / this.limitOnPage);
  }

  // Основной метод для отрисовки всего гаража
  public render(cars: Array<ICar>): void {
    if (this.node.firstElementChild) {
      this.clear();
    }
    // обновление данных о состоянии гаража
    this.currentPage = sessionStorage.getItem('currentGamePage');
    this.carsInGarage = sessionStorage.getItem('totalCarsCount');
    this.lastPage = Math.ceil(Number(this.carsInGarage) / this.limitOnPage);

    this.showCarsInGarage();

    cars.map((element) => {
      const track = new Track(
        this.node,
        'div',
        'track',
        element.name,
        element.color,
        element.id,
        this.controller,
        (carsList) => this.render(carsList)
      );
      return track;
    });

    this.drawPagination();
  }

  // Рендерит на страницу общее количемтво машина в гараже
  private showCarsInGarage(): void {
    const counter = new Control(
      this.node,
      'div',
      'font-extrabold tracking-wider p-3'
    );
    counter.node.textContent = `Garage(${this.carsInGarage})`;
  }

  // Рендерит на страницу кнопки пагинации, текущую и общее кол-во страниц
  private drawPagination(): void {
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
    this.isActive();
    this.createPaginationListeners();
  }

  // Проверят какие кнопки пагинации должны быть неактивны
  private isActive(): void {
    if (Number(this.currentPage) === 1) {
      this.prevButton.node.classList.add(
        'bg-gray-300',
        'cursor-default',
        'pointer-events-none'
      );
    }
    if (Number(this.carsInGarage) <= 7) {
      this.nextButton.node.classList.add('bg-gray-300', 'pointer-events-none');
    }
    if (Number(this.carsInGarage) > 7) {
      this.nextButton.node.classList.remove(
        'bg-gray-300',
        'pointer-events-none'
      );
    }
    if (+this.currentPage === this.lastPage) {
      this.nextButton.node.classList.add(
        'bg-gray-300',
        'cursor-default',
        'pointer-events-none'
      );
    }
  }

  // Навешивает обработчики кликов на кнопки пагинации
  private createPaginationListeners(): void {
    this.nextButton.node.onclick = async () => {
      const nextPage = +this.currentPage + 1;
      const res = await this.controller.getCars(nextPage);
      this.currentPage = nextPage.toString();
      sessionStorage.setItem('currentGamePage', this.currentPage);
      this.render(res);
    };
    this.prevButton.node.onclick = async () => {
      const prevPage = +this.currentPage - 1;
      const res = await this.controller.getCars(prevPage);
      this.currentPage = prevPage.toString();
      sessionStorage.setItem('currentGamePage', this.currentPage);
      this.render(res);
    };
  }
}

export default Garage;

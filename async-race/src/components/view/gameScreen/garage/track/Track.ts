import Control from '../../../../Control';
import '../../../../../assets/images/sprite-car.svg';
import AppController from '../../../../controller/AppController';
import ICar from '../../../../../types/ICar';

class Track extends Control {
  private name: string;
  private color: string;
  private selectCarButton: Control<HTMLElement>;
  private removeCarButton: Control<HTMLElement>;
  private controller: AppController;
  private id: number;
  private renderGARAGE: (cars: Array<ICar>) => void;
  constructor(
    parentNode: HTMLElement,
    tag: string,
    className: string,
    name: string,
    color: string,
    id: number,
    controller: AppController,
    renderGarage: (cars: Array<ICar>) => void
  ) {
    super(parentNode, tag, className);
    this.renderGARAGE = renderGarage;
    this.controller = controller;
    this.name = name;
    this.color = color;
    this.id = id;

    this.createButtons();
    this.draw();
    this.addListeners();
  }

  private draw(): void {
    this.node.innerHTML = `
    <div class="handle">
      <span class='name text-center font-extrabold text-orange-600'>${this.name}</span>
    </div>
    <div class="way flex h-[100px] bg-gray-500">
      <div class="self-center startstop">
        <button class="btn p-1 bg-orange-300">A</button>
        <button class="btn p-1 bg-orange-300">B</button>
      </div>
      <div class="distance flex grow items-center justify-start">
        <div>
          <svg width="165" height="80" class="relative z-20 rotate-[-90]" fill="${this.color}">
            <use xlink:href="./assets/images/sprite-car.svg#car"></use>
          </svg>
        </div>
      </div>
      <div class="finish"></div>
    </div>
    `;
    this.node.firstElementChild.insertAdjacentElement(
      'afterbegin',
      this.removeCarButton.node
    );
    this.node.firstElementChild.insertAdjacentElement(
      'afterbegin',
      this.selectCarButton.node
    );
  }

  private createButtons(): void {
    this.selectCarButton = new Control(
      null,
      'button',
      'btn p-1 bg-orange-300',
      'Select'
    );
    this.removeCarButton = new Control(
      null,
      'button',
      'btn p-1 bg-orange-300',
      'Remove'
    );
  }

  private async addListeners(): Promise<void> {
    this.selectCarButton.node.onclick = () => {
      const input = document.querySelector(
        '#updateTextInput'
      ) as HTMLInputElement;
      input.value = this.name;
      input.dataset.id = this.id.toString();
      const colorInput = document.querySelector(
        '#updateColorInput'
      ) as HTMLInputElement;
      colorInput.value = this.color;
    };
    this.removeCarButton.node.onclick = async () => {
      const cars = await this.controller.deleteCar(this.id);
      this.renderGARAGE(cars);
    };
  }
}

export default Track;

import Control from '../../../../helpers/Control';
import '../../../../../assets/images/sprite-car.svg';
import AppController from '../../../../controller/AppController';
import ICar from '../../../../../types/ICar';
import IRaceData from '../../../../../types/IRaceData';

class Track extends Control {
  private name: string;
  private color: string;
  private selectCarButton: Control<HTMLElement>;
  private removeCarButton: Control<HTMLElement>;
  private controller: AppController;
  public id: number;
  private renderGARAGE: (cars: Array<ICar>) => void;
  public startEngineButton: Control<HTMLElement>;
  private stopEngineButton: Control<HTMLElement>;
  public animationFrameId: number;

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
    this.controlCarListeners();
    this.controlEngineListeners();
  }

  private draw(): void {
    this.node.innerHTML = `
    <div class="handle">
      <span class='name text-center font-extrabold text-orange-600'>${this.name}</span>
    </div>
    <div class="way flex h-[100px] bg-gray-500 px-2">
      <div class="self-center flex gap-1 startstop"></div>
      <div class="distance flex grow items-center justify-start">
        <div class="car z-20">
          <svg width="165" height="80" class="relative rotate-[-90]" fill="${this.color}">
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
    this.node.lastElementChild.firstElementChild.append(
      this.startEngineButton.node,
      this.stopEngineButton.node
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
    this.startEngineButton = new Control(
      null,
      'button',
      'btn p-1 bg-orange-300',
      'A'
    );
    this.stopEngineButton = new Control(
      null,
      'button',
      'btn pointer-events-none p-1 bg-gray-300',
      'B'
    );
  }

  // Добавление обработчиков для кнопок выбора и удаления машины
  private async controlCarListeners(): Promise<void> {
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

  // Добавление обработчиков для кнопок управления двигателем
  private async controlEngineListeners(): Promise<void> {
    this.startEngineButton.node.onclick = async () => {
      const data: IRaceData = await this.controller.startEngine(
        this.id,
        'started'
      );
      this.preparingToDrive(data);
    };
  }

  public preparingToDrive(data: IRaceData): void {
    const { velocity, distance } = data;
    const time = distance / velocity;
    this.drive(time);
    this.controller.driveMode(this.id).then((res) => {
      if (res.status === 500) {
        cancelAnimationFrame(this.animationFrameId);
      }
    });
  }

  public drive: (time: number) => void = (time: number) => {
    const distance = this.node.querySelector('.distance') as HTMLElement;
    const car = this.node.querySelector('.car') as HTMLElement;
    let start = 0;
    const from = distance.offsetLeft;
    const to = distance.offsetWidth - car.offsetWidth;
    const frameCount = (time / 1000) * 60;
    const offset = (to - from) / frameCount;
    const tick = () => {
      start += offset;
      car.style.transform = `translateX(${start}px)`;
      if (start < to) {
        this.animationFrameId = requestAnimationFrame(tick);
      }
    };

    tick();
  };
}

export default Track;

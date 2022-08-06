import Control from '../../../../helpers/Control';
import '../../../../../assets/images/sprite-car.svg';
import AppController from '../../../../controller/AppController';
import ICar from '../../../../../types/ICar';
import IRaceData from '../../../../../types/IRaceData';

class Track extends Control {
  static Winner: Track = null;

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
  public result: Control<HTMLElement>;
  private abortRequest: AbortController;

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
    <div class="flex gap-2">
      <span class='name text-center font-semibold text-white p-1 bg-black bg-opacity-25 rounded-xl'>${this.name}</span>
    </div>
    <div class="way flex h-[100px] bg-neutral-500 px-2">
      <div class="self-center"></div>
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
      'btn btn-blue block p-1 mb-2',
      'START'
    );
    this.stopEngineButton = new Control(
      null,
      'button',
      'btn btn-pressed block pointer-events-none p-1',
      'STOP'
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
      const data: IRaceData = await this.controller.startStopEngine(
        this.id,
        'started'
      );
      this.preparingAndDrive(data);
      this.disableStopEngineButton(false);
      this.disableStartEngineButton(true);
    };

    this.stopEngineButton.node.onclick = async () => {
      await this.controller.startStopEngine(this.id, 'stopped');
      this.preventDriving();
      this.disableStopEngineButton(true);
      this.disableStartEngineButton(false);
    };
  }

  public async preparingAndDrive(
    data: IRaceData,
    raceMode: boolean = false
  ): Promise<void> {
    Track.Winner = null;
    this.abortRequest = new AbortController();
    const { velocity, distance } = data;
    const time = distance / velocity;
    const milSecAtSec = 1000;
    const seconds = time / milSecAtSec;
    this.drive(seconds);
    const res = await this.controller.driveMode(
      this.id,
      this.abortRequest.signal
    );
    if (res.status === 500) {
      cancelAnimationFrame(this.animationFrameId);
    } else if (raceMode && Track.Winner === null) {
      Track.Winner = this;
      this.showRaceResult(seconds, true);
    } else {
      this.showRaceResult(seconds);
    }
  }

  public drive: (time: number) => void = (time: number) => {
    const distance = this.node.querySelector('.distance') as HTMLElement;
    const car = this.node.querySelector('.car') as HTMLElement;
    let start = 0;
    const from = distance.offsetLeft;
    const to = distance.offsetWidth - car.offsetWidth;
    const frameCount = time * 60;
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

  private showRaceResult(time: number, isWinner: boolean = false) {
    const dist = this.node.querySelector('.distance') as HTMLElement;
    if (isWinner) {
      this.result = new Control(
        dist,
        'div',
        'race-result flex flex-col justify-between items-center h-[90%] absolute left-[50%] translate-x-[-50%]'
      );
      this.result.node.insertAdjacentHTML(
        'beforeend',
        `<span class='z-50 text-4xl font-extrabold tracking-widest animate-bounce text-white'>WINNER</span>
        <span class='z-50 text-3xl font-semibold tracking-wider text-white'>${time.toFixed(
          3
        )} sec</span>`
      );
    } else {
      this.result = new Control(
        dist,
        'div',
        'race-result flex h-[90%] absolute left-[50%] translate-x-[-50%]'
      );
      this.result.node.insertAdjacentHTML(
        'beforeend',
        `<span class='z-50 text-3xl font-semibold self-end tracking-wider text-white'>${time.toFixed(
          3
        )} sec</span>`
      );
    }
  }

  public async preventDriving() {
    cancelAnimationFrame(this.animationFrameId);
    this.abortRequest.abort();
    const car = this.node.querySelector('.car') as HTMLElement;
    car.style.transform = `translateX(0px)`;
    if (this.result) {
      this.result.destroy();
    }
  }

  public disableStartEngineButton(boolean: boolean): void {
    if (boolean) {
      this.startEngineButton.node.classList.add(
        'pointer-events-none',
        'btn-pressed'
      );
      this.startEngineButton.node.classList.remove('btn-blue');
    } else {
      this.startEngineButton.node.classList.remove(
        'pointer-events-none',
        'btn-pressed'
      );
      this.startEngineButton.node.classList.add('btn-blue');
    }
  }

  public disableStopEngineButton(boolean: boolean): void {
    if (boolean) {
      this.stopEngineButton.node.classList.add(
        'pointer-events-none',
        'btn-pressed'
      );
      this.stopEngineButton.node.classList.remove('btn-red');
    } else {
      this.stopEngineButton.node.classList.remove(
        'pointer-events-none',
        'btn-pressed'
      );
      this.stopEngineButton.node.classList.add('btn-red');
    }
  }
}

export default Track;

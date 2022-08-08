import IRaceData from '../../../../types/IRaceData';
import Control from '../../../helpers/Control';
import AppController from '../../../controller/AppController';
import Garage from '../garage/Garage';

class GameHadler extends Control {
  private controller: AppController;
  private createNameInput: Control<HTMLInputElement>;
  private createColorInput: Control<HTMLInputElement>;
  private createButton: Control<HTMLElement>;
  private updateNameInput: Control<HTMLInputElement>;
  private updateColorInput: Control<HTMLInputElement>;
  private updateButton: Control<HTMLElement>;
  private raceButton: Control<HTMLElement>;
  private resetButton: Control<HTMLElement>;
  private generateCarsButton: Control<HTMLElement>;
  public GARAGE: Garage;
  public disableViewButtons: (boolean: boolean) => void;

  constructor(
    parentNode: HTMLElement,
    tag: string,
    className: string,
    content: string,
    controller: AppController
  ) {
    super(parentNode, tag, className, content);
    this.controller = controller;

    this.render();
  }

  private render(): void {
    this.carCreationField();
    this.carUpdatingFiled();
    this.handleButtons();
  }

  private carUpdatingFiled() {
    const updateCarField = new Control(
      this.node,
      'div',
      'createField flex items-center gap-2 mt-2'
    );

    this.updateNameInput = new Control(
      updateCarField.node,
      'input',
      'textInput p-1 rounded'
    );
    (this.updateNameInput.node as HTMLInputElement).type = 'text';
    this.updateNameInput.node.id = 'updateTextInput';

    this.updateColorInput = new Control(
      updateCarField.node,
      'input',
      'colorInpit rounded'
    );
    (this.updateColorInput.node as HTMLInputElement).type = 'color';
    this.updateColorInput.node.id = 'updateColorInput';

    this.updateButton = new Control(
      updateCarField.node,
      'button',
      'btn btn-orange',
      'UPDATE'
    );

    this.updatingFieldListeners();
  }

  private carCreationField(): void {
    const createCarField = new Control(
      this.node,
      'div',
      'createField flex items-center gap-2 mt-2'
    );

    this.createNameInput = new Control(
      createCarField.node,
      'input',
      'textInput p-1 rounded'
    );
    (this.createNameInput.node as HTMLInputElement).type = 'text';
    (this.createNameInput.node as HTMLInputElement).placeholder =
      ' Some new car';

    this.createColorInput = new Control(
      createCarField.node,
      'input',
      'colorInput rounded'
    );
    (this.createColorInput.node as HTMLInputElement).type = 'color';

    this.createButton = new Control(
      createCarField.node,
      'button',
      'btn btn-orange',
      'CREATE'
    );

    this.creationFieldListeners();
  }

  private handleButtons(): void {
    const handleFields = new Control(
      this.node,
      'div',
      'handleField flex items-center gap-2 mt-2'
    );
    this.raceButton = new Control(
      handleFields.node,
      'button',
      'raceButton btn btn-red',
      'RACE'
    );
    this.resetButton = new Control(
      handleFields.node,
      'button',
      'raceButton btn btn-pressed pointer-events-none',
      'RESET'
    );
    this.generateCarsButton = new Control(
      handleFields.node,
      'button',
      'generateButtone btn btn-red',
      'GENERATE CARS'
    );

    this.raceButtonListener();
    this.generateCarButtonListener();
    this.resetButtonListener();
  }

  private creationFieldListeners(): void {
    this.createButton.node.onclick = async () => {
      const cars = await this.controller.createCar({
        name: this.createNameInput.node.value.trim()
          ? this.createNameInput.node.value.trim()
          : 'Some new car',
        color: this.createColorInput.node.value,
      });
      this.GARAGE.render(cars);
      this.createNameInput.node.value = '';
    };
  }

  private updatingFieldListeners(): void {
    this.updateButton.node.onclick = async () => {
      const cars = await this.controller.updateCar(
        Number(this.updateNameInput.node.dataset.id),
        {
          name: this.updateNameInput.node.value.trim()
            ? this.updateNameInput.node.value.trim()
            : 'Some new car',
          color: this.updateColorInput.node.value,
        }
      );
      this.GARAGE.render(cars);
      this.updateNameInput.node.value = '';
      this.updateColorInput.node.value = '#000000';
    };
  }

  private raceButtonListener(): void {
    this.raceButton.node.onclick = async () => {
      this.disableViewButtons(true);
      this.disableRaceButton(true);
      this.disableGenerateButton(true);
      this.disableCreateAndUpdateButtons(true);
      this.disableResetButton(false);
      this.GARAGE.disablePaginationButtons(true);
      this.GARAGE.displayedCar.forEach((track) => {
        track.disableStartEngineButton(true);
        track.disableStopEngineButton(true);
        track.disableSelectAndRemoveButtons(true);
      });
      // Пробежаться по машинам и сделать запрос на started для получения данных для гонки
      const result: PromiseSettledResult<IRaceData>[] = await Promise.allSettled(
        this.GARAGE.displayedCar.map((item) => {
          return this.controller.startStopEngine(item.id, 'started');
        })
      );
      // Создание и наполнение массива с результатами выполненных промисов
      const raceDatas = result.map((item) => {
        let res: IRaceData;
        if (item.status === 'fulfilled') {
          res = (item as PromiseFulfilledResult<IRaceData>).value;
        }
        return res;
      });
      this.disableViewButtons(false);
      // Заново пробежаться по машинам и запустить анимации в соответствии с полученными данными
      await Promise.allSettled(
        this.GARAGE.displayedCar.map((track, index) => {
          return track.preparingForDrive(raceDatas[index], true);
        })
      );
    };
  }

  private resetButtonListener(): void {
    this.resetButton.node.onclick = async () => {
      this.disableResetButton(true);
      // Ожидание окончания заезда всех машин
      await Promise.allSettled(
        this.GARAGE.displayedCar.map((track) => {
          return this.controller.startStopEngine(track.id, 'stopped');
        })
      );
      // сброс в исходное положение + изменение состояния кнопок
      this.GARAGE.displayedCar.forEach((track) => {
        track.preventDriving();
        track.disableStartEngineButton(false);
        track.disableStopEngineButton(true);
        track.disableSelectAndRemoveButtons(false);
      });
      setTimeout(() => this.disableRaceButton(false), 1000);
      this.disableGenerateButton(false);
      this.disableCreateAndUpdateButtons(false);
      this.GARAGE.disablePaginationButtons(false);
    };
  }

  private generateCarButtonListener(): void {
    this.generateCarsButton.node.onclick = async () => {
      const cars = await this.controller.createPlentyOfCars(100);
      this.GARAGE.render(cars);
    };
  }

  private disableRaceButton(boolean: boolean): void {
    if (boolean) {
      this.raceButton.node.classList.add('pointer-events-none', 'btn-pressed');
      this.raceButton.node.classList.remove('btn-red');
    } else {
      this.raceButton.node.classList.remove(
        'pointer-events-none',
        'btn-pressed'
      );
      this.raceButton.node.classList.add('btn-red');
    }
  }

  private disableGenerateButton(boolean: boolean): void {
    if (boolean) {
      this.generateCarsButton.node.classList.add(
        'pointer-events-none',
        'btn-pressed'
      );
      this.generateCarsButton.node.classList.remove('btn-red');
    } else {
      this.generateCarsButton.node.classList.remove(
        'pointer-events-none',
        'btn-pressed'
      );
      this.generateCarsButton.node.classList.add('btn-red');
    }
  }

  private disableResetButton(boolean: boolean): void {
    if (boolean) {
      this.resetButton.node.classList.add('pointer-events-none', 'btn-pressed');
      this.resetButton.node.classList.remove('btn-red');
    } else {
      this.resetButton.node.classList.remove(
        'pointer-events-none',
        'btn-pressed'
      );
      this.resetButton.node.classList.add('btn-red');
    }
  }

  private disableCreateAndUpdateButtons(boolean: boolean): void {
    if (boolean) {
      this.createButton.node.classList.add(
        'pointer-events-none',
        'btn-pressed'
      );
      this.updateButton.node.classList.add(
        'pointer-events-none',
        'btn-pressed'
      );
      this.createButton.node.classList.remove('btn-orange');
      this.updateButton.node.classList.remove('btn-orange');
    } else {
      this.updateButton.node.classList.remove(
        'pointer-events-none',
        'btn-pressed'
      );
      this.createButton.node.classList.remove(
        'pointer-events-none',
        'btn-pressed'
      );
      this.updateButton.node.classList.add('btn-orange');
      this.createButton.node.classList.add('btn-orange');
    }
  }
}

export default GameHadler;

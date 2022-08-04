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
      'textInput'
    );
    (this.updateNameInput.node as HTMLInputElement).type = 'text';
    this.updateNameInput.node.id = 'updateTextInput';

    this.updateColorInput = new Control(
      updateCarField.node,
      'input',
      'colorInpit'
    );
    (this.updateColorInput.node as HTMLInputElement).type = 'color';
    this.updateColorInput.node.id = 'updateColorInput';

    this.updateButton = new Control(
      updateCarField.node,
      'button',
      'btn p-1 bg-gray-200',
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
      'textInput'
    );
    (this.createNameInput.node as HTMLInputElement).type = 'text';
    (this.createNameInput.node as HTMLInputElement).placeholder =
      ' Some new car';

    this.createColorInput = new Control(
      createCarField.node,
      'input',
      'colorInput'
    );
    (this.createColorInput.node as HTMLInputElement).type = 'color';

    this.createButton = new Control(
      createCarField.node,
      'button',
      'btn p-1 bg-gray-200',
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
      'raceButton btn btn-red',
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
      const race: Promise<IRaceData>[] = [];
      // Пробежаться по машинам и наполненить массив промисами на данные для гонки
      this.GARAGE.displayedCar.forEach((item) => {
        const track = item;
        race.push(this.controller.startEngine(track.id, 'started'));
      });
      // ожидание выполнения всех промисов
      const result: PromiseSettledResult<IRaceData>[] = await Promise.allSettled(
        race
      );
      // Создание и наполнение массива с результатами выполненных промисов
      const raceDatas = result.map((item) => {
        let res: IRaceData;
        if (item.status === 'fulfilled') {
          res = (item as PromiseFulfilledResult<IRaceData>).value;
        }
        return res;
      });
      // Заново пробежаться по машинам и запустить анимации в соответствии с полученными данными
      this.GARAGE.displayedCar.forEach((track, index) => {
        track.preparingToDrive(raceDatas[index]);
      });
    };
  }

  private generateCarButtonListener(): void {
    this.generateCarsButton.node.onclick = async () => {
      const cars = await this.controller.createPlentyOfCars(100);
      this.GARAGE.render(cars);
    };
  }
}

export default GameHadler;

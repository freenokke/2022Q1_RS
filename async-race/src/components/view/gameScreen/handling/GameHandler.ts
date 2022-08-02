import ICar from '../../../../types/ICar';
import Control from '../../../Control';
import AppController from '../../../controller/AppController';

class GameHadler extends Control {
  private controller: AppController;
  public createNameInput: Control<HTMLInputElement>;
  public createColorInput: Control<HTMLInputElement>;
  public createButton: Control<HTMLElement>;
  public updateNameInput: Control<HTMLInputElement>;
  public updateColorInput: Control<HTMLInputElement>;
  public updateButton: Control<HTMLElement>;
  public raceButton: Control<HTMLElement>;
  public resetButton: Control<HTMLElement>;
  public generateCarsButton: Control<HTMLElement>;
  public renderGARAGE: (cars: Array<ICar>) => void;

  constructor(
    parentNode: HTMLElement,
    tag: string,
    className: string,
    content: string,
    controller: AppController,
    renderGarage: (cars: Array<ICar>) => void
  ) {
    super(parentNode, tag, className, content);
    this.controller = controller;
    this.renderGARAGE = renderGarage;

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

  private carCreationField() {
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

  private handleButtons() {
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
  }

  private creationFieldListeners() {
    this.createButton.node.onclick = async () => {
      const cars = await this.controller.createCar({
        name: this.createNameInput.node.value.trim()
          ? this.createNameInput.node.value.trim()
          : 'Some new car',
        color: this.createColorInput.node.value,
      });
      this.renderGARAGE(cars);
      this.createNameInput.node.value = '';
    };
  }

  private updatingFieldListeners() {
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
      this.renderGARAGE(cars);
      this.updateNameInput.node.value = '';
      this.updateColorInput.node.value = '#000000';
    };
  }
}

export default GameHadler;

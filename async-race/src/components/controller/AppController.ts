import ICar from '../../types/ICar';
import IRaceData from '../../types/IRaceData';
import AppModel from '../model/AppModel';

class AppController {
  private model: AppModel;

  constructor() {
    this.model = new AppModel();
  }

  public async getCars(page?: number) {
    const res = await this.model.getCars(page);
    return res;
  }

  public async deleteCar(id: number): Promise<ICar[]> {
    await this.model.deleteCar(id);
    const cars = await this.model.getCars();
    return cars;
  }

  public async createCar(parameters: {
    name: string;
    color: string;
  }): Promise<ICar[]> {
    const cars = await this.model.createCar(parameters);
    return cars;
  }

  public async updateCar(
    id: number,
    parameters: { name: string; color: string }
  ): Promise<ICar[]> {
    const cars = await this.model.updateCar(id, parameters);
    return cars;
  }

  public async startEngine(id: number, status: string): Promise<IRaceData> {
    const data = await this.model.startEngine(id, status);
    return data;
  }

  public async driveMode(id: number) {
    const res = await this.model.driveMode(id);
    return res;
  }
}

export default AppController;

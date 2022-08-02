import AppModel from '../model/AppModel';

class AppController {
  model: AppModel;

  constructor() {
    this.model = new AppModel();
  }

  public async deleteCar(id: number) {
    await this.model.deleteCar(id);
    const cars = await this.model.getCars();
    return cars;
  }

  public async createCar(parameters: { name: string; color: string }) {
    const cars = await this.model.createCar(parameters);
    return cars;
  }

  public async updateCar(
    id: number,
    parameters: { name: string; color: string }
  ) {
    const cars = await this.model.updateCar(id, parameters);
    return cars;
  }
}

export default AppController;

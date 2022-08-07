import ICar from '../../types/ICar';
import IRaceData from '../../types/IRaceData';
import IWinner from '../../types/IWinner';
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

  public async createPlentyOfCars(number: number): Promise<ICar[]> {
    const cars = await this.model.createPlentyOfCars(number);
    return cars;
  }

  public async updateCar(
    id: number,
    parameters: { name: string; color: string }
  ): Promise<ICar[]> {
    const cars = await this.model.updateCar(id, parameters);
    return cars;
  }

  public async startStopEngine(id: number, status: string): Promise<IRaceData> {
    const data = await this.model.startStopEngine(id, status);
    return data;
  }

  public async driveMode(id: number, signal: AbortSignal): Promise<Response> {
    const res = await this.model.driveMode(id, signal);
    return res;
  }

  public async createWinner(parameters: IWinner): Promise<void> {
    await this.model.createWinner(parameters);
  }

  public async getWinners(page?: number): Promise<IWinner[]> {
    const res = await this.model.getWinners(page);
    return res;
  }

  public async getWinner(id: number): Promise<IWinner> {
    const res = await this.model.getWinner(id);
    const winner = await res.json();
    return winner;
  }

  public async isFormerWinner(id: number): Promise<boolean> {
    const winner = await this.model.getWinner(id);
    if (winner.ok) {
      return true;
    }
    return false;
  }

  public async updateWinner(
    id: number,
    parameters: { wins: number; time: number; color: string; name: string }
  ): Promise<void> {
    await this.model.updateWinner(id, parameters);
  }
}

export default AppController;

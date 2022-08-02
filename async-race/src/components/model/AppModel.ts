import { Domain, Path } from '../../enum/endpoint';
import ICar from '../../types/ICar';

class AppModel {
  private domain: Domain;
  private carsInGarage: Array<ICar>;

  constructor() {
    this.domain = Domain.BASE;
  }

  public async getCars(): Promise<ICar[]> {
    const res: Response = await fetch(`${this.domain}/${Path.GARAGE}`);
    const json: ICar[] = await res.json();
    this.carsInGarage = json;
    return this.carsInGarage;
  }

  public async getCar(id: number): Promise<ICar> {
    const res: Response = await fetch(`${this.domain}/${Path.GARAGE}/${id}`);
    const car: ICar = await res.json();
    return car;
  }

  public async deleteCar(id: number): Promise<void> {
    await fetch(`${this.domain}/${Path.GARAGE}/${id}`, {
      method: 'DELETE',
    });
  }

  public async createCar(parameters: {
    name: string;
    color: string;
  }): Promise<ICar[]> {
    await fetch(`${this.domain}/${Path.GARAGE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters),
    });
    const cars = this.getCars();
    return cars;
  }

  public async updateCar(
    id: number,
    parameters: { name: string; color: string }
  ): Promise<ICar[]> {
    await fetch(`${this.domain}/${Path.GARAGE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters),
    });
    const cars = this.getCars();
    return cars;
  }
}

export default AppModel;

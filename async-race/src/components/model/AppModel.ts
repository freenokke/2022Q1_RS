import { Domain, Path } from '../../enum/endpoint';
import ICar from '../../types/ICar';
import IRaceData from '../../types/IRaceData';

class AppModel {
  private domain: Domain;
  private carsInGarage: Array<ICar>;
  private limitOnPage: number;

  constructor() {
    this.domain = Domain.BASE;
    this.limitOnPage = 7;
  }

  public async getCars(page?: number): Promise<ICar[]> {
    let res: Response;
    if (page) {
      res = await fetch(
        `${this.domain}/${Path.GARAGE}/?_limit=${this.limitOnPage}/&_page=${page}`
      );
      sessionStorage.setItem('currentGamePage', page.toString());
    } else {
      res = await fetch(
        `${this.domain}/${Path.GARAGE}/?_limit=${this.limitOnPage}`
      );
    }
    const totalCarsCount = res.headers.get('X-Total-Count');
    sessionStorage.setItem('totalCarsCount', totalCarsCount);
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
    const currentPage = sessionStorage.getItem('currentGamePage');
    const cars = this.getCars(Number(currentPage));
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
    const currentPage = sessionStorage.getItem('currentGamePage');
    const cars = this.getCars(Number(currentPage));
    return cars;
  }

  public async startEngine(id: number, status: string): Promise<IRaceData> {
    const res: Response = await fetch(
      `${this.domain}/${Path.ENGINE}?id=${id}&status=${status}`,
      {
        method: 'PATCH',
      }
    );
    const data: IRaceData = await res.json();
    return data;
  }

  public async driveMode(
    id: number,
    status: string = 'drive'
  ): Promise<Response> {
    const res = await fetch(
      `${this.domain}/${Path.ENGINE}?id=${id}&status=${status}`,
      {
        method: 'PATCH',
      }
    );
    return res;
  }
}

export default AppModel;

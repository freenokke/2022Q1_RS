import { Domain, Path } from '../../enum/endpoint';
import { carBrand, carModel } from '../helpers/randomNames';
import ICar from '../../types/ICar';
import IRaceData from '../../types/IRaceData';
import IWinner from '../../types/IWinner';

class AppModel {
  private domain: Domain;
  private carsInGarage: Array<ICar>;
  private limitCarsOnPage: number;
  private limitWinnersOnPage: number;

  constructor() {
    this.domain = Domain.BASE;
    this.limitCarsOnPage = 7;
    this.limitWinnersOnPage = 10;
  }

  public async getCars(page?: number): Promise<ICar[]> {
    let res: Response;
    if (page) {
      res = await fetch(
        `${this.domain}/${Path.GARAGE}/?_limit=${this.limitCarsOnPage}/&_page=${page}`
      );
      sessionStorage.setItem('currentGamePage', page.toString());
    } else {
      res = await fetch(
        `${this.domain}/${Path.GARAGE}/?_limit=${this.limitCarsOnPage}`
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

  public async createPlentyOfCars(number: number): Promise<ICar[]> {
    const arr: Promise<Response>[] = [];
    let i = 0;
    while (i < number) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const randomBrand = carBrand[Math.floor(Math.random() * carBrand.length)];
      const randomModel = carModel[Math.floor(Math.random() * carModel.length)];
      const parameters: {
        name: string;
        color: string;
      } = {
        name: `${randomBrand} ${randomModel}`,
        color: `#${randomColor}`,
      };

      const res = fetch(`${this.domain}/${Path.GARAGE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
      });
      arr.push(res);
      i += 1;
    }
    await Promise.all(arr);
    const currentPage = sessionStorage.getItem('currentGamePage');
    const cars = await this.getCars(Number(currentPage));
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

  public async startStopEngine(id: number, status: string): Promise<IRaceData> {
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
    abortsignal: AbortSignal,
    status: string = 'drive'
  ): Promise<Response> {
    const res = await fetch(
      `${this.domain}/${Path.ENGINE}?id=${id}&status=${status}`,
      {
        method: 'PATCH',
        signal: abortsignal,
      }
    );
    return res;
  }

  public async createWinner(parameters: IWinner): Promise<void> {
    await fetch(`${this.domain}/${Path.WINNERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters),
    });
  }

  public async getWinners(page?: number): Promise<IWinner[]> {
    let res: Response;
    if (page) {
      res = await fetch(
        `${this.domain}/${Path.WINNERS}/?_limit=${this.limitWinnersOnPage}/&_page=${page}`
      );
      sessionStorage.setItem('currentWinnerPage', page.toString());
    } else {
      res = await fetch(
        `${this.domain}/${Path.WINNERS}/?_limit=${this.limitWinnersOnPage}`
      );
    }
    const totalWinnersCount = res.headers.get('X-Total-Count');
    sessionStorage.setItem('totalWinnersCount', totalWinnersCount);
    const json: IWinner[] = await res.json();
    return json;
  }

  public async getWinner(id: number): Promise<Response> {
    const res = await fetch(`${this.domain}/${Path.WINNERS}/${id}`, {
      method: 'GET',
    });
    return res;
  }

  public async updateWinner(
    id: number,
    parameters: { wins: number; time: number; color: string; name: string }
  ): Promise<IWinner> {
    const res = await fetch(`${this.domain}/${Path.WINNERS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters),
    });
    const updatedWinner = res.json();
    return updatedWinner;
  }

  public async deleteWinner(id: number): Promise<void> {
    await fetch(`${this.domain}/${Path.WINNERS}/${id}`, {
      method: 'DELETE',
    });
  }
}

export default AppModel;

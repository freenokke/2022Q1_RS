import { Domain, Path } from '../../enum/endpoint';
import ICar from '../../types/ICar';

class AppModel {
  private domain: Domain;
  private carsInGarage: Array<ICar>;

  constructor() {
    this.domain = Domain.BASE;
  }

  public async getCars() {
    const res = await fetch(`${this.domain}/${Path.GARAGE}`);
    const json = await res.json();
    this.carsInGarage = json;
    return this.carsInGarage;
  }

}

export default AppModel;

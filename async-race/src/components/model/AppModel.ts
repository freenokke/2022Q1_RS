import { Domain, Path } from '../../enum/endpoint';
import ICar from '../../types/ICar';

class AppModel {
  private domain: Domain;
  private carsInGarage: Array<ICar>;

  constructor() {
    this.domain = Domain.BASE;
  }

}

export default AppModel;

import AppModel from '../model/AppModel';

class AppController {
  model: AppModel;

  constructor() {
    this.model = new AppModel();
  }

}

export default AppController;

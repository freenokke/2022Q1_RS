import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '230d48c5013d4c00bef47cc7a53124e2', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;

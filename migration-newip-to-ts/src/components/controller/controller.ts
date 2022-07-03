import AppLoader from './appLoader';
import { IController, TopHeadlinesEndpointResponse, SourcesEndpointResponse, Callback } from '../../types';

class AppController extends AppLoader implements IController {
    getSources(e: Event, countryName: string, callback: Callback<SourcesEndpointResponse>) {
        const categoryName = (e.target as HTMLElement).textContent as string;
        super.getResp(
            {
                endpoint: 'sources',
                options: {
                    category: categoryName,
                    country: countryName,
                },
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback<TopHeadlinesEndpointResponse>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <HTMLElement>target.parentNode;
        }
    }
}

export default AppController;

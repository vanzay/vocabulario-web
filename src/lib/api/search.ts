import {API} from "$lib/api/api";
import {PUBLIC_API_URL} from "$env/static/public";

class SearchAPI extends API {

    async getBooks(query: string, page: number): Promise<any> {
        return this.getForJSON("/v1/search/books", {query, page});
    }

    async getBooksForAutocomplete(query: string): Promise<any> {
        return this.getForJSON("/v1/search/books-for-autocomplete", {query});
    }
}

export const getSearchAPI = (config = {}): SearchAPI => {
    const api = new SearchAPI(PUBLIC_API_URL);
    api.config = config;
    return api;
}
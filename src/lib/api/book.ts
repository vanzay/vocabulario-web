import {API} from "$lib/api/api";
import {PUBLIC_API_URL} from "$env/static/public";

class BookAPI extends API {

    async getBook(bookId: number): Promise<any> {
        return this.getForJSON("/v1/book/info/" + bookId);
    }

    async getPhrases(bookId: number, inDictionary: boolean, langIso2: string, offset: number): Promise<any> {
        return this.getForJSON("/v1/book/phrases", {bookId, inDictionary, langIso2, offset});
    }
}

export const getBookAPI = (config = {}): BookAPI => {
    const api = new BookAPI(PUBLIC_API_URL);
    api.config = config;
    return api;
}
import {API} from "$lib/api/api";
import {PUBLIC_API_URL} from "$env/static/public";

class ShelfAPI extends API {

    async getBooks(page: number): Promise<any> {
        return this.getForJSON("/v1/shelf/books", {page});
    }

    async uploadBook(title: string, file: File): Promise<any> {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        return this.postForJSON("/v1/shelf/upload", formData);
    }
}

export const getShelfAPI = (config = {}): ShelfAPI => {
    const api = new ShelfAPI(PUBLIC_API_URL);
    api.config = config;
    return api;
}
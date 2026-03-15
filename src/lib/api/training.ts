import {API} from "$lib/api/api";
import {PUBLIC_API_URL} from "$env/static/public";

class TrainingAPI extends API {

    async getPhrases(mode: string, langIso2?: string, bookId?: number): Promise<any> {
        if (bookId) {
            return this.getPhrasesForBook(mode, bookId);
        } else if (langIso2) {
            return this.getPhrasesForLanguage(mode, langIso2);
        }
        return [];
    }

    async getPhrasesForLanguage(mode: string, langIso2: string): Promise<any> {
        return this.getForJSON("/v1/training/phrases", {mode, langIso2});
    }

    async getPhrasesForBook(mode: string, bookId: number): Promise<any> {
        return this.getForJSON("/v1/training/phrases", {mode, bookId});
    }

    async sendAnswer(phraseId: number, answer: string, mode: string, hintsCount: number): Promise<any> {
        return this.postForJSON("/v1/training/handle-answer", {phraseId, answer, mode, hintsCount});
    }
}

export const getTrainingAPI = (config = {}): TrainingAPI => {
    const api = new TrainingAPI(PUBLIC_API_URL);
    api.config = config;
    return api;
}
import {API} from "$lib/api/api";
import {PUBLIC_API_URL} from "$env/static/public";

class DictionaryAPI extends API {

    async getLanguages(): Promise<any> {
        return this.getForJSON("/v1/dictionary/languages");
    }

    async getDictionary(langIso2: string): Promise<any> {
        return this.getForJSON("/v1/dictionary/info", {langIso2});
    }

    async getPhrases(params: any): Promise<any> {
        return this.getForJSON("/v1/dictionary/phrases", params);
    }

    async getPronunciation(phraseId: number): Promise<any> {
        return this.getForJSON("/v1/dictionary/pronunciation", {phraseId});
    }

    async saveTranslation(userPhraseId: number, translation: string): Promise<any> {
        return this.postForJSON("/v1/dictionary/save-translation", {userPhraseId, translation});
    }

    async addPhrases(bookId: number, onStudying: boolean, idList: Array<number>): Promise<any> {
        return this.postForJSON("/v1/dictionary/add-phrases", {bookId, onStudying, idList});
    }

    async updateStudyingStatus(onStudying: boolean, idList: Array<number>): Promise<any> {
        return this.postForJSON("/v1/dictionary/update-studying-status", {onStudying, idList});
    }

    async removePhrases(idList: Array<number>): Promise<any> {
        return this.postForJSON("/v1/dictionary/remove-phrases", {idList});
    }

    async exportPhrases(format: string, idList: Array<number>): Promise<any> {
        return this.downloadFile("/v1/dictionary/export-phrases", {format, idList}, "dictionary.csv");
    }
}

export const getDictionaryAPI = (config = {}): DictionaryAPI => {
    const api = new DictionaryAPI(PUBLIC_API_URL);
    api.config = config;
    return api;
}
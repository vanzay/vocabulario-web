import {API} from "$lib/api/api";
import {PUBLIC_API_URL} from "$env/static/public";

type AuthResult = {
    email: string;
    accessToken: string;
};

export type User = Omit<AuthResult, "accessToken">;

class UserAPI extends API {

    async register(email: string, password: string, langIso2: string): Promise<AuthResult> {
        return this.postForJSON("/v1/user/register", {email, password, langIso2});
    }

    async login(email: string, password: string): Promise<AuthResult> {
        return this.postForJSON("/v1/user/login", {email, password});
    }

    async logout(): Promise<any> {
        return this.postForJSON("/v1/user/logout");
    }

    async sendRestoreEmail(email: string): Promise<any> {
        return this.postForJSON("/v1/user/send-restore-email", {email});
    }

    async changePassword(uid: number, token: string, password: string): Promise<any> {
        return this.postForJSON("/v1/user/change-password", {uid, token, password});
    }
}

export const getUserAPI = (config = {}): UserAPI => {
    const api = new UserAPI(PUBLIC_API_URL);
    api.config = config;
    return api;
}
export class APIError extends Error {
    status: number;
    code?: string;

    constructor(status: number, code?: string) {
        super();
        this.status = status;
        this.code = code;
    }
}

export class API {

    private _config: any = {}

    constructor(private url: string) {
    }

    set config(value: any) {
        this._config = value;
    }

    get fetch() {
        return this._config.fetch || fetch;
    }

    get authHeader() {
        return this._config.accessToken ? {Authorization: "Bearer " + this._config.accessToken} : {};
    }

    async getForJSON(path: string, params?: any): Promise<any> {
        const response = await this.fetch(this.url + path + (params ? "?" + new URLSearchParams(params) : ""), {
            headers: this.authHeader
        });

        if (!response.ok) {
            await this.throwAPIError(response);
        }

        return await response.json();
    }

    async postForJSON(path: string, params?: any, headers = {}): Promise<any> {
        // !!! do not set {"Content-Type": "multipart/form-data"}, FETCH will do it properly itself
        const contentTypeHeader = params instanceof FormData ? {} : {"Content-Type": "application/json"};
        const body = params instanceof FormData ? params : JSON.stringify(params);
        const response = await this.fetch(this.url + path, {
            method: "POST",
            headers: Object.assign(contentTypeHeader, headers, this.authHeader),
            body
        });

        if (!response.ok) {
            await this.throwAPIError(response);
        }

        return await this.readJSONSafely(response);
    }

    private async throwAPIError(response: Response): Promise<void> {
        if (response.status >= 400 && response.status < 500) {
            const data = await this.readJSONSafely(response);
            if (data) {
                throw new APIError(response.status, data.code);
            }
        }
        throw new APIError(response.status);
    }

    private async readJSONSafely(response: Response): Promise<any> {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return null;
    }

    async downloadFile(path: string, params: any, filename: string): Promise<void> {
        const response = await this.fetch(this.url + path, {
            method: "POST",
            headers: Object.assign({"Content-Type": "application/json"}, this.authHeader),
            body: JSON.stringify(params)
        });
        if (!response.ok) {
            await this.throwAPIError(response);
        }
        const data = await response.blob();
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

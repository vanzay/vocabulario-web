import {error} from "@sveltejs/kit";
import {handleServerError} from "$lib/errors";
import {clearAuthData, getAccessToken, serverAuthAndBack} from "$lib/auth";
import {getShelfAPI} from "$lib/api/shelf";

export const load = async ({cookies, url, locals, fetch}) => {
    const accessToken = getAccessToken(cookies);
    const shelfAPI = getShelfAPI({fetch, accessToken});
    try {
        const books = await shelfAPI.getBooks(0);
        return {
            books,
        };
    } catch (e) {
        const [status, message] = handleServerError(e, locals.locale);
        if (status === 401) {
            clearAuthData(cookies);
            serverAuthAndBack(url);
        } else {
            error(status, message);
        }
    }
}

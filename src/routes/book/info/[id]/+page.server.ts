import {error} from "@sveltejs/kit";
import {getBookAPI} from "$lib/api/book";
import {handleServerError} from "$lib/errors";
import {clearAuthData, getAccessToken, serverAuthAndBack} from "$lib/auth";

export const load = async ({cookies, url, params, locals, fetch}) => {
    if (/^\d+$/.test(params.id)) {
        const bookId = parseInt(params.id);
        const accessToken = getAccessToken(cookies);
        const bookAPI = getBookAPI({fetch, accessToken});
        try {
            const {book, summary} = await bookAPI.getBook(bookId);
            return {
                book,
                summary
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
    } else {
        error(404);
    }
}

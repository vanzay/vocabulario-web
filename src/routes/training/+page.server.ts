import {error} from "@sveltejs/kit";
import {handleServerError} from "$lib/errors";
import {clearAuthData, getAccessToken, serverAuthAndBack} from "$lib/auth";
import {getTrainingAPI} from "$lib/api/training";

export const load = async ({url, cookies, locals, fetch}) => {
    const mode = url.searchParams.get("mode");
    const langIso2 = url.searchParams.get("lang");
    const bookId = url.searchParams.get("book");
    if (["writing", "listening"].includes(mode)
        && (langIso2 || (bookId && /^\d+$/.test(bookId)))) {
        const accessToken = getAccessToken(cookies);
        const trainingAPI = getTrainingAPI({accessToken, fetch});
        try {
            const phrases = await trainingAPI.getPhrases(mode, langIso2, bookId);
            return {
                mode,
                langIso2,
                bookId,
                phrases,
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

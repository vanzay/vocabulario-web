import {error, redirect} from "@sveltejs/kit";
import {getDictionaryAPI} from "$lib/api/dictionary";
import {handleServerError} from "$lib/errors";
import {clearAuthData, getAccessToken, serverAuthAndBack} from "$lib/auth";

export const load = async ({cookies, url, locals, fetch}) => {
    const accessToken = getAccessToken(cookies);
    const dictionaryAPI = getDictionaryAPI({fetch, accessToken});
    let languages: Array<string> = []
    try {
        languages = Object.keys(await dictionaryAPI.getLanguages());
    } catch (e) {
        const [status, message] = handleServerError(e, locals.locale);
        if (status === 401) {
            clearAuthData(cookies);
            serverAuthAndBack(url);
        } else {
            error(status, message);
        }
    }

    if (languages.length === 1) {
        redirect(302, "/dictionary/terms?lang=" + languages[0]);
    } else {
        return {
            languages,
        };
    }
}

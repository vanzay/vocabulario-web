import {error} from "@sveltejs/kit";
import {getDictionaryAPI} from "$lib/api/dictionary";
import {handleServerError} from "$lib/errors";
import {clearAuthData, getAccessToken, serverAuthAndBack} from "$lib/auth";

export const load = async ({cookies, url, locals, fetch}) => {
    const lang = url.searchParams.get("lang");
    if (lang) {
        const accessToken = getAccessToken(cookies);
        const dictionaryAPI = getDictionaryAPI({fetch, accessToken});
        try {
            const {dictionary, language} = await dictionaryAPI.getDictionary(lang);
            return {
                dictionary,
                language,
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

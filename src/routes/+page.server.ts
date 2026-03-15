import {error} from "@sveltejs/kit";
import {getSearchAPI} from "$lib/api/search";
import {handleServerError} from "$lib/errors";

export const load = async ({url, locals, fetch}) => {
    const query = url.searchParams.get("q") || "";
    const searchAPI = getSearchAPI({fetch});
    try {
        const books = await searchAPI.getBooks(query, 0);
        return {
            query,
            books,
        };
    } catch (e) {
        const [status, message] = handleServerError(e, locals.locale);
        error(status, message);
    }
}

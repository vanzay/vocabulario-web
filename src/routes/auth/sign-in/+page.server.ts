import {type Actions, fail, redirect} from "@sveltejs/kit";
import {setAuthData} from "$lib/auth";
import {getUserAPI} from "$lib/api/user";
import {handleServerError} from "$lib/errors";
import {getTranslator} from "$lib/i18n";

export const actions = {
    login: async ({cookies, locals, request, fetch}) => {
        const data = await request.formData();
        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();
        const nextLocation = data.get("next")?.toString() || "/shelf";

        if (!email || !password) {
            const t = getTranslator(locals.locale);
            const message = t("no.required.fields");
            return fail(400, {message, nextLocation});
        }

        try {
            const user = await getUserAPI({fetch}).login(email, password);
            setAuthData(cookies, user, user.accessToken);
        } catch (e) {
            const [status, message] = handleServerError(e, locals.locale);
            return fail(status, {message, nextLocation});
        }

        redirect(302, nextLocation);
    },
} satisfies Actions;

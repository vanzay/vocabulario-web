import {type Actions, fail, redirect} from "@sveltejs/kit";
import {getUserAPI} from "$lib/api/user";
import {handleServerError} from "$lib/errors";
import {getTranslator} from "$lib/i18n";

export const load = ({url}) => {
    const uid = url.searchParams.get("uid");
    const token = url.searchParams.get("token");

    return {
        uid,
        token
    };
}

export const actions = {
    "change-password": async ({request, locals, fetch}) => {
        const data = await request.formData();
        const uid = data.get("uid")?.toString();
        const token = data.get("token")?.toString();
        const password = data.get("password")?.toString();

        if (!uid || !token || !password) {
            const t = getTranslator(locals.locale);
            const message = t("no.required.fields");
            return fail(400, {message});
        }

        try {
            await getUserAPI({fetch}).changePassword(parseInt(uid), token, password);
        } catch (e) {
            const [status, message] = handleServerError(e, locals.locale);
            return fail(status, {message});
        }

        redirect(302, "/auth/sign-in");
    },
} satisfies Actions;

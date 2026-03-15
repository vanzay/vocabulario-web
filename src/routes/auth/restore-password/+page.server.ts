import {type Actions, fail} from "@sveltejs/kit";
import {getUserAPI} from "$lib/api/user";
import {handleServerError} from "$lib/errors";
import {getTranslator} from "$lib/i18n";

export const actions = {
    restore: async ({request, locals, fetch}) => {
        const data = await request.formData();
        const email = data.get("email")?.toString();

        if (!email) {
            const t = getTranslator(locals.locale);
            const message = t("no.required.fields");
            return fail(400, {message});
        }

        try {
            await getUserAPI({fetch}).sendRestoreEmail(email);
            return {
                success: true,
                email,
            }
        } catch (e) {
            const [status, message] = handleServerError(e, locals.locale);
            return fail(status, {message});
        }
    },
} satisfies Actions;

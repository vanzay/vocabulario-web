import {APIError} from "$lib/api/api";
import {clientAuthAndBack} from "$lib/auth";
import {getTranslator, t} from "$lib/i18n";
import {addNotification} from "$lib/notification";

const ERRORS_MAP: Record<string, string> = {
    "USER_EXISTS_ALREADY": "register.user.exists.already",
    "USER_NOT_FOUND": "login.wrong.auth.params",
    "INVALID_TOKEN": "outdated.link",
    "INVALID_FILE": "file.cant.be.empty",
    "UNSUPPORTED_FILE_TYPE": "wrong.file.type",
    "UPLOAD_LIMIT_EXCEEDED": "upload.limitation",
    "UNSUPPORTED_LANGUAGE": "unsupported.language",
    "BOOK_NOT_FOUND": "book.not.found",
    "PHRASE_NOT_FOUND": "phrase.not.found",
    "UNEXPECTED_ERROR": "unexpected.error",
}

function handleError(e: unknown): [number, string] {
    if (e instanceof APIError) {
        if (e.status === 401) {
            return [401, ""];
        }
        return [e.status, ERRORS_MAP[e.code || ""] || "unexpected.error"];
    }
    console.error(e);
    return [500, "unexpected.error"];
}

export const handleServerError = (e: unknown, locale?: string): [number, string] => {
    const [status, messageCode] = handleError(e);
    const t = getTranslator(locale);
    return [status, status == 401 ? "" : t(messageCode)];
}

export const handleClientError = async (e: unknown): Promise<void> => {
    const [status, messageCode] = handleError(e);
    if (status === 401) {
        await fetch("/auth/logout");
        await clientAuthAndBack();
    } else {
        addNotification({type: "error", message: t(messageCode)});
    }
}

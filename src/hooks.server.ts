import type {Handle} from "@sveltejs/kit";
import {clearAuthData, getAccessToken, getUser} from "$lib/auth";
import {extractLanguage} from "$lib/i18n";

const PRIVATE_ROUTES = [
    "/shelf",
    "/dictionary",
    "/training",
];

function isPrivateRoute(url: URL) {
    return PRIVATE_ROUTES.some((route) => url.pathname.startsWith(route));
}

function getLocale(request: Request): string | undefined {
    const acceptLanguage = request.headers.get("accept-language")?.split(",")[0];
    return acceptLanguage ? extractLanguage(acceptLanguage) : undefined;
}

export const handle: Handle = async ({event, resolve}) => {
    const {cookies, url, request} = event;

    event.locals.locale = getLocale(request);

    const accessToken = getAccessToken(cookies);
    if (accessToken) {
        event.locals.accessToken = accessToken;
        event.locals.user = getUser(cookies);
        if (url.pathname.startsWith("/auth") && url.pathname !== "/auth/logout") {
            return Response.redirect(new URL("/shelf", url));
        }
    } else {
        if (isPrivateRoute(url)) {
            clearAuthData(event.cookies);
            return Response.redirect(new URL("/auth/sign-in?next=" + encodeURIComponent(url.pathname + url.search), url));
        }
    }

    return resolve(event, {
        filterSerializedResponseHeaders: (name) => name === "content-type"
    });
};

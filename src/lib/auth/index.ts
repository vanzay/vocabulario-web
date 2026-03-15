import {type Cookies, redirect} from "@sveltejs/kit";
import {dev} from "$app/environment";
import {goto} from "$app/navigation";
import type {User} from "$lib/api/user";

const setAccessToken = (cookies: Cookies, accessToken: string, lifetime: number): void => {
    cookies.set("access_token", accessToken, {
        path: "/",
        httpOnly: true,
        secure: !dev,
        sameSite: "strict" as const,
        maxAge: lifetime,
    });
};

const setUser = (cookies: Cookies, user: User, lifetime: number): void => {
    cookies.set("user", JSON.stringify(user), {
        path: "/",
        httpOnly: true,
        maxAge: lifetime,
    });
};

export const getAccessToken = (cookies: Cookies): string | undefined => {
    return cookies.get("access_token");
};

export const getUser = (cookies: Cookies): User | undefined => {
    const user = cookies.get("user");
    return user ? JSON.parse(user) : undefined;
};

export const setAuthData = (cookies: Cookies, user: User, accessToken: string): void => {
    const tokenLifetime = getTokenLifetime(accessToken);
    setAccessToken(cookies, accessToken, tokenLifetime)
    setUser(cookies, user, tokenLifetime);
};

const getTokenLifetime = (accessToken: string): number => {
    const [header, payload, signature] = accessToken.split(".");
    const data = JSON.parse(atob(payload));
    const currentTimestamp = Math.round(Date.now() / 1000);
    return data.exp - currentTimestamp;
}

export const clearAuthData = (cookies: Cookies): void => {
    cookies.delete("access_token", {path: "/"});
    cookies.delete("user", {path: "/"});
};

export const getLinkWithRequiredAuth = (link: string, user?: any): string => {
    return user ? link : "/auth/sign-in?next=" + encodeURIComponent(link);
}

export const clientAuthAndBack = async (): Promise<void> => {
    const currentPage = window.location.pathname + window.location.search;
    await goto("/auth/sign-in?next=" + encodeURIComponent(currentPage), {invalidateAll: true});
}

export const serverAuthAndBack = (url: URL): void => {
    redirect(302, "/auth/sign-in?next=" + encodeURIComponent(url.pathname + url.search));
}

export const checkEmail = (email: string): boolean => {
    return (/.+@.+\..+/i).test(email);
}

export const checkPassword = (password: string): boolean => {
    return password.length >= 5;
}

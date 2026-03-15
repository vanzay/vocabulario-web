import type {RequestHandler} from "./$types";
import {clearAuthData} from "$lib/auth";
import {getUserAPI} from "$lib/api/user";

export const GET: RequestHandler = async ({cookies, fetch}) => {
    try {
        await getUserAPI({fetch}).logout();
        clearAuthData(cookies);
    } catch (e) {
        console.log(e);
    }
    return new Response();
};
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {User} from "$lib/api/user.ts";

declare global {
    namespace App {
        // interface Error {}

        interface Locals {
            locale?: string;
            user?: User;
            accessToken?: string;
        }

        interface PageData {
            locale?: string;
            user?: User;
            accessToken?: string;
        }

        // interface PageState {}
        // interface Platform {}
    }
}

export {};

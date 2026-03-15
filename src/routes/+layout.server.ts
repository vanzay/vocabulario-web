export const load = ({locals}) => {
    return {
        locale: locals.locale,
        user: locals.user,
        accessToken: locals.accessToken,    // TODO avoid exposing accessToken to the client side
    }
}
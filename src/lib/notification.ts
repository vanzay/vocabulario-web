import {writable} from "svelte/store";

type Notification = {
    id?: number;
    type:
        | "info"
        | "warning"
        | "error"
    message: string
}

export const notifications = writable<Notification[]>([]);

export const addNotification = (notification: Notification): void => {
    notification.id = notification.id || (Date.now() + Math.random());
    notifications.update(value => {
        value.push(notification);
        return value;
    });

    setTimeout(() => {
        removeNotification(notification);
    }, 2500);
}

export const removeNotification = (notification: Notification): void => {
    notifications.update(value => {
        value = value.filter(item => item.id !== notification.id);
        return value;
    });
}

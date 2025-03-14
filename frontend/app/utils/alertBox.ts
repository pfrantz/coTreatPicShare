import type {NotificationInstance} from "antd/es/notification/interface";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const alertBox = (api: NotificationInstance, type:NotificationType, title: string, msg: string) => {
    api[type]({
        message: title,
        description: msg
    });
};

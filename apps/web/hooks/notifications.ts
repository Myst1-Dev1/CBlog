'use client';

import { useNotifications } from "./useNotifications";
import { useUserStore } from "./user/useUserStore";

export function Notifications() {
    const { user } = useUserStore();

    useNotifications(user?.id);

    return null;
}
import { $authHost, $host } from "./index";

export const vkAuth = async () => {
    return await $host.get('api/user/auth/vk')
}
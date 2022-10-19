
import { Api, client, TelegramClient } from 'telegram'
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

declare module "telegram" {
    namespace Api {
        interface User {
            getFormattedName(): string
            getFormattedLastSeen(): string
            getPhoto(client: TelegramClient): any
        }
    }

}

Api.User.prototype.getFormattedName = function () {
    let name = "";
    const user = (this as Api.User)
    user?.firstName && (name += user.firstName);
    user?.lastName && (name += user.lastName);
    return name || "No Name";

}

Api.User.prototype.getFormattedLastSeen = function () {

    const user = (this as Api.User)

    let text = "last seen ";
    const status = user.status;
    if (!status) return text + "Unknown";
    switch (status?.className) {
        case "UserStatusLastMonth":
            return (text += "last month");
        case "UserStatusLastWeek":
            return (text += "last week");
        case "UserStatusOffline":
            return (text += timeAgo.format(new Date(status.wasOnline * 1000)));
        case "UserStatusOnline":
            return "online";
        case "UserStatusRecently":
            return (text += "recently");
        default:
            return text += "Unknown";

    }


}



Api.User.prototype.getPhoto = async function (client) {
    return new Promise(async (res, rej) => {
        try {
            const user = (this as Api.User)
            if (user.photo.className === "UserProfilePhotoEmpty") return ""
            const buff = await client.downloadProfilePhoto(user.id);
            res("data:image/gif;base64," + Buffer.from(buff).toString("base64"));
        } catch (error) {
            rej(error)
        }
    })
}

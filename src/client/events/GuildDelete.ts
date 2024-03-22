import { Events } from "../../gateway/Events";
import { Client } from "../Client";

export default function (client: Client, data: any) {
    client.guilds.cache.delete(data.id);

    client.emit(Events.GuildDelete, data);
}
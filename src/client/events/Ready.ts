import { Events } from "../../gateway/Events";
import { Client } from "../Client";

export default function (client: Client, data: any) {
    client.emit(Events.ClientReady, data)
}
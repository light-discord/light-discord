import { Events } from "../../gateway/Events";
import { Client } from "../Client";

export default function (client: Client, data) {
    client.emit(Events.ClientReady, data)
}
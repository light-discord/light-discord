import { Events } from "../../gateway/Events";
export default function (client, data) {
    client.emit(Events.ClientReady, data);
}
//# sourceMappingURL=Ready.js.map
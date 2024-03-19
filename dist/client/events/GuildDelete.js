"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("../../gateway/Events");
function default_1(client, data) {
    client.guilds.cache.delete(data.id);
    client.emit(Events_1.Events.GuildDelete, data);
}
exports.default = default_1;
//# sourceMappingURL=GuildDelete.js.map
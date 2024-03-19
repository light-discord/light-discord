"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("../../gateway/Events");
function default_1(client, data) {
    client.emit(Events_1.Events.ClientReady, data);
}
exports.default = default_1;
//# sourceMappingURL=Ready.js.map
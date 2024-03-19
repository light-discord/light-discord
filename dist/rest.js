"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGatewayBot = void 0;
const node_fetch_1 = require("node-fetch");
function getGatewayBot(token) {
    return (0, node_fetch_1.default)('https://discord.com/api/v9/gateway/bot', {
        headers: {
            Authorization: `Bot ${token}`
        },
    }).then(async (res) => await res.json());
}
exports.getGatewayBot = getGatewayBot;
//# sourceMappingURL=rest.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const ws_1 = require("ws");
const events_1 = require("events");
const EventsManager_1 = require("./events/EventsManager");
const rest_1 = require("../rest");
class Client extends events_1.EventEmitter {
    options;
    ws;
    eventsManager = new EventsManager_1.EventsManager(this);
    guilds = {
        cache: new Map()
    }; // TODO: Type this motherchunker
    constructor(options) {
        super();
        this.options = options;
    }
    async login(token) {
        return new Promise(async (resolve, reject) => {
            console.log(await (0, rest_1.getGatewayBot)(token));
            this.ws = new ws_1.WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
            this.ws.on("message", (d) => {
                const data = JSON.parse(d.toString());
                switch (data.op) {
                    case 0: // Dispatch
                        const event = this.eventsManager.events[data.t];
                        if (event)
                            event(this, data.d);
                        break;
                    case 10: // Hello
                        // Identify
                        this.ws.send(JSON.stringify({
                            op: 2,
                            d: {
                                token,
                                intents: this.options.intents.reduce((acc, cur) => acc | cur, 0),
                                properties: {
                                    $os: process.platform,
                                    $browser: "light-discord",
                                    $device: "light-discord"
                                }
                            }
                        }));
                        // Heartbeat
                        setInterval(() => {
                            this.ws.send(JSON.stringify({
                                op: 1,
                                d: null
                            }));
                        }, data.d.heartbeat_interval);
                        resolve();
                        break;
                }
            });
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map
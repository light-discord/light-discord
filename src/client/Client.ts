import { WebSocket } from 'ws';
import { EventEmitter } from 'events';
import { EventsManager } from './events/EventsManager';
import { ClientOptions } from './ClientOptions';
import { getGatewayBot } from '../rest';

export class Client extends EventEmitter {
    options: ClientOptions;
    ws: WebSocket;
    eventsManager = new EventsManager(this);

    constructor (options?: ClientOptions) {
        super();

        this.options = options;
    }

    async login(token: string) {
        return new Promise<void>(async (resolve, reject) => {
            console.log(
                await getGatewayBot(token)
            )

            this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

            this.ws.on("message", (d) => {
                const data = JSON.parse(d.toString());

                switch (data.op) {
                    case 0: // Dispatch
                        const event = this.eventsManager.events[data.t];
                        if (event) event(this, data.d);

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
                        }))

                        // Heartbeat
                        setInterval(() => {
                            this.ws.send(JSON.stringify({
                                op: 1,
                                d: null
                            }))
                        }, data.d.heartbeat_interval);

                        resolve();

                        break;
                }
            })
        });
    }
}
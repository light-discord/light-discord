import { WebSocket } from 'ws';
import { EventEmitter } from 'events';
import { EventManager } from './events/EventManager';
import { ClientOptions } from './ClientOptions';
import { ShardClientUtil } from '../sharding/ShardClientUtil';

/**
 * The starting point for a bot
 * @class
 */
export class Client extends EventEmitter {
    /**
     * The client's gateway options
     */
    options: ClientOptions;
    /**
     * The websocket to the Discord gateway
     */
    ws?: WebSocket;
    /**
     * The bot's {@link EventManager}
     */
    eventManager = new EventManager(this);
    
    /**
     * Guild-related data.
     * @property {Map<string, any>} cache - A Map containing cached guild data.
     * @todo Replace `any` by a `Guild` type
     */
    guilds: {
        cache: Map<string, any>
    } = {
        cache: new Map()
    }

    /**
     * Data related to sharding, if applicable.
     */
    data?: {
        SHARDING_MANAGER: boolean,
        SHARDS: number,
        SHARD_COUNT: number,
        DISCORD_TOKEN: string
    }
    /**
     * Utility for managing shards.
     * @type {ShardClientUtil | undefined}
     */
    shard?: ShardClientUtil;

    /**
     * 
     * @constructor
     * @param options The client's gateway options
     */

    constructor(options?: ClientOptions) {
        super();

        this.options = options || {
            intents: []
        };

        (async () => {
            this.data = (await import('worker_threads')).workerData;
            if (!this.data) return;

            this.shard = this.data.SHARDING_MANAGER ? ShardClientUtil.singleton(this) : undefined;
        })()
    }

    /**
     * 
     * @param token Token of the bot to log in with
     * @returns A Promise that resolves when the login process completes successfully.
     * @example client.login('your token goes here');
     */

    async login(token: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

            this.ws.on("message", (d) => {
                const data = JSON.parse(d.toString());

                switch (data.op) {
                    case 0: // Dispatch
                        const event = this.eventManager.events[data.t];
                        if (event) event(this, data.d);

                        break;
                    case 10: // Hello
                        // Send identify packet
                        this.ws?.send(JSON.stringify({
                            op: 2,
                            d: {
                                token,
                                intents: this.options.intents.reduce((acc, cur) => acc | cur, 0),
                                properties: {
                                    $os: process.platform,
                                    $browser: "light-discord",
                                    $device: "light-discord"
                                },
                                shard: this.data && this.data.SHARDING_MANAGER ? [this.data.SHARDS, this.data.SHARD_COUNT] : undefined
                            }
                        }))

                        // Send heartbeats to the gateway
                        setInterval(() => {
                            this.ws?.send(JSON.stringify({
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
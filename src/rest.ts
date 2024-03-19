import fetch from 'node-fetch';

export function getGatewayBot(token: string) {
    return fetch('https://discord.com/api/v9/gateway/bot', {
        headers: {
            Authorization: `Bot ${token}`
        },
    }).then(async res => await res.json());
}
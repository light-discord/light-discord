import axios from 'axios';

export function getGatewayBot(token: string) {
    return axios.get('https://discord.com/api/v9/gateway/bot', {
        headers: {
            Authorization: `Bot ${token}`,
            "Accept-Encoding": "gzip, deflate",
        },
    }).then(async res => await res.data);
}
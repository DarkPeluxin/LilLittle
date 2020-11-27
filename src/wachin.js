const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
    console.log(`Yastamos ridi con el ${client.user.tag}`);
    console.log(client.user.presence.status);

    client.user.setPresence( {
        activity: {
            name: `v. 1.0.7`,
            type: "PLAYING"
        },
        status: "idle"
    });
});

client.login('NzgxMTA1NjE3ODI0OTA3MjY0.X74zSw.xEJV7IXL3LU5715mboC-rUoyUtk');
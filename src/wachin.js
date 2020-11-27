const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

let prefix = config.prefix;

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

client.on('message', async message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    const user = message.mentions.users.first();

    if(command === 'clean'){

        var perms = message.member.hasPermission("KICK_MEMBERS");
        if(!perms) return message.channel.send("Tas bajito loco.");
        let cantidad = parseInt(args[0]);
        message.channel.bulkDelete(cantidad);
    };

    // Receiving the message
    console.log(message.content);
    if (message.content === 'chupa'){
        message.channel.send('gampi');
    }

    // Receiving the message
    console.log(message.content);
    if (message.content === 'Chupa'){
        message.channel.send('gampi');
    }

    if(command === 'ñofi'){
    let user = message.mentions.users.first();
    if (!user) return message.channel.send(`¿Se supone que tengo que adivinar a quién botar? Idiota`)

    let razon = args.slice(1).join(' ');

    var perms = message.member.hasPermission("KICK_MEMBERS");
    if (!perms) return message.channel.send("Tas bajito loco.");
    if (!razon) return message.channel.send('Pero el ¿porqué? pé tarao.');
    if (!message.guild.member(user).kickable) return message.reply('¿Qué intentas hacer Mongol?!');

    message.guild.member(user).kick(razon);
    message.channel.send(`:mouse:     ${user.toString()} está ñofi de **Los Wachines**`)
    const embed = new Discord.MessageEmbed()
     .setDescription(`Razón: _${razon}_`)
     .setColor("RED")
     message.channel.send(embed);
    }

    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;

    if(command === 'redes')

       message.channel.send({embed: {
           color: 3447003,
           title: "Sígueme y entérate de todo.",
           description: "_Aquí puedes encontrarme_.",
           fields: [{
               name: "FACEBOOK",
               value: "https://fg.gg.DarkPeluxin"
           },
           {   
               name: "YOUTUBE",
               value: "https://youtube.com/DarkPeluxin"
           }
        ],
        timestamp: new Date (),
        footer: {
            icon_url: client.user.avatarURL(),
            text: "Trabajando duro como tu viejita."
        }
       }
    });

    
});

client.on("messageDelete", (message) => {
    let canal = client.channels.cache.get('781098623739101197');
    message.channel.send({embed: {
        color: 6184542,
        author: {
            name: (`${message.author.username} (${message.author.id})`),
            icon_url: message.author.avatarURL()
        },
        description: `${message}`,
        timestamp: new Date(),
        footer: {
            text: "Qué chucha borras tarao'"
        }
    }})
});

client.login(config.token);
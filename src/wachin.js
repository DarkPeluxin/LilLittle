const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

let prefix = config.prefix;

client.on('ready', () => {
    console.log(`Yastamos ridi con el ${client.user.tag}`);
    console.log(client.user.presence.status);

    client.user.setPresence( {
        activity: {
            name: `v. 1.3.1b`,
            type: "PLAYING"
        },
        status: "idle"
    })
});

client.on('message', async message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    if(command === 'redes') {
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
        })
        message.delete();
    };

    if(command === 'safa'){

        message.delete();

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No tienes permisos.")
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("No tengo el permiso correcto.")
    
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let razon = args.slice(1).join(" ");

    if(!args[0]) return message.channel.send('Parece que no puedo encontrar a éste usuario.');
    if(!razon) return message.channel.send('Especifica la razón.');

    user.ban({
        reason: razon
    }); 

    message.channel.send(`:warning:   ${user.toString()} se le ha restringido de **Intocables RP**.`)
    const embed = new Discord.MessageEmbed()
    .setDescription(`Razón: _${razon}_`)
    .setColor("#022546")
    message.channel.send(embed);
    };

    if(command === 'ñofi') {

        message.delete();

        let user = message.mentions.users.first();
        if (!user) return message.channel.send(`¿Se supone que tengo que adivinar a quién botar? Idiota.`)
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
        
    };

    if(command == 'clean') {

        var perms = message.member.hasPermission("MANAGE_CHANNELS");
        if(!perms) return message.channel.send("Bajito, no tienes poderes.");
        let cantidad = parseInt(args[0]);
        message.channel.bulkDelete(cantidad);
    };

    if(command === 'shh') {

        message.delete();

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bajito, no tienes poder.')

    let channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
    let user = message.mentions.members.first()
    let razon = args.slice(1).join(" ");
    if(!razon) return message.channel.send('Pero el ¿por qué? pé tarao.');

    channels.forEach(channel => {
        if(channel.name == message.channel.name){
            channel.updateOverwrite( user , {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
        }
    })

    message.channel.send(`:microphone2:   ${message.author} le cerró el poto a ${user.toString()}`)
       const embed = new Discord.MessageEmbed()
       .setDescription(`Razón: _${razon}_`)
       .setColor("BLUE")
       message.channel.send(embed);
       
    };
    
    if(command === "call") {
        
        message.delete();

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bajito, no tienes poder.')

        let channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        let user = message.mentions.members.first()
    
        channels.forEach(channel => {
            if(channel.name == message.channel.name){
                channel.updateOverwrite( user , {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                })
            }
        })

        message.channel.send(`:microphone2:  ${message.author} le abrió el ano a ${user.toString()}, ahora puedes hablar.`)
       

    };

    if (message.content === 'Chupa'){
        message.channel.send('gampi');
    }

    if (message.content === 'chupa'){
        message.channel.send('gampi');
    }

    if (message.content === 'CHUPA'){
        message.channel.send('gampi');
    }

    if (message.content === 'Chvp4'){
        message.channel.send('gampi');
    }

    if (message.content === 'chvp4'){
        message.channel.send('gampi');
    }

});

client.on("messageDelete", (message) => {
    let canal = client.channels.cache.get('782138729354493952');
    canal.send({embed: {
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
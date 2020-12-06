const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
var canal_id = "717868775088849036";
var msg_id;

let prefix = config.prefix;

client.on('ready', () => {
    console.log(`Yastamos ridi con el ${client.user.tag}`);
    console.log(client.user.presence.status);

    var canal = client.channels.cache.get(canal_id);
    canal.bulkDelete(20);
    crearMsgTicket(canal);

    client.user.setPresence( {
        activity: {
            name: `v. 1.3.1b`,
            type: "PLAYING"
        },
        status: "idle"
    });
});

function crearMsgTicket(canal){
    canal.send(`**Bienvenido a Los Wachines.**
    
Reacciona para una asistencia personal, recuerda que solo podemos ayudarte
con temas sobre nuestro servidor, no tenemos asistencia para cosas externas al servidor.
    
**NORMAS GENERALES DE COMPORTAMIENTO EN LA WACHINLAND:**

  1. No usar lenguaje ofensivo, calumnias u ofensas hacia los otros usuarios de este servicio.
  2. Mantener una conducta decente, y de respeto mutuo cuando utiliza este servicio.
  3. Prohibido el acoso y publicar nombres reales tanto de miembros del canal como personas externas a él.
  4. No publicar mensajes comerciales (SPAM masivo de otros canales).
  5. No enviar repetida e indiscriminadamente mensajes en el chat (SPAM estúpido)
  6. No pedir servicios como o favores como Regalo de Suscripción, Moderación, o cambios de salas.
  7. Compórtate como persona civilizada en los chat de voz.
  8. No mayúsculas.

**_Recomendaciones al usuario antes de acceder el servicio de chat:_**
> Evite dar información personal a las personas que ha conocido personalmente en el chat.
> Sea consciente de que puede ser objeto de mensajes indeseados por parte de otros usuarios en el chat. Se sugiere ignorarlos y notificar este tipo de irregularidades.
> Recuerda, la gente es cagón como Peluxin jaaaa!`).then(msg => {
        msg_id = msg.id;
        msg.react("🎟");
    });
};

function crearTicket(message, user){

    var canal = message.guild.channels.cache.find(c => c.name == `ticket-${user.id}`);
    if(!canal) {
        message.guild.channels.create(`ticket-${user.id}`,{reason: "ticket", parent: "785019536826040381"}).then(channel => {
            channel.send(`Hola <@${user.id}>, te pedimos que detalles el problema o la ayuda que necesites.

:robot: Por favor, sé educado, detrás de este chat hay una persona de carne y hueso.
:no_entry: Por favor, no taguees a los miembros para que respondan más rápido.
:clock130: Uno o más miembros del Staff intentarán responderte lo antes posible.
:exclamation: Envía toda la información necesaria para completar el ticket.
:bangbang: En el caso de insultar o amenazar, serás expulsado automáticamente.
:hourglass: En el caso de no recibir ningún mensaje, se cerrará automáticamente el ticket.

**Staff Commands**
> /out [@user/role] {[@user/role] [@user/role] [@user/role]}
> /rename [name]
> /add [@user]
> /cerrar`);

            var rol = message.guild.roles.cache.find(r => r.name === "@everyone");
            var mod = message.guild.roles.cache.find(mo => mo.name === "Mod");
            var mannager = message.guild.roles.cache.find(ma => ma.name === "Mannager");
            var cosor = message.guild.roles.cache.find(cos => cos.name === "Coso Ranger");
            var coronita = message.guild.roles.cache.find(co => co.name === "Coronita");

            channel.createOverwrite(user, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
            });

            channel.createOverwrite(rol, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
            });

            channel.createOverwrite(coronita, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
            });

            channel.createOverwrite(mod, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
            });

            channel.createOverwrite(mannager, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
            });

            channel.createOverwrite(cosor, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
            });
        });
    }
};

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

    if(!message.member.hasPermission("BAN_MEMBERS")) return;
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return;
    
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let razon = args.slice(1).join(" ");

    if(!args[0]) return message.channel.send('Parece que no puedo encontrar a éste usuario.');
    if(!razon) return message.channel.send('Especifica la razón.');

    user.ban({
        reason: razon
    }); 

    message.channel.send(`:warning:    ${user.toString()} se le ha restringido de **Los Wachines**.
> Razón: _${razon}_`);
    message.delete();
    };
   
    
    if(command === 'ñofi') {
        let user = message.mentions.users.first();
        if (!user) return message.channel.send(`¿Se supone que tengo que adivinar a quién botar? Idiota.`)
        let razon = args.slice(1).join(' ');

        var perms = message.member.hasPermission("KICK_MEMBERS");
        if (!perms) return;
        if (!razon) return message.channel.send('Pero el ¿porqué? pé tarao.');
        if (!message.guild.member(user).kickable) return message.reply('¿Qué intentas hacer Mongol?!');

        message.guild.member(user).kick(razon);
        message.channel.send(`:mouse:     ${user.toString()} está ñofi de **Los Wachines**
> Razón: _${razon}_`)
        message.delete();
    };

    if(command == 'clean') {

        var perms = message.member.hasPermission("MANAGE_CHANNELS");
        if(!perms) return;
        let cantidad = parseInt(args[0]);
        message.channel.bulkDelete(cantidad);
    };

    if(command === 'shh') {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;

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

    message.channel.send(`:microphone2:    ${message.author} le cerró el poto a ${user.toString()}. 
> Razón: _${razon}_`);
       message.delete();
    };
    
    if(command === "call") {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;

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

        message.channel.send(`:microphone2:    ${message.author} le abrió el ano a ${user.toString()}, ahora puedes hablar.`)
        message.delete();

    };
    
    if(message.content === "/cerrar"){
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        if(message.channel.name.startsWith("ticket-")) message.channel.delete();
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

client.on('messageReactionAdd', async (reaction, user) => {

    if(user.bot) return;
    if(!msg_id) return;

    if(reaction.message.id == msg_id && reaction.emoji.name == "🎟"){
        crearTicket(reaction.message, user);
        reaction.message.react("🎟");
    }
});

client.login(config.token);
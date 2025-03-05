const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code com o WhatsApp!');
});

client.on('ready', () => {
    console.log('O bot está online e funcionando!');
});

// Exibe todas as mensagens recebidas no console
client.on('message', async (msg) => {
    console.log(`Mensagem recebida: ${msg.body}`);

    if (msg.body === '!oi' && msg.from.includes('@g.us')) {
        console.log('Respondendo com !oi');
        try {
            await msg.reply('Oi! Eu sou o bot da Rede Matriz da Diversidade e estou aqui para ajudar!');
        } catch (error) {
            console.error('Erro ao responder com !oi:', error);
        }
    }

    if (msg.body.toLowerCase().includes('ajuda') && msg.from.includes('@g.us')) {
        console.log('Respondendo com !ajuda');
        try {
            await msg.reply('Aqui estão alguns comandos que você pode usar: \n!oi - Para receber uma saudação \n!ajuda - Para saber como o bot pode te ajudar!');
        } catch (error) {
            console.error('Erro ao responder com !ajuda:', error);
        }
    }
});

// Envia mensagem de boas-vindas para novos membros do grupo
client.on('group_join', async (notification) => {
    console.log('Novo membro entrou no grupo!');
    const chatId = notification.chatId;
    const contact = notification.recipientIds[0];

    try {
        const newMember = await client.getContactById(contact);
        await client.sendMessage(chatId, `Bem-vindo(a), @${newMember.number}! 🌈\nPor favor, se apresente ao grupo para que possamos te conhecer melhor!`, {
            mentions: [newMember]
        });
    } catch (error) {
        console.error('Erro ao enviar mensagem de boas-vindas:', error);
    }
});

client.initialize();
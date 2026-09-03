require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { initDatabase, closeDatabase, pool } = require('./utils/database');
const onReady = require('./events/ready');
const onMessage = require('./events/messageCreate');
const onInteraction = require('./events/interactionCreate');

if (!process.env.DISCORD_TOKEN) throw new Error('DISCORD_TOKEN belum diisi.');
if (!process.env.ADMIN_ROLE_ID) console.warn('ADMIN_ROLE_ID belum diisi; !ucp akan ditolak.');

const client = new Client({ intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], partials:[Partials.Channel] });
client.once('ready', () => onReady(client));
client.on('messageCreate', onMessage);
client.on('interactionCreate', onInteraction);

(async()=>{ try { await initDatabase(); await client.login(process.env.DISCORD_TOKEN); } catch(e) { console.error('Startup failed:',e); process.exit(1); } })();

async function shutdown(signal) { console.log(`${signal}: shutting down...`); client.destroy(); await closeDatabase(); process.exit(0); }
process.on('SIGINT',()=>shutdown('SIGINT')); process.on('SIGTERM',()=>shutdown('SIGTERM'));

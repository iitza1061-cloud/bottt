const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')
// =================== WHATSAPP PREMIUM TEXT ===================
function waMsg(title, body, footer = 'LYAN BOT') {
  return `
*${title}*

> ${body
    .trim()
    .split('\n')
    .join('\n> ')}

_${footer}_
`.trim()
}
// =================== CONFIG ===================
function getDBPath(groupId) {
  return `./data/${groupId}.json`
}

function getDB(groupId) {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data')
  const path = getDBPath(groupId)
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}))
  return JSON.parse(fs.readFileSync(path))
}

function saveDB(groupId, data) {
  fs.writeFileSync(getDBPath(groupId), JSON.stringify(data, null, 2))
}


// =================== MENÚS ===================
const MENU_PRINCIPAL = `
🐧❄️ *LYAN BOT* ❄️🐧

» 👋🏻 Bienvenido al *menuprincipal*
Aquí encontrarás los comandos para mantener
un total orden en tus *GRUPOS*

══════════════════════
❄️ MENÚS DISPONIBLES
══════════════════════

*╭┈┈⊰* 🌀 PRINCIPAL 🌀
*┊* 🌟 *.menu*
*┊* 🌟 *.menuadmins*
*┊* 🌟 *.menuventas*
*┊* 🌟 *.menuventas2*
*╰┈┈┈┈┈┈┈┈┈⊰*

══════════════════════
❄️ SISTEMA DE VENTAS
══════════════════════
Todos los productos se configuran con:
❄️ *.setcomando texto*

*╭┈┈⊰* 🌟 VENTAS 🌟
*┊* 🌀 *.disney*
*┊* 🌀 *.actas*
*┊* 🌀 *.seguidores*
*┊* 🌀 *.adicionales*
*┊* 🌀 *.alimentos*
*┊* 🌀 *.autobus*
*┊* 🌀 *.boletos*
*┊* 🌀 *.canva*
*┊* 🌀 *.certificados*
*┊* 🌀 *.citas*
*┊* 🌀 *.codigos*
*┊* 🌀 *.combo*
*┊* 🌀 *.combos2*
*┊* 🌀 *.combos3*
*┊* 🌀 *.combos4*
*┊* 🌀 *.combos5*
*┊* 🌀 *.constancias*
*┊* 🌀 *.diamantes*
*┊* 🌀 *.descuentos*
*┊* 🌀 *.dinamica*
*┊* 🌀 *.facturas*
*┊* 🌀 *.fichareportes*
*┊* 🌀 *.fragmentos*
*┊* 🌀 *.gamepass*
*┊* 🌀 *.hbo*
*┊* 🌀 *.imss*
*┊* 🌀 *.justificantes*
*┊* 🌀 *.linkreportes*
*┊* 🌀 *.linkcodigos*
*┊* 🌀 *.libros*
*┊* 🌀 *.lote*
*┊* 🌀 *.lotes*
*┊* 🌀 *.metodo*
*┊* 🌀 *.metodos*
*┊* 🌀 *.maxeo*
*┊* 🌀 *.numerovirtual*
*┊* 🌀 *.netflix*
*┊* 🌀 *.prime*
*┊* 🌀 *.pasesff*
*┊* 🌀 *.pago*
*┊* 🌀 *.pago2*
*┊* 🌀 *.pago3*
*┊* 🌀 *.pago4*
*┊* 🌀 *.pago5*
*┊* 🌀 *.paquete*
*┊* 🌀 *.paquete2*
*┊* 🌀 *.paquete3*
*┊* 🌀 *.paquete4*
*┊* 🌀 *.paquete5*
*┊* 🌀 *.pedrial*
*┊* 🌀 *.peliculas*
*┊* 🌀 *.promo*
*┊* 🌀 *.procesos*
*┊* 🌀 *.programas*
*┊* 🌀 *.promoday*
*┊* 🌀 *.preciosbot*
*┊* 🌀 *.rebote*
*┊* 🌀 *.recargas*
*┊* 🌀 *.recetas*
*┊* 🌀 *.reembolsos*
*┊* 🌀 *.reglas*
*┊* 🌀 *.reportes*
*┊* 🌀 *.rfc*
*┊* 🌀 *.robux*
*┊* 🌀 *.servicios*
*┊* 🌀 *.seguros*
*┊* 🌀 *.spotify*
*┊* 🌀 *.stock*
*┊* 🌀 *.stock2*
*┊* 🌀 *.stock3*
*┊* 🌀 *.stock4*
*┊* 🌀 *.stock5*
*┊* 🌀 *.stock6*
*┊* 🌀 *.stock7*
*┊* 🌀 *.stock8*
*┊* 🌀 *.stock9*
*┊* 🌀 *.stock10*
*┊* 🌀 *.shein*
*┊* 🌀 *.tanda*
*┊* 🌀 *.tramites*
*┊* 🌀 *.universidad*
*┊* 🌀 *.vigencia*
*┊* 🌀 *.vuelos*
*┊* 🌀 *.vix*
*┊* 🌀 *.universal*
*┊* 🌀 *.youtube*
*┊* 🌀 *.web*
*╰┈┈┈┈┈┈┈┈┈⊰*

🌀🌟🐧 *LYAN BOT* — Ventas automáticas 24/7 🐧🌟🌀
`

const MENU_ADMINS = `
» 👋🏻 *Menu Admins* — LYAN BOT 🌀

*╭┈┈⊰* 🌀 ADMINS 🌀
*┊* 🌀 *.kick*
*┊* 🌀 *.promote*
*┊* 🌀 *.demote*
*┊* 🌀 *.link*
*┊* 🌀 *.todos*
*┊* 🌀 *.notify*
*┊* 🌀 *.grupo abrir*
*┊* 🌀 *.grupo cerrar*
*╰┈┈⊈*
`

const MENU_VENTAS = `
🌀🌟🐧 *LYAN BOT* 🐧🌟🌀

» 👋🏻 Bienvenido al *menuventas*
Aquí podrás ver todos los productos disponibles

*╭┈┈⊰* 🌟 PRODUCTOS 🌟
*┊* 🌀 *.disney*
*┊* 🌀 *.actas*
*┊* 🌀 *.seguidores*
*┊* 🌀 *.adicionales*
*┊* 🌀 *.alimentos*
*┊* 🌀 *.autobus*
*┊* 🌀 *.boletos*
*┊* 🌀 *.canva*
*┊* 🌀 *.certificados*
*┊* 🌀 *.citas*
*┊* 🌀 *.codigos*
*┊* 🌀 *.combo*
*┊* 🌀 *.combos2*
*┊* 🌀 *.combos3*
*┊* 🌀 *.combos4*
*┊* 🌀 *.combos5*
*┊* 🌀 *.constancias*
*┊* 🌀 *.diamantes*
*┊* 🌀 *.descuentos*
*┊* 🌀 *.dinamica*
*┊* 🌀 *.facturas*
*┊* 🌀 *.fichareportes*
*┊* 🌀 *.fragmentos*
*┊* 🌀 *.gamepass*
*┊* 🌀 *.hbo*
*┊* 🌀 *.imss*
*┊* 🌀 *.justificantes*
*┊* 🌀 *.linkreportes*
*┊* 🌀 *.linkcodigos*
*┊* 🌀 *.libros*
*┊* 🌀 *.lote*
*┊* 🌀 *.lotes*
*┊* 🌀 *.metodo*
*┊* 🌀 *.metodos*
*┊* 🌀 *.maxeo*
*┊* 🌀 *.numerovirtual*
*┊* 🌀 *.netflix*
*┊* 🌀 *.prime*
*┊* 🌀 *.pasesff*
*┊* 🌀 *.pago*
*┊* 🌀 *.pago2*
*┊* 🌀 *.pago3*
*┊* 🌀 *.pago4*
*┊* 🌀 *.pago5*
*┊* 🌀 *.paquete*
*┊* 🌀 *.paquete2*
*┊* 🌀 *.paquete3*
*┊* 🌀 *.paquete4*
*┊* 🌀 *.paquete5*
*┊* 🌀 *.pedrial*
*┊* 🌀 *.peliculas*
*┊* 🌀 *.promo*
*┊* 🌀 *.procesos*
*┊* 🌀 *.programas*
*┊* 🌀 *.promoday*
*┊* 🌀 *.preciosbot*
*┊* 🌀 *.rebote*
*┊* 🌀 *.recargas*
*┊* 🌀 *.recetas*
*┊* 🌀 *.reembolsos*
*┊* 🌀 *.reglas*
*┊* 🌀 *.reportes*
*┊* 🌀 *.rfc*
*┊* 🌀 *.robux*
*┊* 🌀 *.servicios*
*┊* 🌀 *.seguros*
*┊* 🌀 *.spotify*
*┊* 🌀 *.stock*
*┊* 🌀 *.stock2*
*┊* 🌀 *.stock3*
*┊* 🌀 *.stock4*
*┊* 🌀 *.stock5*
*┊* 🌀 *.stock6*
*┊* 🌀 *.stock7*
*┊* 🌀 *.stock8*
*┊* 🌀 *.stock9*
*┊* 🌀 *.stock10*
*┊* 🌀 *.shein*
*┊* 🌀 *.tanda*
*┊* 🌀 *.tramites*
*┊* 🌀 *.universidad*
*┊* 🌀 *.vigencia*
*┊* 🌀 *.vuelos*
*┊* 🌀 *.vix*
*┊* 🌀 *.universal*
*┊* 🌀 *.youtube*
*╰┈┈┈┈┈┈┈┈┈⊰*
`

const MENU_VENTAS2 = `
» 👋🏻 *Menu Ventas 2* — LYAN BOT 🌀

*╭┈┈⊰*
*┊* 🌀 *.lotesvix*
*┊* 🌀 *.lotesnetflix*
*┊* 🌀 *.lotesprime*
*┊* 🌀 *.lotesspotify*
*╰┈┈⊈*
`

// =================== BOT ===================
async function iniciarBot () {
  const { state, saveCreds } = await useMultiFileAuthState('auth')

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: 'silent' }),
    browser: ['LYAN BOT', 'Chrome', '1.0.0']
  })

  sock.ev.on('creds.update', saveCreds)
  setInterval(async () => {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data')

  const files = fs.readdirSync('./data')

  for (const file of files) {
    const groupId = file.replace('.json','')
    const db = getDB(groupId)

    if (!db.horario) continue
// ⏰ comparar por timestamp real
if (Date.now() < db.horario.time) continue
  try {
      await sock.groupSettingUpdate(
        groupId,
        db.horario.accion === 'abrir'
          ? 'not_announcement'
          : 'announcement'
      )

      const meta = await sock.groupMetadata(groupId)

      await sock.sendMessage(groupId,{
        text: `
❄️ \`INFORMATIVO AUTOMÁTICO\` ❄️

\`\`\`
EL GRUPO SE HA
${db.horario.accion === 'abrir' ? 'ABIERTO 🔓' : 'CERRADO 🔒'}
AUTOMÁTICAMENTE
ACCION EJECUTADA POR:
LYAN BOT 🌀
${meta.subject}
\`\`\`
`.trim()
      })

      delete db.horario
      saveDB(groupId, db)

    } catch (err) {
      console.log('❌ Error horario:', err)
    }
  }
}, 30 * 1000)
// ===== WELCOME / BYE EVENT =====
sock.ev.on('group-participants.update', async (update) => {
  try {
    const id = update.id
    const action = update.action
    const users = update.participants || []
    const db = getDB(id)
    db.bye_on = db.bye_on ?? false
    const metadata = await sock.groupMetadata(id)

    for (const u of users) {
      const jid = typeof u === 'string' ? u : u.id

      // ===== WELCOME =====
      if (action === 'add' && db.welcome_on) {
        let text

        if (typeof db.welcome === 'string') {
          text = `👋 @${jid.split('@')[0]} ${db.welcome}`
        } else {
         text = `
❄️ \`BIENVENIDO/A\` ❄️

\`\`\`
» @${jid.split('@')[0]}
Ahora formas parte de:

${metadata.subject}

Miembros: ${metadata.participants.length}
\`\`\`

🌀 Disfruta tu estancia
`.trim()
        }

        let foto
        try {
          foto = await sock.profilePictureUrl(jid, 'image')
        } catch {}

       if (foto) {
  await sock.sendMessage(id, {
    image: { url: foto },
    caption: text,
    mentions: [jid]
  })
} else {
  await sock.sendMessage(id, {
    text,
    mentions: [jid]
  })
}
}
      // ===== BYE =====
      if (action === 'remove' && db.bye_on) {
  let byeText

  if (typeof db.bye === 'string') {
    // 🟡 BYE PERSONALIZADO (.setbye)
    byeText = `👋 @${jid.split('@')[0]} ${db.bye}`
  } else {
    // 🟢 BYE POR DEFECTO
    byeText = `
❄️ \`DESPEDIDA\` ❄️

\`\`\`
» @${jid.split('@')[0]}
Salió del grupo

${metadata.subject}
\`\`\`

🌀 Gracias por haber estado aquí
`.trim()
  }

  await sock.sendMessage(id, {
    text: byeText,
    mentions: [jid]
  })
}
    }
  } catch (err) {
    console.log('❌ Error Welcome/Bye:', err)
  }
})

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return

    const from = msg.key.remoteJid
    if (!from.endsWith('@g.us')) return

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ''

const db = getDB(from)
    // 🧠 Valores por defecto del grupo
db.adminOnly = db.adminOnly ?? false
db.antilink = db.antilink ?? false
db.welcome_on = db.welcome_on ?? false
db.muted = db.muted || []
db.bye_on = db.bye_on ?? false

// ===== INFO DEL GRUPO =====
const metadata = await sock.groupMetadata(from)
const participants = metadata.participants
const sender = msg.key.participant || msg.key.remoteJid
// 🔐 DETECTAR ADMIN CORRECTAMENTE (admin + creador)
const isAdmin = participants.some(
  p =>
    p.id === sender &&
    (p.admin === 'admin' || p.admin === 'superadmin')
)

    db.adminOnly = db.adminOnly ?? false
    db.antilink = db.antilink ?? false
    


if (db.adminOnly && !isAdmin && text.startsWith('.')) {
  return
}
// ===== MODO ADMIN =====
// 🚫 ANTI-LINK (no borra admins ni bot)
if (
  db.antilink &&
  !isAdmin &&
  sender !== sock.user.id &&
  /(https?:\/\/|chat\.whatsapp\.com)/i.test(text)
) {
  await sock.sendMessage(from, { delete: msg.key })
  return
}

if (text === '.on modoadmin') {
  if (!isAdmin) return
  db.adminOnly = true
  saveDB(from, db)
  return sock.sendMessage(from,{ text:'🔐 Modo admin ACTIVADO' })
}
// ===== ANTI LINK ON / OFF =====
if (text === '.on antilink') {
  if (!isAdmin) return
  db.antilink = true
  saveDB(from, db)
  return sock.sendMessage(from,{ text:'🔗 AntiLink ACTIVADO' })
}

if (text === '.off antilink') {
  if (!isAdmin) return
  db.antilink = false
  saveDB(from, db)
  return sock.sendMessage(from,{ text:'🔗 AntiLink DESACTIVADO' })
}
if (text === '.off modoadmin') {
  if (!isAdmin) return
  db.adminOnly = false
  saveDB(from, db)
  return sock.sendMessage(from,{ text:'🔓 Modo admin DESACTIVADO' })
}
    // ===== SISTEMA MUTE =====
db.muted = db.muted || []

if (db.muted.includes(sender)) {
  await sock.sendMessage(from, { delete: msg.key })
  return
}
    // ===== COMANDOS MUTE =====
if (text === '.mute') {
  if (!isAdmin) return sock.sendMessage(from,{text:'❌ Solo admins'})
  const user = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!user) return sock.sendMessage(from,{text:'❌ Menciona a alguien'})
  if (!db.muted.includes(user)) db.muted.push(user)
  saveDB(from, db)
  return sock.sendMessage(from,{text:'🔇 Usuario muteado'})
}

if (text === '.unmute') {
  if (!isAdmin) return sock.sendMessage(from,{text:'❌ Solo admins'})
  const user = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!user) return sock.sendMessage(from,{text:'❌ Menciona a alguien'})
  db.muted = db.muted.filter(u => u !== user)
  saveDB(from, db)
  return sock.sendMessage(from,{text:'🔊 Usuario desmuteado'})
}
    
// ===== WELCOME ON / OFF =====
if (text === '.on welcome') {
  if (!isAdmin) return sock.sendMessage(from, { text: '🌀 Solo admins 🐧' })
  db.welcome_on = true
saveDB(from, db)
return sock.sendMessage(from,{
  text: `
❄️ \`\`\`CONFIGURACIÓN\`\`\` ❄️

Sistema *Welcome* ACTIVADO

🌀 ${metadata.subject}
`.trim()
})
}

if (text === '.off welcome') {
  if (!isAdmin) return sock.sendMessage(from, { text: '🌀 Solo admins 🐧' })
  db.welcome_on = false
saveDB(from, db)
return sock.sendMessage(from,{
  text: `
❄️ \`\`\`CONFIGURACIÓN\`\`\` ❄️

Sistema *Welcome* DESACTIVADO

🌀 ${metadata.subject}
`.trim()
})
}
    // ===== BYE ON / OFF =====
if (text === '.on bye') {
  if (!isAdmin) return sock.sendMessage(from, { text: '🌀 Solo admins 🐧' })
  db.bye_on = true
  saveDB(from, db)
  return sock.sendMessage(from, { text: '👋 Bye ACTIVADO' })
}

if (text === '.off bye') {
  if (!isAdmin) return sock.sendMessage(from, { text: '🌀 Solo admins 🐧' })
  db.bye_on = false
  saveDB(from, db)
  return sock.sendMessage(from, { text: '👋 Bye DESACTIVADO' })
}
    // ===== SET WELCOME =====
if (text.startsWith('.setwelcome ')) {
  if (!isAdmin) return
const value = text.replace('.setwelcome','').trim()
if (!value) return sock.sendMessage(from,{ text:'❌ Escribe un mensaje válido' })
db.welcome = value
    saveDB(from, db)
return sock.sendMessage(from, {
  text: `
❄️ \`\`\`SOLICITUD ACEPTADA\`\`\` ❄️

*.setwelcome* actualizado correctamente

🌀 ${metadata.subject}
`.trim()
})
}
    // ===== SET BYE =====
if (text.startsWith('.setbye ')) {
  if (!isAdmin) return
  db.bye = text.replace('.setbye','').trim()
  saveDB(from, db)
return sock.sendMessage(from, {
  text: `
❄️ \`\`\`SOLICITUD ACEPTADA\`\`\` ❄️

*.setbye* actualizado correctamente

🌀 ${metadata.subject}
`.trim()
})
}
    
    if (text === '.menu') {
  return sock.sendMessage(from, {
    image: fs.readFileSync('./media/menu.jpg'),
    caption: MENU_PRINCIPAL
  })
}


    if (text === '.menuadmins') {
  return sock.sendMessage(from, {
    image: fs.readFileSync('./media/menu.jpg'),
    caption: MENU_ADMINS
  })
}


    if (text === '.menuventas') {
      return sock.sendMessage(from, { text: MENU_VENTAS })
    }

    if (text === '.menuventas2') {
      return sock.sendMessage(from, { text: MENU_VENTAS2 })
    }
    if (text === '.menufreefire') {
  return sock.sendMessage(from,{
    text:'🔥 MENÚ FREE FIRE\n\n• Diamantes\n• Pases\n• Recargas'
  })
}

if (text === '.menustickers') {
  return sock.sendMessage(from,{
    text:'🧷 MENÚ STICKERS\n\n• Stickers personalizados\n• Packs\n• Logos'
  })
}
    // ===== LINK DEL GRUPO =====
if (text === '.link' || text === '.damelink') {
  if (!isAdmin) {
    return sock.sendMessage(from,{ text:'❌ Solo admins' })
  }
  const code = await sock.groupInviteCode(from)
  return sock.sendMessage(from,{
    text:`🔗 Link del grupo:\nhttps://chat.whatsapp.com/${code}`
  })
}
    if (text === '.grupo cerrar') {
  if (!isAdmin) {
    return sock.sendMessage(from, {
      text: '❌ Solo administradores pueden usar este comando'
    })
  }

  await sock.groupSettingUpdate(from, 'announcement')
      delete db.horario
saveDB(from, db)
  return sock.sendMessage(from, {
  text: `
❄️ \`INFORMATIVO\` ❄️

\`\`\`
» @${sender.split('@')[0]}
HA CERRADO 🔒 EL GRUPO

${metadata.subject}
\`\`\`
  `.trim(),
  mentions: [sender]
})

}
if (text === '.grupo abrir') {
  if (!isAdmin) {
    return sock.sendMessage(from, {
      text: '❌ Solo administradores pueden usar este comando'
    })
  }

  await sock.groupSettingUpdate(from, 'not_announcement')
  delete db.horario
saveDB(from, db)
  return sock.sendMessage(from, {
  text: `
❄️ \`INFORMATIVO\` ❄️

\`\`\`
» @${sender.split('@')[0]}
HA ABIERTO 🔓 EL GRUPO

${metadata.subject}
\`\`\`
  `.trim(),
  mentions: [sender]
})

}
// ===== GRUPO CON HORARIO =====
// ===== HORARIOS ABRIR / CERRAR =====
if (text.startsWith('.abrir ') || text.startsWith('.cerrar ')) {
  if (!isAdmin) {
    await sock.sendMessage(from, { text: '🌀🐧 Solo admins pueden usar horarios' })
    return
  }

  const accion = text.startsWith('.abrir') ? 'abrir' : 'cerrar'
const horaTexto = text.split(' ').slice(1).join('').trim()

  const match = horaTexto.match(/^(\d{1,2})(:(\d{2}))?\s*(am|pm)?$/i)
  if (!match) {
    await sock.sendMessage(from, {
      text: '❌ Formato inválido\nEj:\n.abrir 11am\n.cerrar 3:33pm\n.abrir 22:10'
    })
    return
  }

  let hora = parseInt(match[1])
  let minutos = match[3] ? parseInt(match[3]) : 0
  const ampm = match[4]

  if (ampm) {
    if (ampm.toLowerCase() === 'pm' && hora < 12) hora += 12
    if (ampm.toLowerCase() === 'am' && hora === 12) hora = 0
  }
// ⏰ Hora real de México (estable)
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Mexico_City',
  hour12: false,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

const parts = Object.fromEntries(
  formatter.formatToParts(new Date()).map(p => [p.type, p.value])
)

const ahora = new Date(
  `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`
)

const objetivo = new Date(ahora)
objetivo.setHours(hora, minutos, 0, 0)

if (objetivo <= ahora) {
  objetivo.setDate(objetivo.getDate() + 1)
}

  await sock.sendMessage(from, {
text: `
❄️ \`HORARIO CONFIGURADO\` ❄️

\`\`\`
El grupo se ${accion}rá
a las ${horaTexto}

Zona horaria:
Ciudad de México 🇲🇽
\`\`\`

🌀 ${metadata.subject}
`.trim()  })

db.horario = {
  accion,
  time: objetivo.getTime()
}
saveDB(from, db)

  return
}
    // ===== PROMOTE =====
if (text === '.promote') {
  if (!isAdmin) return
  const user = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!user) {
    return sock.sendMessage(from,{ text:'❌ Menciona a alguien' })
  }
  await sock.groupParticipantsUpdate(from,[user],'promote')
  return sock.sendMessage(from,{ text:'🌀 Usuario promovido a admin' })
}

// ===== DEMOTE =====
if (text === '.demote') {
  if (!isAdmin) return
  const user = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!user) {
    return sock.sendMessage(from,{ text:'❌ Menciona a alguien' })
  }
  await sock.groupParticipantsUpdate(from,[user],'demote')
  return sock.sendMessage(from,{ text:'🌀 Admin removido' })
}

    
if (text.startsWith('.kick')) {
  if (!isAdmin) return sock.sendMessage(from,{ text:'❌ Solo admins' })

  const user = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!user) {
    return sock.sendMessage(from,{
      text:'❌ Menciona a alguien\nEj: .kick @user'
    })
  }

  await sock.groupParticipantsUpdate(from,[user],'remove')
  return sock.sendMessage(from,{ text:'🌀🐧 Usuario expulsado correctamente' })
}


    if (text === '.ping') {
  return sock.sendMessage(from, {
    text: waMsg(
      '❄️ ESTADO ❄️',
      'LYAN BOT activo y funcionando correctamente',
      metadata.subject
    )
  })
}
// ===== NOTIFICAR / .n =====
if (text === '.n' || text.startsWith('.n ')) {
  if (!isAdmin) {
    return sock.sendMessage(from, {
      text: '🌀🐧 Solo administradores pueden usar .n'
    })
  }

  const mensaje = text.replace('.n', '').trim() || '🌀🐧 Atención grupo'
  const mentions = participants.map(p => p.id)

  await sock.sendMessage(from, {
    text: mensaje,
    mentions
  })
  return
}
    // ===== NOTIFY / TAGALL =====
if (text === '.notify' || text === '.tagall') {
  if (!isAdmin) return
  const mentions = participants.map(p => p.id)
  await sock.sendMessage(from,{
    text:'📣 Atención grupo',
    mentions
  })
  return
}
    // ===== TODOS =====
if (text === '.todos') {
  if (!isAdmin) return
  const mentions = participants.map(p => p.id)
  return sock.sendMessage(from,{
    text:'👥 Atención a todos',
    mentions
  })
}
    if (text.startsWith('.set')) {
  if (!isAdmin) {
    return sock.sendMessage(from, {
      text: '🌀🐧 Solo administradores pueden usar *.set*'
    })
  }

  const name = text.split(' ')[0].replace('.set', '')
  const value = text.slice(name.length + 5).trim()

  if (!value) {
    return sock.sendMessage(from, {
      text: '❌ Escribe el texto a guardar'
    })
  }

  db[name] = value
saveDB(from, db)

  return sock.sendMessage(from, {
  text: `
❄️ \`\`\`SOLICITUD ACEPTADA\`\`\` ❄️

*.set${name}* actualizado correctamente

🌀 ${metadata.subject}
  `.trim()
})
}

if (!text.startsWith('.')) return
const cmd = text.slice(1).toLowerCase()

const comandosVentas = [
  'disney','actas','ado','adicionales','alimentos','autobus','boletos',
  'canva','certificados','citas','codigos','combo','combos2','combos3',
  'combos4','combos5','constancias','diamantes','descuentos','dinamica',
  'facturas','fichareportes','fragmentos','gamepass','hbo','imss',
  'justificantes','linkreportes','linkcodigos','libros','lote','lotes',
  'metodo','metodos','maxeo','numerovirtual','netflix','prime','pasesff',
  'pago','pago2','pago3','pago4','pago5','paquete','paquete2','paquete3',
  'paquete4','paquete5','pedrial','peliculas','promo','procesos',
  'programas','promoday','preciosbot','rebote','recargas','recetas',
  'reembolsos','reglas','reportes','rfc','robux','servicios','seguros',
  'spotify','stock','stock2','stock3','stock4','stock5','stock6','stock7',
  'stock8','stock9','stock10','shein','tanda','tramites','universidad',
  'vigencia','vuelos','vix','universal','youtube','web', 'seguidores'
]

if (text.startsWith('.') && comandosVentas.includes(cmd)) {
  if (db[cmd]) {
  return sock.sendMessage(from, {
    text: `
❄️ \`${cmd.toUpperCase()}\` ❄️

\`\`\`
${db[cmd]}
\`\`\`

🌀 ${metadata.subject}
`.trim()
  })
} else {
    return sock.sendMessage(from, {
      text: `
❄️ \`\`\`SERVICIO NO CONFIGURADO\`\`\`

*.${cmd}* aún no tiene información

✏️ Usa:
\`.set${cmd} texto\`

🌀 ${metadata.subject}
`.trim()

    })
  }
}


  })

  const QRCode = require('qrcode')

sock.ev.on('connection.update', async (update) => {
  const { connection, lastDisconnect, qr } = update

  if (qr) {
    try {
      const qrImage = await QRCode.toDataURL(qr)
      console.log('📲 COPIA ESTE QR EN EL NAVEGADOR:')
      console.log(qrImage)
    } catch (e) {
      console.error('❌ Error generando QR:', e)
    }
  }

  if (connection === 'open') {
    console.log('✅ WHATSAPP CONECTADO CORRECTAMENTE')
  }

  if (connection === 'close') {
    const code = lastDisconnect?.error?.output?.statusCode
    console.log('❌ WhatsApp desconectado:', code)

    if (code !== DisconnectReason.loggedOut) {
      console.log('🔄 Reintentando en 10 segundos…')
      setTimeout(() => iniciarBot(), 10000)
    } else {
      console.log('⚠️ Sesión cerrada, se necesita nuevo QR')
    }
  }
})
}
// ================= EXPRESS (SECUNDARIO) =================
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

app.get('/', (_, res) => res.send('LYAN BOT ONLINE 🌀🐧'))
app.listen(PORT, () =>
  console.log('🌐 Express vivo en puerto', PORT)
)
process.on('uncaughtException', err => {
  console.error('❌ uncaughtException:', err)
})

process.on('unhandledRejection', err => {
  console.error('❌ unhandledRejection:', err)
})
iniciarBot()

















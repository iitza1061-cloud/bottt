const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')

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
💛🌟🐣 *LYAN BOT* 🐣🌟💛

» 👋🏻 Bienvenido al *menuprincipal*
Aquí encontrarás los comandos para mantener
un total orden en tus *GRUPOS*

══════════════════════
💛 MENÚS DISPONIBLES
══════════════════════

*╭┈┈⊰* 💛 PRINCIPAL 💛
*┊* 🌟 *.menu*
*┊* 🌟 *.menuadmins*
*┊* 🌟 *.menuventas*
*┊* 🌟 *.menuventas2*
*┊* 🌟 *.menufreefire*
*┊* 🌟 *.menustickers*
*┊* 🌟 *.menuherramientas*
*╰┈┈┈┈┈┈┈┈┈⊰*

══════════════════════
💛 SISTEMA DE VENTAS
══════════════════════
Todos los productos se configuran con:
💛 *.setcomando texto*

*╭┈┈⊰* 🌟 VENTAS 🌟
*┊* 💛 *.disney*
*┊* 💛 *.actas*
*┊* 💛 *.ado*
*┊* 💛 *.adicionales*
*┊* 💛 *.alimentos*
*┊* 💛 *.autobus*
*┊* 💛 *.boletos*
*┊* 💛 *.canva*
*┊* 💛 *.certificados*
*┊* 💛 *.citas*
*┊* 💛 *.codigos*
*┊* 💛 *.combo*
*┊* 💛 *.combos2*
*┊* 💛 *.combos3*
*┊* 💛 *.combos4*
*┊* 💛 *.combos5*
*┊* 💛 *.constancias*
*┊* 💛 *.diamantes*
*┊* 💛 *.descuentos*
*┊* 💛 *.dinamica*
*┊* 💛 *.facturas*
*┊* 💛 *.fichareportes*
*┊* 💛 *.fragmentos*
*┊* 💛 *.gamepass*
*┊* 💛 *.hbo*
*┊* 💛 *.imss*
*┊* 💛 *.justificantes*
*┊* 💛 *.linkreportes*
*┊* 💛 *.linkcodigos*
*┊* 💛 *.libros*
*┊* 💛 *.lote*
*┊* 💛 *.lotes*
*┊* 💛 *.metodo*
*┊* 💛 *.metodos*
*┊* 💛 *.maxeo*
*┊* 💛 *.numerovirtual*
*┊* 💛 *.netflix*
*┊* 💛 *.prime*
*┊* 💛 *.pasesff*
*┊* 💛 *.pago*
*┊* 💛 *.pago2*
*┊* 💛 *.pago3*
*┊* 💛 *.pago4*
*┊* 💛 *.pago5*
*┊* 💛 *.paquete*
*┊* 💛 *.paquete2*
*┊* 💛 *.paquete3*
*┊* 💛 *.paquete4*
*┊* 💛 *.paquete5*
*┊* 💛 *.pedrial*
*┊* 💛 *.peliculas*
*┊* 💛 *.promo*
*┊* 💛 *.procesos*
*┊* 💛 *.programas*
*┊* 💛 *.promoday*
*┊* 💛 *.preciosbot*
*┊* 💛 *.rebote*
*┊* 💛 *.recargas*
*┊* 💛 *.recetas*
*┊* 💛 *.reembolsos*
*┊* 💛 *.reglas*
*┊* 💛 *.reportes*
*┊* 💛 *.rfc*
*┊* 💛 *.robux*
*┊* 💛 *.servicios*
*┊* 💛 *.seguros*
*┊* 💛 *.spotify*
*┊* 💛 *.stock*
*┊* 💛 *.stock2*
*┊* 💛 *.stock3*
*┊* 💛 *.stock4*
*┊* 💛 *.stock5*
*┊* 💛 *.stock6*
*┊* 💛 *.stock7*
*┊* 💛 *.stock8*
*┊* 💛 *.stock9*
*┊* 💛 *.stock10*
*┊* 💛 *.shein*
*┊* 💛 *.tanda*
*┊* 💛 *.tramites*
*┊* 💛 *.universidad*
*┊* 💛 *.vigencia*
*┊* 💛 *.vuelos*
*┊* 💛 *.vix*
*┊* 💛 *.universal*
*┊* 💛 *.youtube*
*┊* 💛 *.web*
*╰┈┈┈┈┈┈┈┈┈⊰*

💛🌟🐣 *LYAN BOT* — Ventas automáticas 24/7 🐣🌟💛
`

const MENU_ADMINS = `
» 👋🏻 *Menu Admins* — LYAN BOT 🎀

*╭┈┈⊰* 🎀 ADMINS 🎀
*┊* 🎀 *.kick*
*┊* 🎀 *.promote*
*┊* 🎀 *.demote*
*┊* 🎀 *.link*
*┊* 🎀 *.todos*
*┊* 🎀 *.notify*
*┊* 🎀 *.grupo abrir*
*┊* 🎀 *.grupo cerrar*
*╰┈┈⊈*
`

const MENU_VENTAS = `
💛🌟🐣 *LYAN BOT* 🐣🌟💛

» 👋🏻 Bienvenido al *menuventas*
Aquí podrás ver todos los productos disponibles

*╭┈┈⊰* 🌟 PRODUCTOS 🌟
*┊* 💛 *.disney*
*┊* 💛 *.actas*
*┊* 💛 *.ado*
*┊* 💛 *.adicionales*
*┊* 💛 *.alimentos*
*┊* 💛 *.autobus*
*┊* 💛 *.boletos*
*┊* 💛 *.canva*
*┊* 💛 *.certificados*
*┊* 💛 *.citas*
*┊* 💛 *.codigos*
*┊* 💛 *.combo*
*┊* 💛 *.combos2*
*┊* 💛 *.combos3*
*┊* 💛 *.combos4*
*┊* 💛 *.combos5*
*┊* 💛 *.constancias*
*┊* 💛 *.diamantes*
*┊* 💛 *.descuentos*
*┊* 💛 *.dinamica*
*┊* 💛 *.facturas*
*┊* 💛 *.fichareportes*
*┊* 💛 *.fragmentos*
*┊* 💛 *.gamepass*
*┊* 💛 *.hbo*
*┊* 💛 *.imss*
*┊* 💛 *.justificantes*
*┊* 💛 *.linkreportes*
*┊* 💛 *.linkcodigos*
*┊* 💛 *.libros*
*┊* 💛 *.lote*
*┊* 💛 *.lotes*
*┊* 💛 *.metodo*
*┊* 💛 *.metodos*
*┊* 💛 *.maxeo*
*┊* 💛 *.numerovirtual*
*┊* 💛 *.netflix*
*┊* 💛 *.prime*
*┊* 💛 *.pasesff*
*┊* 💛 *.pago*
*┊* 💛 *.pago2*
*┊* 💛 *.pago3*
*┊* 💛 *.pago4*
*┊* 💛 *.pago5*
*┊* 💛 *.paquete*
*┊* 💛 *.paquete2*
*┊* 💛 *.paquete3*
*┊* 💛 *.paquete4*
*┊* 💛 *.paquete5*
*┊* 💛 *.pedrial*
*┊* 💛 *.peliculas*
*┊* 💛 *.promo*
*┊* 💛 *.procesos*
*┊* 💛 *.programas*
*┊* 💛 *.promoday*
*┊* 💛 *.preciosbot*
*┊* 💛 *.rebote*
*┊* 💛 *.recargas*
*┊* 💛 *.recetas*
*┊* 💛 *.reembolsos*
*┊* 💛 *.reglas*
*┊* 💛 *.reportes*
*┊* 💛 *.rfc*
*┊* 💛 *.robux*
*┊* 💛 *.servicios*
*┊* 💛 *.seguros*
*┊* 💛 *.spotify*
*┊* 💛 *.stock*
*┊* 💛 *.stock2*
*┊* 💛 *.stock3*
*┊* 💛 *.stock4*
*┊* 💛 *.stock5*
*┊* 💛 *.stock6*
*┊* 💛 *.stock7*
*┊* 💛 *.stock8*
*┊* 💛 *.stock9*
*┊* 💛 *.stock10*
*┊* 💛 *.shein*
*┊* 💛 *.tanda*
*┊* 💛 *.tramites*
*┊* 💛 *.universidad*
*┊* 💛 *.vigencia*
*┊* 💛 *.vuelos*
*┊* 💛 *.vix*
*┊* 💛 *.universal*
*┊* 💛 *.youtube*
*╰┈┈┈┈┈┈┈┈┈⊰*
`

const MENU_VENTAS2 = `
» 👋🏻 *Menu Ventas 2* — LYAN BOT 💛

*╭┈┈⊰*
*┊* 💛 *.lotesvix*
*┊* 💛 *.lotesnetflix*
*┊* 💛 *.lotesprime*
*┊* 💛 *.lotesspotify*
*╰┈┈⊈*
`
function calcularMs(horaTexto) {
  const ahora = new Date()
  const match = horaTexto.match(/(\d+)(am|pm)/i)
  if (!match) return null

  let hora = parseInt(match[1])
  const periodo = match[2].toLowerCase()

  if (periodo === 'pm' && hora !== 12) hora += 12
  if (periodo === 'am' && hora === 12) hora = 0

  const objetivo = new Date()
  objetivo.setHours(hora, 0, 0, 0)

  let ms = objetivo - ahora
  if (ms < 0) ms += 24 * 60 * 60 * 1000

  return ms
}
// =================== BOT ===================
async function iniciarBot () {
  const { state, saveCreds } = await useMultiFileAuthState('auth')

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: 'silent' }),
    browser: ['LYAN BOT', 'Chrome', '1.0.0']
  })

  sock.ev.on('creds.update', saveCreds)
// ===== WELCOME EVENT =====
sock.ev.on('group-participants.update', async (update) => {
  console.log('🔥 EVENTO PARTICIPANTS:', update)

  try {
    const { id, participants, action } = update
    if (action !== 'add') return

const db = getDB(id)
    if (!db.welcome_on) return

    const metadata = await sock.groupMetadata(id)
    const descripcion = metadata.desc || '💛🐣 Bienvenido al grupo'
    const textoWelcome = db.welcome || descripcion

    for (const user of participants) {
      await sock.sendMessage(id, {
        text: textoWelcome,
        mentions: [user]
      })
    }
  } catch (err) {
    console.log('❌ Error Welcome:', err)
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
// ===== INFO DEL GRUPO =====
const metadata = await sock.groupMetadata(from)
const participants = metadata.participants
const sender = msg.key.participant || msg.key.remoteJid
const isAdmin = participants.some(
  p => p.id === sender && p.admin
)
// ===== WELCOME ON / OFF =====
if (text === '.on welcome') {
  if (!isAdmin) return sock.sendMessage(from, { text: '💛 Solo admins 🐣' })
  db.welcome_on = true
saveDB(from, db)
  return sock.sendMessage(from, { text: '💛🐣 Welcome ACTIVADO' })
}

if (text === '.off welcome') {
  if (!isAdmin) return sock.sendMessage(from, { text: '💛 Solo admins 🐣' })
  db.welcome_on = false
saveDB(from, db)
  return sock.sendMessage(from, { text: '💛🐣 Welcome DESACTIVADO' })
}
    if (text === '.menu') {
      await sock.sendMessage(from, { react: { text: '🐣', key: msg.key } })
      return sock.sendMessage(from, { text: MENU_PRINCIPAL })
    }

    if (text === '.menuadmins') {
      return sock.sendMessage(from, { text: MENU_ADMINS })
    }

    if (text === '.menuventas') {
      return sock.sendMessage(from, { text: MENU_VENTAS })
    }

    if (text === '.menuventas2') {
      return sock.sendMessage(from, { text: MENU_VENTAS2 })
    }
    if (text === '.grupo cerrar') {
  if (!isAdmin) {
    return sock.sendMessage(from, {
      text: '❌ Solo administradores pueden usar este comando'
    })
  }

  await sock.groupSettingUpdate(from, 'announcement')
  return sock.sendMessage(from, {
    text: '🔒 Grupo cerrado correctamente'
  })
}
if (text === '.grupo abrir') {
  if (!isAdmin) {
    return sock.sendMessage(from, {
      text: '❌ Solo administradores pueden usar este comando'
    })
  }

  await sock.groupSettingUpdate(from, 'not_announcement')
  return sock.sendMessage(from, {
    text: '🔓 Grupo abierto correctamente'
  })
}
// ===== GRUPO CON HORARIO =====
// ===== HORARIOS ABRIR / CERRAR =====
if (text.startsWith('.abrir ') || text.startsWith('.cerrar ')) {
  if (!isAdmin) {
    await sock.sendMessage(from, { text: '💛🐣 Solo admins pueden usar horarios' })
    return
  }

  const accion = text.startsWith('.abrir') ? 'abrir' : 'cerrar'
  const horaTexto = text.replace(`.${accion}`, '').trim()

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

  const ahora = new Date()
  const objetivo = new Date()
  objetivo.setHours(hora, minutos, 0, 0)

  if (objetivo <= ahora) objetivo.setDate(objetivo.getDate() + 1)

  const tiempo = objetivo - ahora

  await sock.sendMessage(from, {
    text: `⏰💛 El grupo se *${accion}rá* a las *${horaTexto}*`
  })

  setTimeout(async () => {
    await sock.groupSettingUpdate(
      from,
      accion === 'abrir' ? 'not_announcement' : 'announcement'
    )

    await sock.sendMessage(from, {
      text: accion === 'abrir'
        ? '🔓💛 Grupo ABIERTO automáticamente'
        : '🔒💛 Grupo CERRADO automáticamente'
    })
  }, tiempo)

  return
}
if (text.startsWith('.kick')) {
  if (!isAdmin) {
    return sock.sendMessage(from, {
      text: '💛🐣 Solo administradores pueden usar *.kick*'
    })
  }

  if (!msg.message.extendedTextMessage?.contextInfo?.mentionedJid) {
    return sock.sendMessage(from, {
      text: '❌ Menciona a alguien para expulsar\nEj: *.kick @usuario*'
    })
  }

  const userKick = msg.message.extendedTextMessage.contextInfo.mentionedJid[0]

  try {
    await sock.groupParticipantsUpdate(from, [userKick], 'remove')
    await sock.sendMessage(from, {
      text: '💛🐣 Usuario expulsado correctamente 🌟'
    })
  } catch (e) {
    await sock.sendMessage(from, {
      text: '❌ No pude expulsar al usuario'
    })
  }
}

    if (text === '.ping') {
      return sock.sendMessage(from, { text: '💛 LYAN BOT ACTIVO 💛' })
    }
// ===== NOTIFICAR / .n =====
if (text === '.n' || text.startsWith('.n ')) {
  if (!isAdmin) {
    return sock.sendMessage(from, {
      text: '💛🐣 Solo administradores pueden usar .n'
    })
  }

  const mensaje = text.replace('.n', '').trim() || '💛🐣 Atención grupo'
  const mentions = participants.map(p => p.id)

  await sock.sendMessage(from, {
    text: mensaje,
    mentions
  })
  return
}
    if (text.startsWith('.set')) {
  if (!isAdmin) {
    return sock.sendMessage(from, {
      text: '💛🐣 Solo administradores pueden usar *.set*'
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
    text: `💛🌟 *${name}* actualizado correctamente 🐣`
  })
}

   const cmd = text.slice(1)

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
  'vigencia','vuelos','vix','universal','youtube','web'
]

if (text.startsWith('.') && comandosVentas.includes(cmd)) {
  if (db[cmd]) {
    return sock.sendMessage(from, { text: db[cmd] })
  } else {
    return sock.sendMessage(from, {
      text: `💛 *${cmd}* no está configurado aún.\n👉 Usa *.set${cmd} texto*`
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

app.get('/', (_, res) => res.send('LYAN BOT ONLINE 💛🐣'))
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






export function buildICS({ title, startISO, endISO, location, description }) {
  const dt = (iso) => iso.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  const uid = Math.random().toString(36).slice(2) + '@mina-invite'
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Mina Invite//RSVP//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT',
    `UID:${uid}`,`DTSTAMP:${dt(new Date().toISOString())}`,`DTSTART:${dt(new Date(startISO).toISOString())}`,`DTEND:${dt(new Date(endISO).toISOString())}`,
    `SUMMARY:${escapeText(title)}`,`LOCATION:${escapeText(location || '')}`,`DESCRIPTION:${escapeText(description || '')}`,'END:VEVENT','END:VCALENDAR']
  return lines.join('\r\n')
}
function escapeText(s){ return String(s).replace(/[\n\r]/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;') }
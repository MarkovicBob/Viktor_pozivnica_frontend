import React from 'react'
import { event } from '../config.js'
import { buildICS } from '../utils/ics.js'
import { FaCalendarPlus } from 'react-icons/fa'
export default function AddToCalendarButton(){
  const handleICS = ()=>{
    const ics = buildICS({ title: event.title, startISO: event.dateStart, endISO: event.dateEnd, location: `${event.location}, ${event.address}`, description: 'Vidimo se na Mininom 1. rođendanu! 🎂🎈' })
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'mina-rodjendan.ics'; a.click(); URL.revokeObjectURL(url)
  }
  const googleLink = ()=>{
    const toGoogle = (d)=> new Date(d).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z')
    const start = toGoogle(event.dateStart); const end = toGoogle(event.dateEnd)
    const params = new URLSearchParams({ action:'TEMPLATE', text:event.title, dates:`${start}/${end}`, details:'Vidimo se na Mininom 1. rođendanu! 🎂🎈', location:`${event.location}, ${event.address}` })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }
  return(<div className="flex flex-wrap gap-3">
    <button onClick={handleICS} className="btn btn-primary"><FaCalendarPlus/> Dodaj u kalendar (ICS)</button>
    <a className="btn btn-outline" target="_blank" rel="noreferrer" href={googleLink()}>Google Calendar</a>
  </div>)}

import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const translations = {
  sr: {
    // Hero component
    heroTitle: "Pozivamo Vas na Viktorov prvi rođendan 🎂",
    heroSubtitle:
      "Dođite da zajedno duvamo svećicu, jedemo tortu i pravimo uspomene! 🎈",
    confirmAttendance: "Potvrdi dolazak",
    childName: "Viktor",
    monthLabel: "Februar",
    restaurantLabel: "Restoran",
    restaurantName: "Sala Panorama",
    grandHall: "Velika sala",

    // Details component
    eventDetails: "Detalji događaja",
    when: "Kada",
    where: "Gde",
    host: "Domaćin",
    hostName: "Viktor sa mamom i tatom",
    contact: "Kontakt",
    addToCalendar: "Dodaj u kalendar",
    addToCalendarICS: "Dodaj u kalendar (ICS)",
    googleCalendar: "Google Calendar",
    addToGoogleCalendar: "Dodaj u Google Calendar",
    callMinasDad: "Pozovi Viktorovog tatu",
    callMinasMom: "Pozovi Viktorovu mamu",

    // Gallery
    galleryTitle: "Viktor kroz godinu 📸",

    // RSVP Widget
    rsvpTitle: "Potvrda dolaska",
    rsvpDescription:
      "Molimo potvrdi dolazak kako bismo sve lepo organizovali. 💖",
    rsvpWarning1: "Potvrdite samo ako ste sigurni. 💖",
    rsvpWarning2: "Potvrdite samo za svoju porodicu. 💖",
    findFamily: "Pronađi svoju porodicu",
    searchPlaceholder: "Ukucaj prezime ili ime…",
    searching: "Tražim…",
    change: "Promeni",
    loadingDetails: "Učitavam detalje…",
    alreadyResponded: "Već ste poslali potvrdu.",
    coming: "🎉 Dolazimo!",
    notComing: "😢 Nažalost ne možemo",
    numberOfAdults: "Broj odraslih",
    numberOfChildren: "Broj dece",
    childrenAge: "dece (2-12 godina)",
    totalAttending: "Ukupno dolazi:",
    person: "osoba",
    people: "osobe",
    messageForUs: "Poruka za nas (opciono)",
    messagePlaceholder: "Napišite nam poruku...",
    confirmResponse: "Potvrdi odgovor",
    sending: "Šaljem...",
    confirmationTitle: "Da li ste sigurni da želite da pošaljete vaš odgovor?",
    cancel: "Odustani",
    send: "Pošalji",
    responseSent: "Vaš odgovor je uspešno poslat!",
    thankYouAccepted: "Hvala na potvrdi! Jedva čekamo da se vidimo! 🎉❤️",
    thankYouDeclined: "Hvala na odgovoru! Žao nam je što ne možete doći. 💝",
    sadPopup: "Žao nam je što ne možete doći...",

    // Admin Dashboard
    adminAccess: "Admin pristup",
    adminPassword: "Unesi admin šifru",
    login: "Prijavi se",
    wrongPassword: "Uneli ste pogrešnu lozinku",
    rsvpStatistics: "RSVP Statistika",
    totalFamilies: "Porodica ukupno",
    accepted: "Dolazi",
    declined: "Ne dolazi",
    pending: "Na čekanju",
    allFamilies: "Sve porodice",
    family: "Porodica",
    status: "Status",
    adults: "Odrasli",
    children: "Deca",
    message: "Poruka",
    confirmedAt: "Potvrda",
    emptyList: "lista trenutno prazna",
    close: "Zatvori",

    // Footer
    footerMadeBy: "Ako želite ovakvu pozivnicu, javite se na ",
    footerWhatsApp: "WhatsApp",
    footerRights: "Sva prava zadržana.",
  },
  en: {
    // Hero component
    heroTitle: "You're Invited to Viktor's First Birthday 🎂",
    heroSubtitle:
      "Come join us to blow out candles, eat cake and make memories! 🎈",
    confirmAttendance: "Confirm Attendance",
    childName: "Viktor",
    monthLabel: "February",
    restaurantLabel: "Restaurant",
    restaurantName: "Sala Panorama",
    grandHall: "Grand hall",

    // Details component
    eventDetails: "Event Details",
    when: "When",
    where: "Where",
    host: "Host",
    hostName: "Viktor with mom and dad",
    contact: "Contact",
    addToCalendar: "Add to Calendar",
    addToCalendarICS: "Add to Calendar (ICS)",
    googleCalendar: "Google Calendar",
    addToGoogleCalendar: "Add to Google Calendar",
    callMinasDad: "Call Viktor's Dad",
    callMinasMom: "Call Viktor's Mom",

    // Gallery
    galleryTitle: "Viktor Through the Year 📸",

    // RSVP Widget
    rsvpTitle: "RSVP Confirmation",
    rsvpDescription:
      "Please confirm your attendance so we can organize everything nicely. 💖",
    rsvpWarning1: "Only confirm if you are certain. 💖",
    rsvpWarning2: "Confirm only for your family. 💖",
    findFamily: "Find your family",
    searchPlaceholder: "Type last name or first name…",
    searching: "Searching…",
    change: "Change",
    loadingDetails: "Loading details…",
    alreadyResponded: "You have already sent your confirmation.",
    coming: "🎉 We're coming!",
    notComing: "😢 Unfortunately we can't make it",
    numberOfAdults: "Number of adults",
    numberOfChildren: "Number of children",
    childrenAge: "children (2-12 years)",
    totalAttending: "Total attending:",
    person: "person",
    people: "people",
    messageForUs: "Message for us (optional)",
    messagePlaceholder: "Write us a message...",
    confirmResponse: "Confirm response",
    sending: "Sending...",
    confirmationTitle: "Are you sure you want to send your response?",
    cancel: "Cancel",
    send: "Send",
    responseSent: "Your response has been successfully sent!",
    thankYouAccepted:
      "Thank you for confirming! We can't wait to see you! 🎉❤️",
    thankYouDeclined:
      "Thank you for your response! We're sorry you can't make it. 💝",
    sadPopup: "We're sorry you can't make it...",

    // Admin Dashboard
    adminAccess: "Admin Access",
    adminPassword: "Enter admin password",
    login: "Log in",
    wrongPassword: "You entered the wrong password",
    rsvpStatistics: "RSVP Statistics",
    totalFamilies: "Total families",
    accepted: "Attending",
    declined: "Not attending",
    pending: "Pending",
    allFamilies: "All families",
    family: "Family",
    status: "Status",
    adults: "Adults",
    children: "Children",
    message: "Message",
    confirmedAt: "Confirmed",
    emptyList: "list is currently empty",
    close: "Close",

    // Footer
    footerMadeBy: "If you want an invitation like this, reach out on ",
    footerWhatsApp: "WhatsApp",
    footerRights: "All rights reserved.",
  },
  de: {
    // Hero component
    heroTitle: "Sie sind eingeladen zu Viktors erstem Geburtstag 🎂",
    heroSubtitle:
      "Komm und feiere mit uns - Kerzen ausblasen, Kuchen essen und Erinnerungen schaffen! 🎈",
    confirmAttendance: "Teilnahme bestätigen",
    childName: "Viktor",
    monthLabel: "Februar",
    restaurantLabel: "Restaurant",
    restaurantName: "Sala Panorama",
    grandHall: "Großer Saal",

    // Details component
    eventDetails: "Veranstaltungsdetails",
    when: "Wann",
    where: "Wo",
    host: "Gastgeber",
    hostName: "Viktor mit Mama und Papa",
    contact: "Kontakt",
    addToCalendar: "Zum Kalender hinzufügen",
    addToCalendarICS: "Zum Kalender hinzufügen (ICS)",
    googleCalendar: "Google Kalender",
    addToGoogleCalendar: "Zu Google Calendar hinzufügen",
    callMinasDad: "Viktors Papa anrufen",
    callMinasMom: "Viktors Mama anrufen",

    // Gallery
    galleryTitle: "Viktor durchs Jahr 📸",

    // RSVP Widget
    rsvpTitle: "Teilnahmebestätigung",
    rsvpDescription:
      "Bitte bestätigen Sie Ihre Teilnahme, damit wir organisieren können. 💖",
    rsvpWarning1: "Bitte nur bestätigen, wenn Sie sicher sind. 💖",
    rsvpWarning2: "Bitte nur für Ihre Familie bestätigen. 💖",
    findFamily: "Finden Sie Ihre Familie",
    searchPlaceholder: "Nachname oder Vorname eingeben…",
    searching: "Suche…",
    change: "Ändern",
    loadingDetails: "Lade Details…",
    alreadyResponded: "Sie haben bereits geantwortet.",
    coming: "🎉 Wir kommen!",
    notComing: "😢 Leider können wir nicht kommen",
    numberOfAdults: "Anzahl der Erwachsenen",
    numberOfChildren: "Anzahl der Kinder",
    childrenAge: "Kinder (2-12 Jahre)",
    totalAttending: "Insgesamt teilnehmend:",
    person: "Person",
    people: "Personen",
    messageForUs: "Nachricht an uns (optional)",
    messagePlaceholder: "Schreiben Sie uns eine Nachricht...",
    confirmResponse: "Antwort bestätigen",
    sending: "Sende...",
    confirmationTitle: "Sind Sie sicher, dass Sie Ihre Antwort senden möchten?",
    cancel: "Abbrechen",
    send: "Senden",
    responseSent: "Ihre Antwort wurde erfolgreich gesendet!",
    thankYouAccepted:
      "Vielen Dank für die Bestätigung! Wir freuen uns auf Sie! 🎉❤️",
    thankYouDeclined:
      "Vielen Dank für Ihre Antwort! Schade, dass Sie nicht kommen können. 💝",
    sadPopup: "Schade, dass Sie nicht kommen können...",

    // Admin Dashboard
    adminAccess: "Admin-Zugang",
    adminPassword: "Admin-Passwort eingeben",
    login: "Anmelden",
    wrongPassword: "Sie haben das falsche Passwort eingegeben",
    rsvpStatistics: "RSVP-Statistiken",
    totalFamilies: "Familien insgesamt",
    accepted: "Teilnehmend",
    declined: "Nicht teilnehmend",
    pending: "Ausstehend",
    allFamilies: "Alle Familien",
    family: "Familie",
    status: "Status",
    adults: "Erwachsene",
    children: "Kinder",
    message: "Nachricht",
    confirmedAt: "Datum",
    emptyList: "Liste ist derzeit leer",
    close: "Schließen",

    // Footer
    footerMadeBy: "Für eine solche Einladung, kontaktieren Sie uns auf ",
    footerWhatsApp: "WhatsApp",
    footerRights: "Alle Rechte vorbehalten.",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("sr");

  const t = (key) => {
    return translations[language][key] || key;
  };

  const cycleLanguage = () => {
    setLanguage((prev) => {
      if (prev === "sr") return "en";
      if (prev === "en") return "de";
      return "sr";
    });
  };

  // Keep old toggleLanguage for backward compatibility
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "sr" ? "en" : "sr"));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        toggleLanguage,
        cycleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

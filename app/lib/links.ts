// Atlas Game Shop's WhatsApp chat. Every WhatsApp link on the site points here.
export const WHATSAPP = "https://wa.me/6285138796069";

/** WhatsApp chat link with a message already typed in for the user. */
export const whatsappWith = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

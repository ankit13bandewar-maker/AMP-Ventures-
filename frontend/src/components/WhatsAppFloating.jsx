import React from 'react';

export default function WhatsAppFloating() {
  const whatsappUrl = "https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I'm%20interested%20in%20taking%20my%20offline%20business%20online.%20Can%20we%20schedule%20a%20consultation?";

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-btn floating-whatsapp"
      title="Chat directly with Lead Architect on WhatsApp"
      aria-label="Direct WhatsApp Chat"
    >
      💬
    </a>
  );
}

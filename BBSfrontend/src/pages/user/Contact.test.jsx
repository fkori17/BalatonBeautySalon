import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

describe("Contact komponens", () => {
  
  test("megjeleníti a főcímet és a CTA szöveget", () => {
    render(<Contact />);
    
    expect(screen.getByText("Kapcsolat")).toBeInTheDocument();
    expect(screen.getByText(/Időpontfoglalás vagy kérdés esetén/i)).toBeInTheDocument();
  });

  test("megjeleníti a helyes címet és a Google Maps linket", () => {
    render(<Contact />);
    
    const addressLink = screen.getByText("8648 Balatonkeresztúr, Kossuth Lajos u. 79.");
    expect(addressLink).toBeInTheDocument();
    expect(addressLink.closest('a')).toHaveAttribute("href", "https://www.google.com/maps/dir//Balatonkereszt%C3%BAr,+Balaton+Beauty+Salon,+Kossuth+Lajos+u.+79,+8648/@46.6923898,17.3719449,18.75z/data=!4m17!1m7!3m6!1s0x4768ff50bd34212f:0x60aec0da3bc4268!2sBalaton+Beauty+Salon!8m2!3d46.692272!4d17.3724761!16s%2Fg%2F11frc36v1b!4m8!1m0!1m5!1m1!1s0x4768ff50bd34212f:0x60aec0da3bc4268!2m2!1d17.3724761!2d46.692272!3e0?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D");
  });

  test("megjeleníti a telefonos és WhatsApp elérhetőségeket", () => {
    render(<Contact />);
    
    const callLink = screen.getByText("Hívás").closest('a');
    const whatsappLink = screen.getByText("WhatsApp").closest('a');

    expect(callLink).toHaveAttribute("href", "tel:+36123456789");
    expect(whatsappLink).toHaveAttribute("href", "https://wa.me/36123456789");
  });

  test("megjeleníti a helyes email címet", () => {
    render(<Contact />);
    
    const emailLink = screen.getByText("salon@gmail.com");
    expect(emailLink.closest('a')).toHaveAttribute("href", "mailto:salon@gmail.com");
  });

  test("megjeleníti a nyitvatartási időket", () => {
    render(<Contact />);
    
    expect(screen.getByText("Nyitvatartás")).toBeInTheDocument();
    expect(screen.getByText(/Kedd – Szombat:/i)).toBeInTheDocument();
    expect(screen.getByText("06:00 – 20:00")).toBeInTheDocument();
    expect(screen.getByText("Zárva")).toBeInTheDocument();
  });

  test("megjeleníti a beágyazott Google térképet (iframe)", () => {
    render(<Contact />);
    
    const iframe = screen.getByTitle("Google térkép");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2736.682064788427!2d17.369901176769815!3d46.69227565066697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4768ff50bd34212f%3A0x60aec0da3bc4268!2sBalaton%20Beauty%20Salon!5e0!3m2!1shu!2shu!4v1768652012080!5m2!1shu!2shu");
  });
});
document.getElementById("rsvpForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("rsvpName")?.value.trim();
  const asistencia = document.getElementById("rsvpAttendance")?.value;
  const mensaje = document.getElementById("rsvpMessage")?.value.trim();

  if (!nombre) return alert("Por favor escribe tu nombre");
  if (!asistencia) return alert("Selecciona tu respuesta");

  const rsvpSection = document.getElementById("rsvp");
  const numeroFiesta = rsvpSection?.dataset.wa;

  if (!numeroFiesta) return alert("Falta configurar el WhatsApp");

  // Datos del evento desde tu JSON
  const nombreEvento =
    window.invitationData?.hero?.names ||
    window.invitationData?.site?.couple ||
    "los anfitriones";

  const textoEvento = `la celebración de ${nombreEvento}`;

  let textoWA = "";

  if (asistencia === "Sí asistiré") {
    textoWA = `Hola.
Mi nombre es ${nombre}.

Confirmo mi asistencia a ${textoEvento}.

Mensaje:
${mensaje || "Será un gusto acompañarles."}`;
  } else {
    textoWA = `Hola.
Mi nombre es ${nombre}.

Lamentablemente no podré asistir a ${textoEvento}.

Mensaje:
${mensaje || "Les deseo que tengan una celebración maravillosa."}`;
  }

  const url = `https://wa.me/${numeroFiesta}?text=${encodeURIComponent(textoWA)}`;
  window.open(url, "_blank");

  const ok = document.getElementById("rsvpSuccess");

  if (ok) {
    ok.classList.remove("hidden");

    ok.textContent =
      asistencia === "Sí asistiré"
        ? "Gracias por confirmar tu asistencia."
        : "Gracias por avisarnos.";
  }

  this.reset();
});
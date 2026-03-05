document.getElementById("rsvpForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("rsvpName").value.trim();
  const asistencia = document.getElementById("rsvpAttendance").value;
  const mensaje = document.getElementById("rsvpMessage").value.trim();

  if (!nombre) return alert("Por favor escribe tu nombre");
  if (!asistencia) return alert("Selecciona tu respuesta");

  const numeroFiesta = document.getElementById("rsvp")?.dataset.wa;
  if (!numeroFiesta) return alert("Falta configurar el WhatsApp.");

  let textoWA = "";

  if (asistencia === "Sí asistiré") {
    textoWA = `Hola
Soy ${nombre}.
Confirmo mi asistencia al evento.
Mensaje: ${mensaje || "Con mucho cariño"}`;
  } else {
    textoWA = `Hola
Soy ${nombre}.
Lamentablemente no podré asistir.
Mensaje: ${mensaje || "Les mando un fuerte abrazo"}`;
  }

  const url = `https://wa.me/${numeroFiesta}?text=${encodeURIComponent(textoWA)}`;
  window.open(url, "_blank");

  const ok = document.getElementById("rsvpSuccess");

  if (ok) {
    ok.classList.remove("hidden");
    ok.textContent =
      asistencia === "Sí asistiré"
        ? "¡Gracias por confirmar tu asistencia!"
        : "Gracias por avisarnos";
  }

  this.reset();
});
document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/invitation.json")
    .then((res) => {
      if (!res.ok) throw new Error("No se pudo cargar invitation.json");
      return res.json();
    })
    .then((data) => {
      /* =====================================================
         🎵 MUSIC DESDE JSON (NO BORRA NADA)
         ===================================================== */
      const musicEl = document.getElementById("bgMusic");
      if (musicEl && data.music?.src) {
        musicEl.src = data.music.src;
        musicEl.preload = "auto";
      }

      /* =====================================================
         META / SITE
         ===================================================== */

      if (data.meta?.pageTitle) {
        document.title = data.meta.pageTitle;
      }

      const headerLogo = document.getElementById("headerLogo");
      if (headerLogo && data.site?.couple) {
        headerLogo.innerHTML = data.site.couple;
      }

      /* =====================================================
         NAV
         ===================================================== */

      const navLeft = document.getElementById("navLeft");
      const navRight = document.getElementById("navRight");

      if (navLeft && data.nav?.left) {
        navLeft.innerHTML = "";
        data.nav.left.forEach((link) => {
          navLeft.innerHTML += `<a href="${link.href}">${link.label}</a>`;
        });
      }

      if (navRight && data.nav?.right) {
        navRight.innerHTML = "";
        data.nav.right.forEach((link) => {
          navRight.innerHTML += `<a href="${link.href}">${link.label}</a>`;
        });
      }

      /* ✅ AVISAR A MAIN.JS QUE YA EXISTEN LOS LINKS */
      document.dispatchEvent(new CustomEvent("nav:ready"));

      /* =====================================================
         HERO
         ===================================================== */

      document.getElementById("heroPretitle").textContent = data.hero.pretitle;
      document.getElementById("heroNames").textContent = data.hero.names;

      if (data.hero.subtitle) {
        document.getElementById("heroSubtitle").textContent =
          data.hero.subtitle;
      } else {
        document.getElementById("heroSubtitle").style.display = "none";
      }
      /* =====================================================
   COUNTDOWN DESDE JSON
   ===================================================== */

      if (data.hero?.date && typeof startCountdown === "function") {
        startCountdown(data.hero.date);
      }

      /* =====================================================
         PRESENTACIÓN
         ===================================================== */

      const presentationTitle = document.getElementById("presentationTitle");
      const presentationParents = document.getElementById(
        "presentationParents",
      );
      const presentationText = document.getElementById("presentationText");
      const presentationIcon = document.getElementById("presentationIcon");

      if (presentationTitle)
        presentationTitle.innerHTML = data.presentation?.title || "";

      if (presentationText)
        presentationText.innerHTML = data.presentation?.text || "";

      if (presentationIcon && data.presentation?.icon)
        presentationIcon.src = data.presentation.icon;
      function renderPresentationGroup(containerId, groups) {
        const container = document.getElementById(containerId);
        if (!container || !groups) return;

        container.innerHTML = "";

        groups.forEach((group) => {
          container.innerHTML += `
      <div class="presentation-group">
        <span class="presentation-role">${group.note}</span>
        <p class="presentation-names">
          ${group.names.join("<br>")}
        </p>
      </div>
    `;
        });
      }

      // Papás
      renderPresentationGroup(
        "presentationParents",
        data.presentation?.parents,
      );

      // Padrinos
      renderPresentationGroup(
        "presentationPadrinos",
        data.presentation?.padrinos,
      );

      /* =====================================================
         LOCATION
         ===================================================== */

      const locationTitle = document.getElementById("locationTitle");
      const locationSubtitle = document.getElementById("locationSubtitle");
      const locationDate = document.getElementById("locationDate");
      const locationGrid = document.getElementById("locationGrid");

      if (locationTitle) locationTitle.innerHTML = data.location?.title || "";
      if (locationSubtitle)
        locationSubtitle.innerHTML = data.location?.subtitle || "";
      if (locationDate) locationDate.innerHTML = data.location?.dateText || "";

      if (locationGrid && data.location?.places) {
        locationGrid.innerHTML = "";
        data.location.places.forEach((place) => {
          locationGrid.innerHTML += `
    <div class="location-card reveal-zoom">

      ${place.image ? `<img src="${place.image}" class="location-img">` : ""}

      <h3 class="location-card-title">${place.title}</h3>
      <p class="location-time">${place.time}</p>
      <p class="location-place">${place.place}</p>
      <p class="location-address">${place.address}</p>

      <a href="${place.map}" class="btn btn-primary" target="_blank">
        Ver mapa
      </a>

    </div>
  `;
        });
      }

      /* =====================================================
         TIMELINE
         ===================================================== */

      const timelineTitle = document.getElementById("timelineTitle");
      const timelineContainer = document.getElementById("timelineContainer");

      if (timelineTitle) timelineTitle.innerHTML = data.timeline?.title || "";

      if (timelineContainer && data.timeline?.items) {
        timelineContainer.innerHTML = `<div class="timeline-line"></div>`;
        data.timeline.items.forEach((item, i) => {
          timelineContainer.innerHTML += `
            <div class="timeline-row ${i % 2 ? "is-flip" : ""}">
              <div class="timeline-side timeline-side--left">
                ${
                  i % 2 === 0
                    ? `<img class="timeline-icon" src="${item.icon}">`
                    : `<div class="timeline-text"><span class="time">${item.time}</span>${item.text}</div>`
                }
              </div>
              <div class="timeline-center"><span class="timeline-point"></span></div>
              <div class="timeline-side timeline-side--right">
                ${
                  i % 2
                    ? `<img class="timeline-icon" src="${item.icon}">`
                    : `<div class="timeline-text"><span class="time">${item.time}</span>${item.text}</div>`
                }
              </div>
            </div>
          `;
        });
      }

      /* =====================================================
         GIFTS
         ===================================================== */

      const giftsTitle = document.getElementById("giftsTitle");
      const giftsText = document.getElementById("giftsText");
      const giftsOptions = document.getElementById("giftsOptions");

      if (giftsTitle) giftsTitle.innerHTML = data.gifts?.title || "";
      if (giftsText) giftsText.innerHTML = data.gifts?.text || "";

      if (giftsOptions && data.gifts?.items) {
        giftsOptions.innerHTML = "";
        data.gifts.items.forEach((gift) => {
          giftsOptions.innerHTML += `
            <div class="gift-item reveal-zoom">
              <img src="${gift.icon}" class="gift-icon">
              <h4 class="gift-title">${gift.title}</h4>
              <p class="gift-desc">${gift.desc}</p>
            </div>
          `;
        });
      }

      /* =====================================================
         DRESSCODE
         ===================================================== */

      const dresscodeTitle = document.getElementById("dresscodeTitle");
      const dresscodeType = document.getElementById("dresscodeType");
      const dresscodeImage = document.getElementById("dresscodeImage");
      const dresscodeNote = document.getElementById("dresscodeNote");
      const menTitle = document.getElementById("dresscodeMenTitle");
      const womenTitle = document.getElementById("dresscodeWomenTitle");
      const menList = document.getElementById("dresscodeMen");
      const womenList = document.getElementById("dresscodeWomen");

      if (dresscodeTitle)
        dresscodeTitle.innerHTML = data.dresscode?.title || "";
      if (dresscodeType) dresscodeType.innerHTML = data.dresscode?.type || "";
      if (dresscodeImage) dresscodeImage.src = data.dresscode?.image || "";
      if (dresscodeNote) dresscodeNote.innerHTML = data.dresscode?.note || "";
      if (menTitle) menTitle.innerHTML = data.dresscode?.menTitle || "";
      if (womenTitle) womenTitle.innerHTML = data.dresscode?.womenTitle || "";

      if (menList) {
        menList.innerHTML = "";
        data.dresscode?.men?.forEach(
          (i) => (menList.innerHTML += `<li>${i}</li>`),
        );
      }

      if (womenList) {
        womenList.innerHTML = "";
        data.dresscode?.women?.forEach(
          (i) => (womenList.innerHTML += `<li>${i}</li>`),
        );
      }

      /* =====================================================
   GRATITUDE (AGRADECIMIENTO)
   ===================================================== */

      const gratitudeTitle = document.getElementById("gratitudeTitle");
      const gratitudeText = document.getElementById("gratitudeText");

      if (gratitudeTitle)
        gratitudeTitle.innerHTML = data.gratitude?.title || "";

      if (gratitudeText) gratitudeText.innerHTML = data.gratitude?.text || "";

      /* =====================================================
    GALLERY
    ===================================================== */

      const gallerySection = document.getElementById("gallery");
      const galleryTitle = document.getElementById("galleryTitle");
      const galleryGrid = document.getElementById("galleryGrid");

      if (galleryTitle) galleryTitle.innerHTML = data.gallery?.title || "";

      if (galleryGrid && data.gallery?.type) {
        galleryGrid.innerHTML = "";
        galleryGrid.classList.remove("gallery-wishes");

        /* =========================
           IMAGES
           ========================= */
        if (data.gallery.type === "images" && data.gallery.images?.length) {
          data.gallery.images.forEach((img) => {
            galleryGrid.innerHTML += `<img src="${img}">`;
          });

          if (typeof initGallery === "function") {
            initGallery();
          }
        } else if (
          /* =========================
           WISHES
           ========================= */
          data.gallery.type === "wishes" &&
          data.gallery.items?.length
        ) {
          galleryGrid.classList.add("gallery-wishes");

          data.gallery.items.forEach((wish) => {
            galleryGrid.innerHTML += `
        <div class="wish-card">
          <p>${wish}</p>
        </div>
      `;
          });
        } else {
          /* =========================
           VACÍO
           ========================= */
          gallerySection.style.display = "none";
        }
      }

      /* =====================================================
   RSVP – SOLO TEXTO DINÁMICO
   ===================================================== */
      const rsvpSection = document.getElementById("rsvp");
      const rsvpTitle = document.getElementById("rsvpTitle");
      const rsvpIntro = document.getElementById("rsvpIntro");
      const rsvpNote = document.getElementById("rsvpNote");
      const rsvpSuccess = document.getElementById("rsvpSuccess");

      const rsvpForm = document.getElementById("rsvpForm");
      const rsvpName = document.getElementById("rsvpName");
      const rsvpAttendance = document.getElementById("rsvpAttendance");
      const rsvpMessage = document.getElementById("rsvpMessage");
      const rsvpButton = document.getElementById("rsvpButton");

      if (rsvpSection && data.rsvp?.whatsapp) {
        rsvpSection.dataset.wa = data.rsvp.whatsapp;
      }
      if (rsvpTitle) rsvpTitle.innerHTML = data.rsvp?.title || "";
      if (rsvpIntro) rsvpIntro.innerHTML = data.rsvp?.intro || "";
      if (rsvpNote) rsvpNote.innerHTML = data.rsvp?.note || "";

      if (rsvpName)
        rsvpName.placeholder = data.rsvp?.fields?.namePlaceholder || "";

      if (rsvpMessage)
        rsvpMessage.placeholder = data.rsvp?.fields?.messagePlaceholder || "";

      if (rsvpButton)
        rsvpButton.innerHTML = data.rsvp?.fields?.buttonText || "";

      if (rsvpAttendance) {
        rsvpAttendance.innerHTML = `
    <option value="">
      ${data.rsvp?.fields?.attendancePlaceholder || ""}
    </option>
  `;
        data.rsvp?.fields?.attendanceOptions?.forEach((opt) => {
          rsvpAttendance.innerHTML += `<option>${opt}</option>`;
        });
      }

      /* =====================================================
         FOOTER
         ===================================================== */

      const footerNames = document.getElementById("footerNames");
      const footerCredits = document.getElementById("footerCredits");

      if (footerNames) footerNames.innerHTML = data.footer?.names || "";
      if (footerCredits) footerCredits.innerHTML = data.footer?.credits || "";
    })
    .catch((err) => console.error("Error cargando invitation.json:", err));
});

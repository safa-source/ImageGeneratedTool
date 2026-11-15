/* CANVAS AI — APPLICATION JAVASCRIPT (consolidated) */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- AUTH: show / hide password ---------- */

  document.querySelectorAll("[data-toggle-password]").forEach((button) => {
    button.addEventListener("click", () => {
      const field = document.getElementById(
        button.getAttribute("data-toggle-password"),
      );
      if (!field) return;

      const show = field.type === "password";
      field.type = show ? "text" : "password";
      button.textContent = show ? "Hide" : "Show";
    });
  });

  /* ---------- ELEMENTS ---------- */

  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const mainContent = document.querySelector(".main-content");

  const newProjectBtn = document.getElementById("newProjectBtn");
  const imagePrompt = document.getElementById("imagePrompt");
  const characterCount = document.getElementById("characterCount");
  const uploadImageBtn = document.getElementById("uploadImageBtn");
  const referenceUpload = document.getElementById("referenceUpload");
  const generateBtn = document.getElementById("generateBtn");
  const emptyState = document.getElementById("emptyState");
  const creationGrid = document.getElementById("creationGrid");

  const MAX_CHARACTERS = 2000;
  let referenceImage = null;
  let isGenerating = false;

  const isMobile = () => window.innerWidth <= 767;

  /* ---------- SIDEBAR ---------- */

  function openSidebar() {
    sidebar.classList.remove("collapsed");
    sidebar.classList.add("mobile-open");
    if (sidebarOverlay) sidebarOverlay.classList.add("show");
  }

  function closeSidebar() {
    sidebar.classList.remove("mobile-open");
    if (sidebarOverlay) sidebarOverlay.classList.remove("show");
  }

  function toggleSidebar() {
    if (isMobile()) {
      sidebar.classList.contains("mobile-open")
        ? closeSidebar()
        : openSidebar();
      return;
    }

    const collapsed = sidebar.classList.toggle("collapsed");
    if (mainContent) mainContent.style.marginLeft = collapsed ? "0" : "";
  }

  if (sidebar && sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleSidebar);
    if (sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isMobile()) closeSidebar();
    });

    window.addEventListener("resize", () => {
      if (isMobile()) {
        sidebar.classList.remove("collapsed");
        if (mainContent) mainContent.style.marginLeft = "";
      } else {
        closeSidebar();
        if (mainContent) {
          mainContent.style.marginLeft = sidebar.classList.contains("collapsed")
            ? "0"
            : "";
        }
      }
    });
  }

  /* ---------- NAVIGATION ---------- */

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();

      document.querySelectorAll(".nav-item").forEach((nav) => {
        nav.classList.remove("active");
      });

      item.classList.add("active");
      if (isMobile()) closeSidebar();
    });
  });

  /* ---------- CHARACTER COUNTER ---------- */

  if (imagePrompt && characterCount) {
    imagePrompt.addEventListener("input", () => {
      if (imagePrompt.value.length > MAX_CHARACTERS) {
        imagePrompt.value = imagePrompt.value.slice(0, MAX_CHARACTERS);
      }

      const length = imagePrompt.value.length;
      characterCount.textContent = `${length} / ${MAX_CHARACTERS}`;
      characterCount.style.color = length >= MAX_CHARACTERS ? "#e03131" : "";
    });
  }

  /* ---------- IMAGE UPLOAD ---------- */

  if (uploadImageBtn && referenceUpload) {
    uploadImageBtn.addEventListener("click", () => referenceUpload.click());

    referenceUpload.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        showNotification("Please select a valid image.", "error");
        referenceUpload.value = "";
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        showNotification("Image must be smaller than 10 MB.", "error");
        referenceUpload.value = "";
        return;
      }

      if (referenceImage) URL.revokeObjectURL(referenceImage);
      referenceImage = URL.createObjectURL(file);

      uploadImageBtn.innerHTML = `
                <i class="bi bi-check-circle-fill" style="color:#047857"></i>
                <span>${escapeHTML(file.name)}</span>
            `;

      showNotification("Reference image selected.", "success");
    });
  }

  /* ---------- RESET WORKSPACE ---------- */

  function resetWorkspace() {
    if (!imagePrompt) return;

    imagePrompt.value = "";

    if (characterCount) {
      characterCount.textContent = `0 / ${MAX_CHARACTERS}`;
      characterCount.style.color = "";
    }

    if (referenceUpload) referenceUpload.value = "";

    if (referenceImage) {
      URL.revokeObjectURL(referenceImage);
      referenceImage = null;
    }

    if (uploadImageBtn) {
      uploadImageBtn.innerHTML = `
                <i class="bi bi-paperclip"></i>
                <span>Upload reference</span>
            `;
    }

    const aspectRatio = document.getElementById("aspectRatio");
    const imageStyle = document.getElementById("imageStyle");
    const imageQuality = document.getElementById("imageQuality");

    if (aspectRatio) aspectRatio.value = "1:1";
    if (imageStyle) imageStyle.value = "realistic";
    if (imageQuality) imageQuality.value = "standard";

    imagePrompt.focus();
    closeSidebar();
  }

  if (newProjectBtn) newProjectBtn.addEventListener("click", resetWorkspace);

  /* ---------- IMAGE GENERATION ---------- */

  if (generateBtn && imagePrompt) {
    generateBtn.addEventListener("click", async () => {
      if (isGenerating) return;

      const prompt = imagePrompt.value.trim();

      if (!prompt) {
        imagePrompt.focus();
        imagePrompt.style.borderColor = "#e03131";
        showNotification(
          "Please describe the image you want to create.",
          "error",
        );
        setTimeout(() => {
          imagePrompt.style.borderColor = "";
        }, 1500);
        return;
      }

      const settings = {
        prompt,
        aspectRatio: document.getElementById("aspectRatio")?.value,
        style: document.getElementById("imageStyle")?.value,
        quality: document.getElementById("imageQuality")?.value,
        referenceImage,
      };

      isGenerating = true;
      const originalContent = generateBtn.innerHTML;
      generateBtn.disabled = true;
      generateBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                Preparing image...
            `;

      try {
        // Connect your image-generation API here, then call:
        // addGeneratedImage(result.imageUrl, prompt);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        showNotification(
          "Frontend is ready. Connect an image-generation API to generate artwork.",
          "info",
        );
      } catch (error) {
        console.error(error);
        showNotification("Something went wrong. Please try again.", "error");
      } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = originalContent;
        isGenerating = false;
      }
    });
  }

  /* ---------- GALLERY ---------- */

  function addGeneratedImage(imageUrl, prompt) {
    if (!imageUrl || !creationGrid) return;

    const card = document.createElement("article");
    card.className = "creation-card";

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "Generated artwork";
    image.loading = "lazy";

    const info = document.createElement("div");
    info.className = "creation-card-info";

    const title = document.createElement("h4");
    title.textContent = prompt || "Untitled creation";

    info.appendChild(title);
    card.appendChild(image);
    card.appendChild(info);

    image.addEventListener("error", () => card.remove());

    creationGrid.prepend(card);
    if (emptyState) emptyState.style.display = "none";
  }

  /* ---------- NOTIFICATIONS ---------- */

  /* ---------- NOTIFICATIONS ---------- */

  function showNotification(message, type = "info") {
    const colors = {
      info: "#4f1629", // deep wine (matches sidebar)
      success: "#2f9e6e", // soft green
      error: "#e03131", // rose red
    };

    const notification = document.createElement("div");
    notification.className = "app-notification";
    notification.textContent = message;

    Object.assign(notification.style, {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      maxWidth: "360px",
      padding: "14px 19px",
      background: colors[type] || colors.info,
      color: "#fff",
      borderRadius: "9px",
      fontSize: "12px",
      lineHeight: "1.6",
      boxShadow: "0 8px 25px rgba(0,0,0,.15)",
      zIndex: "2000",
      animation: "fadeUp .25s ease",
    });

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(8px)";
      setTimeout(() => notification.remove(), 250);
    }, 3500);
  }

  /* ---------- UTILITIES ---------- */

  function escapeHTML(value) {
    return value.replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[character],
    );
  }
});

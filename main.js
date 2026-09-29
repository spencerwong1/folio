// Waitlist forms (hero and final call to action).
//
// The provider is still open (PRD section 15, item 9). Set WAITLIST_ENDPOINT to
// any URL that accepts a JSON POST of { email, consent, source }, e.g. your own
// API, a Formspree form or a Loops form endpoint. The endpoint should return
// 2xx when the email is added and 409 when it's already on the list.
// While it's empty, the form runs in demo mode and nothing is sent.
const WAITLIST_ENDPOINT = "";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function submitToWaitlist(email, source) {
  if (!WAITLIST_ENDPOINT) {
    console.info("[waitlist] demo mode, not sent:", email);
    await new Promise((resolve) => setTimeout(resolve, 400));
    return "created";
  }

  const response = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, consent: true, source }),
  });

  if (response.status === 409) return "duplicate";
  if (!response.ok) throw new Error(`Waitlist request failed: ${response.status}`);
  return "created";
}

document.querySelectorAll(".waitlist").forEach((form) => {
  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector(".waitlist__status");

  const show = (state, message) => {
    status.dataset.state = state;
    status.textContent = message;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = input.value.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(email)) {
      input.setAttribute("aria-invalid", "true");
      show("error", "Enter a valid email address.");
      input.focus();
      return;
    }

    input.removeAttribute("aria-invalid");
    button.disabled = true;
    button.textContent = "Joining…";
    show("", "");

    try {
      const result = await submitToWaitlist(email, form.dataset.source);
      show(
        "success",
        result === "duplicate"
          ? "You're already on the list. We'll be in touch."
          : "Thanks, you're on the list. We'll email you when Folio is ready."
      );
      form.reset();
    } catch (error) {
      console.error(error);
      show("error", "Something went wrong. Please try again.");
    } finally {
      button.disabled = false;
      button.textContent = "Get started";
    }
  });
});

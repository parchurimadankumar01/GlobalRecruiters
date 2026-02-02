// ==========================
// APPLY FORM SUBMIT (SAFE)
// ==========================
const applyForm = document.getElementById("applyForm");

if (applyForm) {
  applyForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const job = document.getElementById("job")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();

    // Get country from URL (country.html) or fallback
    const params = new URLSearchParams(window.location.search);
    const country = (params.get("country") || "general").toLowerCase();

    if (!name || !job || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    console.log("Submitting application:", {
      name,
      job,
      email,
      phone,
      country
    });

    try {
      // ==========================
      // 1️⃣ SAVE TO FIRESTORE
      // ==========================
      const docRef = await db.collection("applications").add({
        name,
        job,
        email,
        phone,
        country,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      console.log("Application saved:", docRef.id);

      // ==========================
      // 2️⃣ EMAIL TO ADMIN
      // ==========================
      await emailjs.send(
        "service_hn1conq",      // admin service
        "template_pjll5to",     // admin template
        {
          name,
          job,
          email,
          phone,
          country
        }
      );

      // ==========================
      // 3️⃣ AUTO-REPLY TO USER ✅
      // ==========================
      await emailjs.send(
        "service_hn1conq",
        "template_user_reply", // ⬅️ create this in EmailJS
        {
          to_email: email,
          to_name: name,
          job: job,
          country: country.toUpperCase()
        }
      );

      alert("✅ Application submitted successfully!");
      applyForm.reset();

    } catch (error) {
      console.error("Application submit error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  });
}

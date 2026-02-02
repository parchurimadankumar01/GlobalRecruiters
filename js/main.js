// ==========================
// APPLY FORM SUBMIT
// ==========================
document.getElementById("applyForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const job = document.getElementById("job").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // OPTIONAL: get country from URL (for country pages)
  const params = new URLSearchParams(window.location.search);
  const country = params.get("country") || "general";

  if (!name || !job || !email || !phone) {
    alert("Please fill all fields");
    return;
  }

  console.log("Submitting:", { name, job, email, phone, country });

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
      createdAt: firebase.firestore.Timestamp.now()
    });

    console.log("Saved with ID:", docRef.id);

    // ==========================
    // 2️⃣ SEND EMAIL TO ADMIN
    // ==========================
    await emailjs.send(
      "service_hn1conq",        // ✅ your service ID
      "template_pjll5to",       // ✅ your template ID
      {
        name: name,
        job: job,
        email: email,
        phone: phone,
        country: country
      }
    );

    console.log("Email notification sent");

    // ==========================
    // 3️⃣ SUCCESS
    // ==========================
    alert("Application submitted successfully! We will contact you soon.");
    e.target.reset();

  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong. Please try again.");
  }
});

document.getElementById("applyForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const job = document.getElementById("job").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const params = new URLSearchParams(window.location.search);
  const country = params.get("country") || "General";

  if (!name || !job || !email || !phone) {
    alert("Please fill all fields");
    return;
  }

  try {
    // 1️⃣ SAVE APPLICATION TO FIRESTORE
    await db.collection("applications").add({
      name,
      job,
      email,
      phone,
      country,
      createdAt: firebase.firestore.Timestamp.now()
    });

    // 2️⃣ SEND EMAIL TO ADMIN
    await emailjs.send(
      "service_hn1conq",      // your service ID
      "template_pjll5to",     // admin template
      {
        name,
        job,
        email,
        phone,
        country
      }
    );

    // 3️⃣ SEND AUTO-REPLY TO USER ✅
    await emailjs.send(
      "service_hn1conq",      // same service
      "template_35cruuo",     // AUTO-REPLY template
      {
        name,
        job,
        email,                // VERY IMPORTANT (user email)
        country
      }
    );

    alert("Application submitted successfully!");
    e.target.reset();

  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong. Please try again.");
  }
});

document.getElementById("applyForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  console.log("Submitting:", { name, job, email, phone });

  try {
    // 1️⃣ Save to Firestore
    const docRef = await db.collection("applications").add({
      name: name,
      job: job,
      email: email,
      phone: phone,
      createdAt: firebase.firestore.Timestamp.now()
    });

    console.log("Saved with ID:", docRef.id);

    // 2️⃣ Send Gmail notification via EmailJS
    emailjs.send("service_hn1conq", "template_pjll5to", {
      name: name,
      job: job,
      email: email,
      phone: phone
    })
    .then(() => {
      console.log("Email notification sent");
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
    });

    // 3️⃣ Success message
    alert("Application submitted successfully! We will contact you soon.");
    e.target.reset();

  } catch (error) {
    console.error("Firestore error:", error);
    alert("Error saving application. Check console.");
  }
});

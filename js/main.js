document.getElementById("applyForm").addEventListener("submit", async function (e) {
  e.preventDefault();

const name = document.getElementById("name").value;
const job = document.getElementById("job").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;


  console.log("Submitting:", { name, job, phone });

  try {
    const docRef = await db.collection("applications").add({
      name: name,
      job: job,
      phone: phone,
      email: email,
      createdAt: firebase.firestore.Timestamp.now()
    });

    console.log("Saved with ID:", docRef.id);
    alert("Application submitted successfully! We will contact you soon.");
    e.target.reset();
  } catch (error) {
    console.error("Firestore error:", error);
    alert("Error saving application. Check console.");
  }
});

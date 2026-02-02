document.addEventListener("DOMContentLoaded", () => {

  const jobsRef = db.collection("jobs");
  const appsRef = db.collection("applications");

  const jobsList = document.getElementById("jobsList");
  const appTableBody = document.querySelector("#appTable tbody");
  const searchInput = document.getElementById("searchInput");

  // ADD JOB
  window.addJob = async function () {
    const title = document.getElementById("jobRole").value.trim();
    const country = document.getElementById("jobCountry").value;
    const emergency = document.getElementById("emergency").checked;

    if (!title) {
      alert("Enter Job Role");
      return;
    }

    await jobsRef.add({
      title: title,          // ✅ SAME FIELD EVERYWHERE
      country: country,
      emergency: emergency,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById("jobRole").value = "";
    document.getElementById("emergency").checked = false;
  };

  // LOAD JOBS
  jobsRef.orderBy("createdAt", "desc").onSnapshot(snapshot => {
    jobsList.innerHTML = "";

    if (snapshot.empty) {
      jobsList.innerHTML = "<p>No jobs yet</p>";
      return;
    }

    snapshot.forEach(doc => {
      const job = doc.data();
      jobsList.innerHTML += `
        <div class="card p-3" style="min-width:220px">
          <b>${job.title}</b>
          <div>${job.country}</div>
          ${job.emergency ? `<span class="badge bg-danger">15 Days</span>` : ""}
        </div>
      `;
    });
  });

  // LOAD APPLICATIONS
  appsRef.orderBy("createdAt", "desc").onSnapshot(snapshot => {
    appTableBody.innerHTML = "";
    snapshot.forEach(doc => {
      const a = doc.data();
      appTableBody.innerHTML += `
        <tr>
          <td>${a.name}</td>
          <td>${a.job}</td>
          <td>${a.email}</td>
          <td>${a.phone}</td>
          <td>${a.country}</td>
        </tr>
      `;
    });
  });

  // SEARCH
  searchInput.addEventListener("input", () => {
    const val = searchInput.value.toLowerCase();
    document.querySelectorAll("#appTable tbody tr").forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(val) ? "" : "none";
    });
  });

});

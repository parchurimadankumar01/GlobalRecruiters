const jobsRef = db.collection("jobs");
const appsRef = db.collection("applications");

const jobsList = document.getElementById("jobsList");
const appTableBody = document.querySelector("#appTable tbody");
const searchInput = document.getElementById("searchInput");

/* ================= ADD JOB ================= */
async function addJob() {
  const title = document.getElementById("jobRole").value.trim();
  const country = document.getElementById("jobCountry").value;
  const emergency = document.getElementById("emergency").checked;

  if (!title) {
    alert("Enter job title");
    return;
  }

  await jobsRef.add({
    title,
    country,
    emergency,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("jobRole").value = "";
  document.getElementById("emergency").checked = false;

  alert("Job added");
}

/* ================= LOAD JOBS ================= */
jobsRef.orderBy("createdAt", "desc").onSnapshot(snap => {
  jobsList.innerHTML = "";

  if (snap.empty) {
    jobsList.innerHTML = `<p class="text-muted">No jobs yet</p>`;
    return;
  }

  snap.forEach(doc => {
    const j = doc.data();
    jobsList.innerHTML += `
      <div class="card p-3" style="min-width:220px">
        <strong>${j.title}</strong>
        <div class="text-muted">${j.country}</div>
        ${j.emergency ? `<span class="badge bg-danger">15 Days</span>` : ""}
        <button class="btn btn-sm btn-outline-danger mt-2"
          onclick="jobsRef.doc('${doc.id}').delete()">
          Delete
        </button>
      </div>
    `;
  });
});

/* ================= LOAD APPLICATIONS ================= */
appsRef.orderBy("createdAt", "desc").onSnapshot(snap => {
  appTableBody.innerHTML = "";
  snap.forEach(doc => {
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

/* ================= SEARCH ================= */
searchInput.addEventListener("input", () => {
  const v = searchInput.value.toLowerCase();
  document.querySelectorAll("#appTable tbody tr").forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(v) ? "" : "none";
  });
});

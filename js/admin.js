// ==========================
// FIRESTORE REFERENCES
// ==========================
const jobsRef = db.collection("jobs");
const appsRef = db.collection("applications");

const jobsList = document.getElementById("jobsList");
const appTableBody = document.querySelector("#appTable tbody");
const searchInput = document.getElementById("searchInput");

// ==========================
// ADD JOB
// ==========================
async function addJob() {
  const role = document.getElementById("jobRole").value.trim();
  const country = document.getElementById("jobCountry").value;
  const emergency = document.getElementById("emergency").checked;

  if (!role) {
    alert("Enter Job Role");
    return;
  }

  await jobsRef.add({
    title: role,
    country,
    emergency,
    createdAt: firebase.firestore.Timestamp.now()
  });

  document.getElementById("jobRole").value = "";
  document.getElementById("emergency").checked = false;

  alert("Job Added Successfully");
}

// ==========================
// LOAD JOBS (LIVE)
// ==========================
function loadJobs() {
  jobsRef.orderBy("createdAt", "desc").onSnapshot(snapshot => {
    jobsList.innerHTML = "";

    snapshot.forEach(doc => {
      const job = doc.data();

      jobsList.innerHTML += `
        <div class="card p-3 shadow-sm" style="min-width:240px">
          <strong>${job.title}</strong>
          <div class="text-muted">${job.country.toUpperCase()}</div>

          ${
            job.emergency
              ? `<span class="badge bg-danger mt-2">Emergency • 15 Days</span>`
              : `<span class="badge bg-success mt-2">Normal</span>`
          }

          <button class="btn btn-sm btn-outline-danger mt-2"
            onclick="deleteJob('${doc.id}')">
            Delete
          </button>
        </div>
      `;
    });

    if (snapshot.empty) {
      jobsList.innerHTML = `<p class="text-muted">No jobs yet</p>`;
    }
  });
}

// ==========================
// DELETE JOB
// ==========================
async function deleteJob(id) {
  if (!confirm("Delete this job?")) return;
  await jobsRef.doc(id).delete();
}

// ==========================
// LOAD APPLICATIONS
// ==========================
function loadApplications() {
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
          <td>${a.country || "-"}</td>
        </tr>
      `;
    });
  });
}

// ==========================
// SEARCH APPLICATIONS
// ==========================
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  document.querySelectorAll("#appTable tbody tr").forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(value)
      ? ""
      : "none";
  });
});

// ==========================
// EXPORT EXCEL
// ==========================
function exportExcel() {
  let csv = "Name,Job,Email,Phone,Country\n";

  document.querySelectorAll("#appTable tbody tr").forEach(row => {
    const cols = row.querySelectorAll("td");
    csv += [...cols].map(c => `"${c.innerText}"`).join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "applications.csv";
  a.click();
}

// ==========================
// INIT
// ==========================
loadJobs();
loadApplications();

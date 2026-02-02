const jobsRef = db.collection("jobs");
const appsRef = db.collection("applications");

const jobsList = document.getElementById("jobsList");
const appTable = document.querySelector("#appTable tbody");
const searchInput = document.getElementById("searchInput");

// ADD JOB
async function addJob() {
  const title = jobRole.value.trim();
  const country = jobCountry.value;
  const emergency = emergency.checked;

  if (!title) return alert("Enter job title");

  await jobsRef.add({
    title,
    country,
    emergency,
    createdAt: firebase.firestore.Timestamp.now()
  });

  jobRole.value = "";
  emergency.checked = false;
}

// LOAD JOBS
jobsRef.orderBy("createdAt", "desc").onSnapshot(snap => {
  jobsList.innerHTML = "";
  snap.forEach(doc => {
    const j = doc.data();
    jobsList.innerHTML += `
      <div class="card p-3" style="min-width:220px">
        <b>${j.title}</b>
        <div>${j.country.toUpperCase()}</div>
        ${j.emergency ? `<span class="badge bg-danger">Emergency</span>` : ""}
        <button class="btn btn-sm btn-danger mt-2"
          onclick="jobsRef.doc('${doc.id}').delete()">Delete</button>
      </div>
    `;
  });
});

// LOAD APPLICATIONS
appsRef.orderBy("createdAt", "desc").onSnapshot(snap => {
  appTable.innerHTML = "";
  snap.forEach(doc => {
    const a = doc.data();
    appTable.innerHTML += `
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
  const v = searchInput.value.toLowerCase();
  document.querySelectorAll("#appTable tbody tr").forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(v) ? "" : "none";
  });
});

// EXPORT
function exportExcel() {
  let csv = "Name,Job,Email,Phone,Country\n";
  document.querySelectorAll("#appTable tbody tr").forEach(r => {
    csv += [...r.children].map(td => `"${td.innerText}"`).join(",") + "\n";
  });

  const blob = new Blob([csv]);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "applications.csv";
  a.click();
}

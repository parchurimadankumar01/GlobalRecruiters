// ==========================
// FIRESTORE REFERENCES
// ==========================
const jobsRef = db.collection("jobs");
const jobsList = document.getElementById("jobsList");

// ==========================
// ADD JOB TO FIRESTORE
// ==========================
async function addJob() {
  const role = document.getElementById("jobRole").value.trim();
  const country = document.getElementById("jobCountry").value;
  const emergency = document.getElementById("emergency").checked;

  if (!role) {
    alert("Please enter Job Role");
    return;
  }

  try {
    await jobsRef.add({
      title: role,
      country: country,
      emergency: emergency,
      createdAt: firebase.firestore.Timestamp.now()
    });

    // Reset form
    document.getElementById("jobRole").value = "";
    document.getElementById("emergency").checked = false;

    alert("Job added successfully");
  } catch (error) {
    console.error("Error adding job:", error);
    alert("Failed to add job");
  }
}

// ==========================
// DELETE JOB
// ==========================
async function deleteJob(jobId) {
  if (!confirm("Are you sure you want to delete this job?")) return;

  try {
    await jobsRef.doc(jobId).delete();
    alert("Job deleted");
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete job");
  }
}

// ==========================
// LOAD JOBS IN ADMIN PANEL
// ==========================
function loadJobs() {
  jobsRef
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      jobsList.innerHTML = "";

      snapshot.forEach(doc => {
        const job = doc.data();

        jobsList.innerHTML += `
          <div class="card p-3 shadow-sm" style="min-width:240px">
            <strong>${job.title}</strong>

            <div class="text-muted mt-1">
              ${job.country.toUpperCase()}
            </div>

            ${
              job.emergency
                ? `<span class="badge bg-danger mt-2">Emergency • 15 Days Visa</span>`
                : `<span class="badge bg-success mt-2">Normal Process</span>`
            }

            <button
              class="btn btn-sm btn-outline-danger mt-2"
              onclick="deleteJob('${doc.id}')"
            >
              Delete
            </button>
          </div>
        `;
      });

      if (snapshot.empty) {
        jobsList.innerHTML = `<p class="text-muted">No jobs added yet</p>`;
      }
    });
}

// ==========================
// INIT
// ==========================
loadJobs();

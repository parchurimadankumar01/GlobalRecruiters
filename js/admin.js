const jobsRef = db.collection("jobs");
const appsRef = db.collection("applications");
const countriesRef = db.collection("countries");

const jobsList = document.getElementById("jobsList");
const appTableBody = document.querySelector("#appTable tbody");
const searchInput = document.getElementById("searchInput");
const jobCountry = document.getElementById("jobCountry");

/* ADD COUNTRY */
async function addCountry() {
  const name = countryName.value.trim();
  const code = countryCode.value.trim().toLowerCase();
  if (!name || !code) return alert("Fill country fields");

  await countriesRef.add({ name, code });
  alert("Country added");
}

/* LOAD COUNTRIES */
countriesRef.onSnapshot(snap => {
  jobCountry.innerHTML = "";
  snap.forEach(d => {
    const c = d.data();
    jobCountry.innerHTML += `<option value="${c.code}">${c.name}</option>`;
  });
});

/* ADD JOB */
async function addJob() {
  if (!jobRole.value) return alert("Enter job");

  await jobsRef.add({
    title: jobRole.value,
    country: jobCountry.value,
    emergency: emergency.checked,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  jobRole.value = "";
  emergency.checked = false;
}

/* LOAD JOBS */
jobsRef.onSnapshot(snap => {
  jobsList.innerHTML = "";
  snap.forEach(d => {
    const j = d.data();
    jobsList.innerHTML += `
      <div class="card p-3" style="min-width:200px">
        <b>${j.title}</b>
        <small>${j.country}</small>
      </div>`;
  });
});

/* LOAD APPLICATIONS */
appsRef.onSnapshot(snap => {
  appTableBody.innerHTML = "";
  snap.forEach(d => {
    const a = d.data();
    appTableBody.innerHTML += `
      <tr>
        <td>${a.name}</td>
        <td>${a.job}</td>
        <td>${a.email}</td>
        <td>${a.phone}</td>
        <td>${a.country}</td>
      </tr>`;
  });
});

/* SEARCH */
searchInput.addEventListener("input", () => {
  [...appTableBody.rows].forEach(r =>
    r.style.display = r.innerText.toLowerCase().includes(searchInput.value.toLowerCase()) ? "" : "none"
  );
});

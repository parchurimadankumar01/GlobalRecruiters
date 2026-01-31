const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

jobForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const country = document.getElementById("country").value;
  const salary = document.getElementById("salary").value;

  const div = document.createElement("div");
  div.className = "job-card";
  div.innerHTML = `${title} – ${country} – ${salary}`;

  jobList.appendChild(div);
  jobForm.reset();
});

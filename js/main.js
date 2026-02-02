db.collection("countries").onSnapshot(snap => {
  const list = document.getElementById("countryList");
  const nav = document.getElementById("navCountries");

  if (!list || !nav) return;

  list.innerHTML = "";
  nav.innerHTML = `
    <li class="nav-item">
      <a class="nav-link active" href="index.html">Home</a>
    </li>`;

  snap.forEach(doc => {
    const c = doc.data();

    // cards
    list.innerHTML += `
      <div class="col-md-3">
        <a href="country.html?country=${c.code}" class="text-decoration-none">
          <div class="country-card text-center p-4">
            <h4>${c.name}</h4>
          </div>
        </a>
      </div>`;

    // navbar
    nav.innerHTML += `
      <li class="nav-item">
        <a class="nav-link" href="country.html?country=${c.code}">
          ${c.name}
        </a>
      </li>`;
  });
});

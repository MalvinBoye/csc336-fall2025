async function loadWorld() {
    const res = await fetch("/world");
    const world = await res.json();

    const container = document.getElementById("world");
    const select = document.getElementById("person-select");

   
    container.innerHTML = "";
    select.innerHTML="";

    world.regions.forEach(region => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${region.name} (${region.climate})</h3>`;

        region.towns.forEach(town => {
            const p = document.createElement("p");
            p.innerHTML =`<b>${town.name}</b> - Population: ${town.population}`;
            div.appendChild(p);

            town.notable_people.forEach(person => {
            const personP = document.createElement("p");
            personP.textContent = ` -${person.name} - ${person.role}`;
            div.appendChild(personP);

            const option = document.createElement("option");
            option.value = person.name;
            option.textContent = person.name;
            select.appendChild(option);
        });
    });
    container.appendChild(div);
    });
}

document.getElementById("role-form").addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData (e.target);
    const data = Object.fromEntries(formData.entries ());

    const res = await fetch ("/changerole", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);

    loadWorld();

});

loadWorld();
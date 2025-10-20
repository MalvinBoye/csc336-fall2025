import * as fs from "fs";

const fileData = fs.readFileSync("world.json", "utf8");

const world = JSON.parse(fileData);

console.log("My first JSON World!! ");


world.regions.forEach( region => {
    console.log(`Region: ${region.name}  (${region.climate})`);

    region.towns.forEach(town => {
        console.log(`Town: ${town.name} - Population: ${town.population}`);

        town.notable_people.forEach(person => {
            console.log (`   -${person.name} - ${person.role}`);

            if (!person.items) return;

            person.items.forEach(item => {
                if (typeof item == "string"){
                    console.log(`   -${item}`);
                } else {
                    console.log (`     -${item.name} [Level: ${item.level}]`);
                }
            });
        });
    });
});
import express from "express";
import fs from "fs";

const app = express();

app.use(express.static("./public"));
app.use(express.json());

//Get
app.get("/world", async (req, res) => {
    // Read in the data, parse it into an object and send it over as json to the client
    const dataString = await fs.readFileSync("world.json", "utf-8");
    const dataObject = JSON.parse(dataString);
    res.json(dataObject);
});

//post ( Change role)
app.post("/changerole", async (req, res) => {
    // Read the file that contains all of the world info
    const worldData = await fs.readFileSync("./world.json", "utf-8");
    // As readFile brought in the data as a string, parse it into a JS object.
    const world = JSON.parse(worldData);

    // req.body is the json object sent to us from the client. 
    // NOTE: it was parsed automatically by express (that's what the app.use(express.json()); does above)
    const { name, newRole } = req.body;

    let personFound = false;
    
    for (let region of world.regions) {
        for (let town of region.towns) {
            for (let person of town.notable_people) {
                if (person.name === name) {
                    person.role = newRole;
                    personFound = true;
                }
            }
        }
    }

    if (!personFound) {
        return res.status(404).json({message: "Person Not FOund"});
    }

    // Write it back to file
    await fs.writeFileSync("world.json", JSON.stringify(world, null, 2));

    // Now that we've modified the world data, and written it back to file
    // send it back to the client.
    res.json({message: `Update ${name}'s role to ${newRole}`, world});
});


app.listen(3025, () => console.log("Server running on http://localhost:3025"));
import { jdrjrActor } from"./sheets/jdrjractor.js";
import { jdrjrActorSheet } from "./sheets/jdrjractorsheet.js";
import { jdrjrItem } from "./sheets/jdrjritem.js";
import { jdrjrItemSheet } from "./sheets/jdrjritemsheet.js";


Hooks.once("init", async function() {
    console.log("JDR-Jr | Initialisation du système JDR-Jr");
	CONFIG.Actor.documentClass = jdrjrActor;
    CONFIG.Item.documentClass = jdrjrItem;

    CONFIG.Combat.initiative = {
	    formula: "1d6",
	    decimals: 2
	};

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("jdrjr", jdrjrItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("jdrjr", jdrjrActorSheet, { makeDefault: true });
});


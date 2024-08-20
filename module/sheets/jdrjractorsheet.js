/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
 export class jdrjrActorSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
          classes: ["jdrjr", "sheet", "actor"],
          width: 1030, //defini la auteur et la largeurs de la fiche de perso
          height: 750,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        console.log(`jdrjr | Récupération du fichier html ${this.actor.type}-sheet.`);
        return `systems/jdrjr/templates/sheets/personnage-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);        
		if (this.actor.type == 'personnage' || this.actor.type == 'pnj' || this.actor.type == 'monstre') { //les différents types d'actor
			this._prepareCharacterItems(data);
		}
        console.log(data);
        return data;
    }
   
	_prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;

        // Initialize containers. Liste des différents items
        const inventaire = [];
        const sort = [];
        const arme = [];
        const faiblesse = [];
        const talent = [];
        
        // Iterate through items, allocating to containers. Tri des différents items
        for (let i of sheetData.items) {
          let item = i.items;
          i.img = i.img || DEFAULT_TOKEN;
          if (i.type === 'arme') {
            arme.push(i);
          }
          else if (i.type === 'talent') {
            talent.push(i);
          }
          else if (i.type === 'faiblesse') {
            faiblesse.push(i);
          }
          else if (i.type === 'objet') {
            inventaire.push(i);
          }
          else if (i.type === 'magie') {
            sort.push(i);
          }
        }
        inventaire.sort(function (a, b) {if (a.name < b.name) {return -1;} else {return 1;}});
        arme.sort(function (a, b) {if (a.name < b.name) {return -1;} else {return 1;}});
        sort.sort(function (a, b) {if (a.name < b.name) {return -1;} else {return 1;}});
        // Assign and return, assination des items
        actorData.inventaire = inventaire;
        actorData.sort = sort;
        actorData.arme = arme;
        actorData.talent = talent;
        actorData.faiblesse = faiblesse;
    }


    activateListeners(html){
        super.activateListeners(html);
        //edition items
        html.find('.item-edit').click(this._onItemEdit.bind(this));

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.delete();
            li.slideUp(200, () => this.render(false));
        });

        //Jet de des
        html.find('.jetdedes').click(this._onRoll.bind(this));

    }


    getItemFromEvent = (ev) => {
        const parent = $(ev.currentTarget).parents(".item");
        return this.actor.items.get(parent.data("itemId"));
    }

    _onItemEdit(event){
        const item = this.getItemFromEvent(event);
        item.sheet.render(true);
    }

    //lancer de dés
    async _onRoll(event){
        let monJetDeDes = event.target.dataset["dice"];
        let nbdes = event.target.dataset["attdice"];
        const name = event.target.dataset["name"];
        const jetdeDesFormule = nbdes+"d6"; //formule du lancer

        let r = await new Roll(nbdes+"d6").evaluate();
        console.log(r)
        var table=r.terms[0].results
        console.log(table)
        var total='';
        let z='';
        for (var i = table.length - 1; i >= 0; i--) {
                z =table[i].result;
                console.log(z)
                let color="#23221d";
                if(z>=5){
                    color="green"
                }
                total+='<span style="color: #fff;background:'+color+' ;padding:2px 5px;margin-left:3px">'+z+'</span>';        
        } 
        
        var succes=""; 

        const texte = '<span style="font-size: 1.2em;">Jet de ' + name + ' : ' +total+'</span>' ;//+" - "+succes+" réussite(s)";
        await r.toMessage({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: texte
        });
    }
}
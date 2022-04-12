export class jdrjrActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["jdrjr", "sheet", "actor"],
          //template: "systems/jdrjr/templates/actor/personnage-sheet.html",
          width: 1000,
          height: 800,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        console.log(`jdrjr | Récupération du fichier html ${this.actor.data.type}-sheet.`);
        return `systems/jdrjr/templates/sheets/${this.actor.data.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        var poidsactor='';
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);        
		if (this.actor.data.type == 'personnage' || this.actor.data.type == 'pnj' || this.actor.data.type == 'monstre') {
			this._prepareCharacterItems(data);
		}
        console.log(data);
        return data;
    }
   
	_prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;

        // Initialize containers.
        const inventaire = [];
        const sort = [];
        const arme = [];
        const faiblesse = [];
        const talent = [];
        
        // Iterate through items, allocating to containers
        // let totalWeight = 0;
        for (let i of sheetData.items) {
          let item = i.data;
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

        // Assign and return
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
        

        /*generateur d'histoire
        html.find('.generator').on('click',function(){
            var age = Math.floor((Math.random() * 34) + 16);
            var items0=["à  Oklata","à  Aelath","à  Dwaliwyr","à  Yie","à  Nydiag'","à  Weitha","à  Crilanydd","à  Cem","à  Coalith","à  Natura","à  Vivaqua","à  Limenido","à  Eraliwin","à  Atlantide","à  Galerrakath","dans un petit village paisible","dans un camp militaire à  l'écart de la ville","sur les routes, voyageant de ville en ville","à  Ralich"];
            var items1 = ["tu apprends ton lourd passé","tu quittes ton clan pour voyager et découvrir le monde","tu te fais capturer par un clan ennemi","tu es recruté par un étrange personnage pour une certaine mission","un ami proche se fait enlever", "tu consultes un oracle, qui te fait des étranges révélations", "ton père meurt durant une bataille", "tu te fais kidnapper par un inconnu", "tu es porté disparu durant une bataille", "est victime d'une tentative d’assassinat","durant un accident tu perds la mémoire","tu découvres un mystérieux artefact","tu découvres en toi une foi inébranlable en ton dieu","ton frère a disparu"];
            var items2 = ["de ramener la paix au sein de ton clan","de rechercher un moyen que ton nom reste dans les mémoires","de tuer les personnes qui sont responsables de tes malheurs","de sauver se monde ronger par la guerre","d'anéantir les personnes que tu juge trop faible","de partir en quête d'aventure","de te venger du mal qui ta été fait","de partir en quête de savoir","de partir t'enrichir","de devenir le plus fort de ton clan","de rechercher l'amour","de propager ta foi aux incrédules","de devenir connu","d'enquêter sur des événements étranges"];
            var items3 =["fasciné par la culture des autres clans","animé par une soif de connaissance","expert dans ton domaine","par amour propre","pour fuir ton destin","après en avoir longuement réfléchit","par amour","par envie","par Vengeance","par nécessité","par jalousie","par curiosité","par choix","après un tragique événement","par colère"];
            var items4 = ["Lexrung, tu es un esprit libre et indépendant.","Lexegar, tu es altruiste  et tu te sens obliger d'aider son prochain.","Lexerha, tu es pacifique et préfères trouver des solutions non béliqueses aux conflits.","Lexas, tu es de nature réfléchit et calme, leur conseil est toujours dis avec sagesse.","Lexweqi, tu es un brillant chasseur, tu arrives facilement à  pister leur proie.","Lexaly, tu es vif d'esprit et tu réagis rapidement en toutes circonstances.","Lexoulha, tu es trés social aimant profiter des plaisirs de la vie.","Lexora, tu as une grande volonté pour accomplir les choses, tu es tétu et déterminé.","Lexauch, tu es superstitieux, tu aimes t'en remettre au hazard et à  la chance.","Lexaxas, tu es nerveux et souvent en colère. Tu choisis souvent la violence pour résoudre les problèmes.","Lexang, tu es un bon artisan, tu disposes d'une grande aisance dans la création d'objet en tous genres.","Lexug, tu es rancunié, tu n'oublies pas le mal qui leur a été fait et n’hésites pas à  le faire payer.","Lexoelia, tu fais facilement confiance aux autres, la fraternité est l'une de leur grande valeur.","Lexaug tu es protecteur avec les membres de ta famille et de ton foyer."];        var signeastro= items[Math.floor(Math.random()*items.length)];

            var nomville=items0[Math.floor(Math.random()*items0.length)];
            var evenement = items1[Math.floor(Math.random()*items1.length)];
            var tonchoix=items2[Math.floor(Math.random()*items2.length)];
            var motivation  = items3[Math.floor(Math.random()*items3.length)];
            var signeastro = items4[Math.floor(Math.random()*items4.length)];
            var textgen ="Agé de "+age+" tu fais ta vie "+nomville+". Jusqu'au jour où "+evenement+", "+motivation+" tu décide "+tonchoix+". Né durant le mois de "+signeastro;;
            html.find('.histoire').val(textgen);
        });*/

        //Jet de des
        html.find('.jetdedes').click(this._onRoll.bind(this)); 

        //monstre level up
        $('.levelup').on('click',function(){
            var lvl=html.find('.lvl').val();
            var pv=html.find('.hpmax').val();
            var ps=html.find('.psymax').val();
            pv=parseInt(pv)+3;
            ps=parseInt(ps)+3;

            html.find('.hpmax').val(pv);
            html.find('.psymax').val(ps);
            var bonus=0;
            if(lvl<=3){
                bonus=1;
            }else {
                bonus=0;
            }
            var ar=html.find('.protection').val();
            if(ar==undefined||ar==""){
                ar=0;
            }
            ar=parseInt(ar)+(parseInt(bonus));
            
            html.find('.protection').val(ar);

            var degat=html.find('.degat').val();
            var fixe = degat.split('+');
            var number=fixe[1];
            if(number==undefined||number==""){
                number=0;
            }
            if(lvl<=5){
                number=parseInt(number)+1;
            }
            html.find('.degat').val(fixe[0]+'+'+number);
            lvl++;
            html.find('.lvl').val(lvl);
        });

    }


    getItemFromEvent = (ev) => {
        const parent = $(ev.currentTarget).parents(".item");
        //return this.actor.getOwnedItem(parent.data("itemId"));
        return this.actor.items.get(parent.data("itemId"));
    }

    _onItemEdit(event){
        const item = this.getItemFromEvent(event);
        item.sheet.render(true);
    }

    //lancer de dés
    _onRoll(event){
        let monJetDeDes = event.target.dataset["dice"];
        let nbdes = event.target.dataset["attdice"];
        const name = event.target.dataset["name"];
        const jetdeDesFormule = nbdes+"d6";

        let r = new Roll(nbdes+"d6");
        var roll=r.evaluate({"async": false});
        let retour=r.result; 
        var succes="";
        /*if(retour>95){
            succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec critique</h4>";
        }else if(retour<critique){
            succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite critique</h4>";
        }else if(retour<=inforesult){
            succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite</h4>";
        }else{
            succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec</h4>";
        }*/

        const texte = "Jet de " + name + " : " +jetdeDesFormule ;//+" - "+succes+" réussite(s)";
        //roll.roll().toMessage({
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });
    }
}
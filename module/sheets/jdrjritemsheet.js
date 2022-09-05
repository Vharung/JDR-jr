/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Item}
 */
 export class jdrjrItemSheet extends ItemSheet{
    get template(){
        console.log(`jdrjr | Récupération du fichier html ${this.item.type}-sheet.`);

        return `systems/jdrjr/templates/sheets/${this.item.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);

        return data;
    }
}
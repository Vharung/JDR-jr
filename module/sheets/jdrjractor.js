export class jdrjrActor extends Actor {
  prepareData() {
    super.prepareData();
    const actorData = this.system;
    const data = actorData;
    const flags = actorData.flags;
  	if (actorData.type === 'personnage') this._preparePJData(actorData);
  }

  _preparePJData(actorData) {
    const data = actorData.system;
    console.log(`jdrjr | Préparation Data PJ.\n`);
    console.log(data);    
  }

  prepareBaseData() {
  }

  prepareDerivedData() {
  }
}
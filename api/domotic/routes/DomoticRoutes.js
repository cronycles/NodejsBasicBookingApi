export default class DomoticRoutes {
  #domoticController;

  constructor(domoticController, app) {
    this.#domoticController = domoticController;
    this.defineRoutes(app);
  }

  defineRoutes = (app) => {
    app.route('/open-door')
      .post(this.#domoticController.openDoor);
  }

}
import CLIENT_DOMOTIC_ERRORS from './sharedEntities/DomoticErrorsConstants';
import SERVICE_DOMOTIC_ERRORS from '../services/entities/DomoticServiceErrorsConstants';
import DomoticDoorEntity from '../services/entities/DomoticDoorEntity';

export default class DomoticController {
  #domoticService;

  constructor(domoticService) {
    this.#domoticService = domoticService;
  }

  openDoor = (req, res) => {
    try {
      if (this.#isAValidRequest(req)) {
        let requestEntity = new DomoticDoorEntity(req.params.id, req.body.code);
        let responseEntity = this.#domoticService.openDoor(requestEntity);

        const objectResponse = this.#createObjectResponseFromServiceEntity(responseEntity);
        res.status(objectResponse.status).json(objectResponse.data);
      }
      else {
        res.status(400).json(null);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(null);
    }
  };


  #isAValidRequest(request) {
    try {
      let outcome = false;

      if (request != null
        && request != {}
        && request.body != {}
        && request.params != null
        && request.params.id != null
        && request.params.id > 0
        && request.body.code != null
        && request.body.code > 0) {
        outcome = true;
      }
      return outcome;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  #createObjectResponseFromServiceEntity(domoticEntity) {
    try {
      let outcome = {}

      if (domoticEntity) {
        if (domoticEntity.error) {
          outcome = this.#createErrorResponseFromServiceError(domoticEntity.error);
        }
        else {
          outcome = {
            status: 200,
            data: {}
          }
        }
      }
      return outcome;

    } catch (e) {
      console.log(e);
      return {
        status: 500
      }
    }
  }

  #createErrorResponseFromServiceError(serviceError) {
    let outcome = {
      status: 200,
      data: {
        error: {
          id: CLIENT_DOMOTIC_ERRORS.UNKNOWN,
          message: "Unknown error"
        }
      }
    }
    if (serviceError) {
      switch (serviceError) {
        case SERVICE_DOMOTIC_ERRORS.INVALID_INPUTS:
          outcome.status = 400
          break;
          case SERVICE_DOMOTIC_ERRORS.INVALID_DOOR_ID:
            outcome.data.error.id = CLIENT_DOMOTIC_ERRORS.INVALID_DOOR_ID;
            outcome.data.error.message = "door does not exists" 
            break;
        case SERVICE_DOMOTIC_ERRORS.INVALID_CODE:
          outcome.data.error.id = CLIENT_DOMOTIC_ERRORS.INVALID_CODE;
          outcome.data.error.message = "Invalid code"
          break;
        default:
          outcome.data.error.id = CLIENT_DOMOTIC_ERRORS.UNKNOWN;
          outcome.data.error.message = "Unknown error"
          break;
      }
    }
    return outcome;
  }

}
import CLIENT_DOMOTIC_ERRORS from './sharedEntities/DomoticErrorsConstants';
import SERVICE_DOMOTIC_ERRORS from '../services/entities/DomoticServiceErrorsConstants';

export default class DomoticController {
  #domoticService;

  constructor(domoticService) {
    this.#domoticService = domoticService;
  }
  openDoor = (req, res) => {
    try {
      var request = req.body;
      
      if (this.#isAValidRequest(request)) {
        
        let domoticServiceResponseEntity = this.#domoticService.openDoor(request.code);

        const objectResponse = this.#createObjectResponseFromServiceEntity(domoticServiceResponseEntity);
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
        && request.code
        && request.code > 0) {
        outcome = true;
      }
      return outcome;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  #createObjectResponseFromServiceEntity(domoticServiceResponseEntity) {
    try {
      let outcome = {}

      if (domoticServiceResponseEntity) {
        if (domoticServiceResponseEntity.error) {
          outcome = this.#createErrorResponseFromServiceError(domoticServiceResponseEntity.error);
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
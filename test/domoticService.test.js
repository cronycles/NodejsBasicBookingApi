import app from "../server.js";
import request from 'supertest';
import chai from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';

chai.use(spies);
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;

import DomoticRepository from "../api/domotic/repositories/DomoticRepository";
import DomoticService from '../api/domotic/services/DomoticService'
import DOMOTIC_SERVICE_CONSTANTS from '../api/domotic/services/entities/DomoticServiceErrorsConstants'
import DomoticDoorEntity from "../api/domotic/services/entities/DomoticDoorEntity";

describe('DomoticService Test Suite', () => {
    const INVALID_INPUTS = [
        null,
        undefined
    ];
    INVALID_INPUTS.forEach((inputEntity) => {
        describe('openDoor(accessCode) with invalid InputEntity', () => {
            let service;
            beforeEach(() => {
                service = new DomoticService(new DomoticRepository());
            });

            it('always returns an invalid inputs error', (done) => {
                const domoticResponseEntity = service.openDoor(inputEntity);
                expect(domoticResponseEntity).not.null;
                expect(domoticResponseEntity).not.null;
                expect(domoticResponseEntity).to.be.an.instanceOf(DomoticDoorEntity);
                expect(domoticResponseEntity.error).is.equal(DOMOTIC_SERVICE_CONSTANTS.INVALID_INPUTS);
                done();
            });
        });
    });

    describe('openDoor(accessCode) with valid access code', () => {
        let repository;
        let service;
        beforeEach(() => {
            repository = new DomoticRepository(repository);
            service = new DomoticService(repository);
        });

        it('it always calls repository.isAccessCodeValid() function ', (done) => {
            sinon.stub(repository, 'isAccessCodeValid').resolves();
            let domoticDoorEntity = new DomoticDoorEntity(1, 123456);
            service.openDoor(domoticDoorEntity);
            sinon.assert.calledOnce(repository.isAccessCodeValid);
            done();
        });
    });

    describe('openDoor(accessCode) with valid access code', () => {
        let repository;
        let service;
        beforeEach(() => {
            repository = new DomoticRepository(repository);
            service = new DomoticService(repository);
        });

        it('it return an entity with no errors ', (done) => {
            sinon.stub(repository, 'isAccessCodeValid').returns(true);
            let domoticDoorEntity = new DomoticDoorEntity(1, 123456);
            let domoticResponseEntity = service.openDoor(domoticDoorEntity);
            expect(domoticResponseEntity).not.null;
            expect(domoticResponseEntity).to.be.an.instanceOf(DomoticDoorEntity);
            expect(domoticResponseEntity.error).not.exist;
            done();
        });
    });

});
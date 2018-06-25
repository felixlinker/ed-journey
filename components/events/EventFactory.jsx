
import { EventEmitter } from 'events';
import autoBind from 'auto-bind';
import defaultsDeep from 'lodash/defaultsDeep';
import createMapper from './eventSpecs/Mapper';

import LocationSpec from './eventSpecs/Location';
import ApproachBodySpec from './eventSpecs/ApproachBody';
import DockedSpec from './eventSpecs/Docked';
import FSDJumpSpec from './eventSpecs/FSDJump';

class EventFactory extends EventEmitter {

    constructor() {
        super();
        autoBind(this);

        let dockedMapper = createMapper(this, DockedSpec);
        this.handlers = {
            'Location': createMapper(this, LocationSpec),
            'ApproachBody': createMapper(this, ApproachBodySpec),
            'Docked': (event) => {
                dockedMapper(event);
                this.location.station.docked = true;
            },
            'FSDJump': createMapper(this, FSDJumpSpec),
            'Undocked': () => { this.location.station.docked = false; },
            'Liftoff': (event) => {
                if (event.PlayerControlled) {
                    this.location.body.latitude = null;
                    this.location.body.longitude = null;
                }
            },
            'Touchdown': (event) => {
                if (event.PlayerControlled) {
                    this.location.body.latitude = event.Latitude;
                    this.location.body.longitude = event.Longitude;
                }
            },
        };

        // TODO: handle super cruise
        this.location = {
            system: {
                address: null,
                name: null,
                pos: null,
                controlling: null,
                economy: null,
                economySecondary: null,
                security: null,
                population: null,
            },
            body: {
                id: null,
                name: null,
                type: null,
                latitude: null,
                longitude: null,
            },
            station: {
                name: null,
                type: null,
                marketId: null,
                controlling: null,
                economy: null,
                economies: [],
                entryDist: null,
                services: [],
                docked: null,
            },
            factions: [],
        };
    }

    consume(event) {
        let handler = this.handlers[event.event];
        if (handler) {
            handler(event);
        }

        return this.createEvent(event);
    }

    createEvent(event) {
        let location = defaultsDeep({}, this.location);
        event._state = {
            location: location,
        };
        return event;
    }
}

export default EventFactory;

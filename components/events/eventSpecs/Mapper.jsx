
import set from 'lodash/set';
import mapValues from 'lodash/mapValues';
import keys from 'lodash/keys';

function createMapper(target, spec) {
    spec = mapValues(spec, v => {
        if (Array.isArray(v)) {
            return v;
        } else {
            return {
                dest: v.dest,
                map: createMapper(undefined, v.map),
            };
        }
    });

    return function(event) {
        // create new object if none is given
        let targetRef = target ? target : {};

        keys(spec).forEach(key => {
            let dest = spec[key];
            let data = event[key];
            if (!data) {
                return;
            }

            if (!Array.isArray(dest)) {
                dest = spec[key].dest;
                let mapper = spec[key].map;
                if (Array.isArray(data)) {
                    data = data.map(mapper);
                } else {
                    data = mapper(data);
                }
            }
            set(targetRef, dest, data);
        });

        return targetRef;
    };
};

export default createMapper;

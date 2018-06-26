
import keys from 'lodash/keys';

function checkValue(key, spec, event) {
    let specType = typeof spec;
    let value = event[key];
    if (specType === 'boolean' && spec) {
        return value.toString();
    }
    if (specType === 'function') {
        return spec(value);
    }
    if (specType === 'string') {
        return event[spec];
    }
    if (Array.isArray(spec)) {
        return spec.map(subSpec => checkValue(key, subSpec, event))
            .join(', ');
    }
}

export default function(reprSpec) {
    return function(event) {
        return keys(reprSpec).filter(key => event[key])
            .map(key => [key, checkValue(key, reprSpec[key], event)]);
    }
}

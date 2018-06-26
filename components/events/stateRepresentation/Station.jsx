
export default {
    'name': true,
    'type': true,
    'controlling': true,
    'economies': (val) => val.map(e => e.Name_Localised).join(', '),
    'services': (val) => val.join(', '),
};

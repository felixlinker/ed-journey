
export default {
    'StarSystem': ['location', 'system', 'name'],
    'SystemAddress': ['location', 'system', 'address'],
    'StarPos': ['location', 'system', 'pos'],
    'SystemFaction': ['location', 'system', 'controlling'],
    'SystemEconomy': ['location', 'system', 'economy'],
    'SystemSecondEconomy': ['location', 'system', 'economySecondary'],
    'SystemSecurity': ['location', 'system', 'security'],
    'Population': ['location', 'system', 'population'],
    'Factions': {
        'dest': ['location', 'factions'],
        'map': {
            'Name': ['name'],
            'FactionState': ['state'],
            'Government': ['government'],
            'Influence': ['influence'],
            'PendingStates': ['pending'],
            'RecoveringStates': ['recovering'],
        },
    },
};

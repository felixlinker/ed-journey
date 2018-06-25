
export default {
    'StarSystem': ['location', 'system', 'name'],
    'SystemAddress': ['location', 'system', 'address'],
    'StarPos': ['location', 'system', 'pos'],
    'Body': ['location', 'body', 'name'],
    'BodyType': ['location', 'body', 'type'],
    'Latitude': ['location', 'body', 'latitude'],
    'Longitude': ['location', 'body', 'longitude'],
    'StationName': ['location', 'station', 'name'],
    'StationType': ['location', 'station', 'type'],
    'MarketID': ['location', 'station', 'marketId'],
    'SystemFaction': ['location', 'system', 'controlling'],
    'SystemEconomy': ['location', 'system', 'economy'],
    'SystemSecondEconomy': ['location', 'system', 'economySecondary'],
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

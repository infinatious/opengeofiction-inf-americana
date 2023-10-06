"use strict";
// Generate JSON output formatted as Wikidata output, to feed to
// getNetworkMetadata() in legend_control.js, so route networks can have
// their own names within the legend.
export function shieldNetworks() {
    const networks = [
        { "id": "Lutang:N", "name": "Lutang National Roads" },
        { "id": "Lutang:E", "name": "Lutang Expressways" },
        { "id": "Lutang:BB", "name": "Lutang: Bagong Bandila" },
        { "id": "Lutang:WS", "name": "Lutang: West Sundin" },
        { "id": "Lutang:KT", "name": "Lutang: Katumangan" },
        { "id": "Lutang:HU", "name": "Lutang: Huntsman" },
        { "id": "FSA:FS", "name": "FSA Motorways" },
        { "id": "FSA:TM", "name": "FSA: Tempache"}
    ];

    let processedNetworks = {
        "head": { "vars": ["value", "network", "networkLabel"] },
        "results": {
            "bindings": []
        }
    };

    networks.forEach(network => {
        processedNetworks.results.bindings.push({
            "network": {},
            "networkLabel": {
                "xml:lang": "en",
                "type": "literal",
                "value": network.name
            },
            "value": {
                "type": "literal",
                "value": network.id
            }
        })
    });
    return processedNetworks;
}

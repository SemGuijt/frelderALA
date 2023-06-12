fetch('./devices.json')
    .then((res) => res.json())
    .then((data) => {
        showDevices(data);
    });

function showDevices(data) {
    const container = document.querySelector('.container');
    const template = document.querySelector('.smart-card');


    // loop door alle devices
    for (const obj of data) {
        const friendlyName = obj.friendly_name;
        const clone = template.content.cloneNode(true);

        if (friendlyName === 'Coordinator') {
            continue;
        }

        addName(clone, friendlyName);

        checkBinaryFeature(obj)

        container.appendChild(clone);


    }
}

function addName(clone, friendlyName) {
    const devicesName = clone.querySelector('.devices-name');
    devicesName.textContent = friendlyName;
}


function checkBinaryFeature(obj) {
    const definition = obj.definition;

    if (definition && definition.exposes) {

        for (const expose of definition.exposes) {
            if (expose.features) {
                for (const feature of expose.features) {
                    if (feature.type === 'binary') {
                        console.log("test")
                        createLightswitch()
                    }
                }
            }
        }
    }
}




function createLightswitch() {
}

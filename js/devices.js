fetch('./devices.json')
    .then((res) => res.json())
    .then((data) => {
        showDevices(data);
    });

function showDevices(data) {
    // cloned de container en de kaart
    const container = document.querySelector('.container');
    const template = document.querySelector('.smart-card');
    // loop through all devices
    for (const device of data) {
        const friendlyName = device.friendly_name;
        const clone = template.content.cloneNode(true);

        generateRoomCards(friendlyName)

        if (friendlyName === 'Coordinator') {
            continue;
        }
        //voegt namen aan kaart
        addName(clone, friendlyName);
        container.appendChild(clone);
        // voegt lighswitch Toe
        addLightSwitch(device, clone, container, template);
    }
}

function addName(clone, friendlyName) {
    const devicesName = clone.querySelector('.devices-name');
    devicesName.textContent = friendlyName;
}

function addLightSwitch(device, clone, container, template) {
    const definition = device.definition;
    // kijkt of er een type binary is want dan => lightswitch
    if (definition && definition.exposes) {
        for (const expose of definition.exposes) {
            if (expose.features) {
                for (const feature of expose.features) {
                    if (feature.type === 'binary') {
                        createLightswitch(clone, container, device.friendly_name, template);
                    }
                }
            }
        }
    }
}

function createLightswitch(clone, container, friendlyName, template) {
    const switchTemplate = document.querySelector('.switch-template');
    const cloneSwitchTemplate = switchTemplate.content.cloneNode(true);
    const button = cloneSwitchTemplate.querySelector('.toggle');
    button.innerHTML = friendlyName;

    template.appendChild(cloneSwitchTemplate);

    document.querySelector('.toggle').onclick = (e) => {
        const state = 'toggle';
        const button_topic = document.querySelector('#toggle');
        const topic = button_topic.value;

        payload = {
            'topic': topic,
            'feature': { 'state': state }
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        fetch('http://192.168.0.100:8000/api/set', options)
        console.log("hi")
    };
}
// hakt de namen eraf voor de cotogery
function generateRoomCards(friendlyName) {
    let cuttedString = friendlyName.indexOf('/');
    let newstring = friendlyName.substring(0, cuttedString);

    console.log(newstring);
}

// generate images for cards
document.addEventListener('DOMContentLoaded', (event) => {
  fetch('./devices.json')
      .then((res) => res.json())
      .then((data) => {
          showDevices(data);
      });
});


function showDevices(data) {
  const container = document.querySelector('.container');
  const template = document.querySelector('.smart-card');
  let deviceCount = 0; // Add counter

  for (const device of data) {
      const friendlyName = device.friendly_name;
      if (friendlyName === 'Coordinator') continue;

      const clone = template.content.cloneNode(true);
      addName(clone, friendlyName);
      addLightSwitch(device, clone, container, template);
      container.appendChild(clone);

      deviceCount++; // Increment counter
      console.log(`Device ${deviceCount}: ${friendlyName}`);
  }
}




function addName(clone, friendlyName) {
    const devicesName = clone.querySelector('.devices-name');
    devicesName.innerText = friendlyName;
}

function addLightSwitch(device, clone, container, template) {
    const definition = device.definition;
    if (definition && definition.exposes) {
        for (const expose of definition.exposes) {
            if (expose.features) {
                for (const feature of expose.features) {
                    if (feature.type === 'binary') {
                        createLightswitch(clone, device.friendly_name);
                    }
                }
            }
        }
    }
}

function createLightswitch(clone, friendlyName) {
  const aanButton = clone.querySelector('#turn-on');
  const uitButton = clone.querySelector('#turn-off');
  
  aanButton.onclick = (e) => {
    console.log('Setting onclick event handler for Aan button');
    sendCommand(friendlyName, 'on');
};

uitButton.onclick = (e) => {
    console.log('Setting onclick event handler for Uit button');
    sendCommand(friendlyName, 'off');
};
}

function sendCommand(friendlyName, state) {
  console.log(`Button clicked! FriendlyName: ${friendlyName}, State: ${state}`);
}


// function sendCommand(friendlyName, state) {
//   const topic = friendlyName;
//   const payload = {
//       'topic': topic,
//       'feature': { 'state': state }
//   };
//   const options = {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payload)
//   };
//   fetch('http://192.168.0.100:8000/api/set', options);
// }


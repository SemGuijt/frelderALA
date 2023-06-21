document.addEventListener('DOMContentLoaded', (event) => {
  fetch('./devices.json')
      .then((res) => res.json())
      .then((data) => {
          showDevices(data);
      });
});


let deviceId = 1; // Plaats deviceId hier buiten de showDevices-functie

function showDevices(data) {
  const container = document.querySelector('.container');
  const template = document.querySelector('.smart-card');

  for (const device of data) {
    const friendlyName = device.friendly_name;
    if (friendlyName === 'Coordinator') continue;

    const clone = template.content.cloneNode(true);
    addName(clone, friendlyName);
    addLightSwitch(device, clone, container, template);
    
    // Wijs een unieke ID toe aan elk gekloond apparaat
    clone.querySelector('.card1').setAttribute('id', `device-${deviceId}`);
    deviceId++; // Verhoog het ID voor het volgende apparaat

    container.appendChild(clone);
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
  const Button = clone.querySelector('#doorsturen');

  Button.onclick = (e) => {
    navigateToDevicePage(deviceId, friendlyName); // Voeg friendlyName toe als argument bij het aanroepen van navigateToDevicePage
  };
  
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


function navigateToDevicePage(deviceId, friendlyName) {
  const devicePageUrl = `lamp.html?id=${deviceId}&name=${encodeURIComponent(friendlyName)}`;
  window.location.href = devicePageUrl;
}

document.querySelector('#turn-on').onclick = (e) => {
  changeState('on');
  e.target.classList.add('button-active');
  document.querySelector('#turn-off').classList.remove('button-active');
};

document.querySelector('#turn-off').onclick = (e) => {
  changeState('off');
  e.target.classList.add('button-active');
  document.querySelector('#turn-on').classList.remove('button-active');
};




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


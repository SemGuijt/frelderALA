function template1() {
    var contentContainer = document.getElementById('content-container');
    var template = document.getElementById('template1');
    var clone = document.importNode(template.content, true);
    contentContainer.innerHTML = '';
    contentContainer.appendChild(clone);
    document.getElementById('button2').addEventListener('click', template2);

}

function template2() {
    var contentContainer = document.getElementById('content-container');
    var template = document.getElementById('template2');
    var clone = document.importNode(template.content, true);
    contentContainer.innerHTML = '';
    contentContainer.appendChild(clone);

}



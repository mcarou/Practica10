'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById("butInstall");

//El evento ‘beforeinstallprompt’ se dispara solo cuando el manifest cumple 
//todos los requisitos mínimos necesarios y no hay ya una app instalada con ese nombre.
//En el callback hacemos visible el boton de instalación
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
function saveBeforeInstallPromptEvent(evt) {
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}

//Al pulsar click en el boton de instalación volvemos a ocultar dicho botón
installButton.addEventListener('click', installPWA);
function installPWA(evt) {
    deferredInstallPrompt.prompt();
    evt.srcElement.setAttribute('hidden', true);
    deferredInstallPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
            console.log("aceptado");
        } else {
            console.log("No aceptado");
        }
        deferredInstallPrompt = null;
    })
}

//Evento que se lanza al finalizar la instalación de la App
window.addEventListener('appinstalled', logAppInstalled);
function logAppInstalled(evt) {
    console.log("Instalada APP");
}

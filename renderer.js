const { ipcRenderer } = require('electron');

let step = 0;
const content = document.getElementById('content');
const stepDescription = document.getElementById('step-description');
const nextButton = document.getElementById('next-button');

nextButton.addEventListener('click', () => {
  step++;
  if (step === 1) {
    stepDescription.textContent = "Instalando AI_Hiroshi... Por favor espera.";
    nextButton.disabled = true;
    ipcRenderer.send('install');
  } else if (step === 2) {
    stepDescription.textContent = "¡Instalación completada! Presiona 'Finalizar' para cerrar.";
    nextButton.textContent = "Finalizar";
  } else {
    window.close();
  }
});

ipcRenderer.on('install-success', () => {
  stepDescription.textContent = "AI_Hiroshi se instaló correctamente.";
  nextButton.disabled = false;
});

ipcRenderer.on('install-failure', (event, errorMessage) => {
  stepDescription.textContent = `Error durante la instalación: ${errorMessage}`;
  nextButton.disabled = false;
});

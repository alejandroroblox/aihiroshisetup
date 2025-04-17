let step = 0;
const content = document.querySelector('.content');
const nextButton = document.getElementById('next-button');

nextButton.addEventListener('click', () => {
  step++;
  if (step === 1) {
    content.innerHTML = `
      <h2>Instalando AI Hiroshi...</h2>
      <p>Por favor espera mientras preparamos todo.</p>
    `;
    nextButton.disabled = true;

    // Simula la instalación con un retraso
    setTimeout(() => {
      content.innerHTML = `
        <h2>¡Instalación Completada!</h2>
        <p>Presiona "Finalizar" para completar el proceso.</p>
      `;
      nextButton.textContent = "Finalizar";
      nextButton.disabled = false;
    }, 3000); // Tiempo de instalación simulado
  } else if (step === 2) {
    content.innerHTML = `
      <h2>¡Gracias por instalar AI Hiroshi!</h2>
      <p>Cierra esta ventana para salir.</p>
    `;
    nextButton.style.display = 'none';
  }
});

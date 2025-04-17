// Selecciona el botón en la interfaz HTML
const nextButton1 = document.getElementById('next-button1');
const nextButton2 = document.getElementById('next-button2');
const installButton = document.getElementById('install-button');

// Manejo del flujo de instalación
let step = 0;
const content = document.querySelector('.content');

// Evento para el primer botón "Next"
nextButton1.addEventListener('click', () => {
  step++;
  content.innerHTML = `
    <h2>Bienvenido a la configuración de AI_Hiroshi</h2>
    <p>Haz clic en "Siguiente" para continuar al siguiente paso.</p>
    <button id="next-button2">Siguiente</button>
  `;

  // Añadimos el evento al siguiente botón dinámicamente
  document.getElementById('next-button2').addEventListener('click', () => {
    content.innerHTML = `
      <h2>Configuración completa</h2>
      <p>Haz clic en "Instalar" para generar el archivo de registro.</p>
      <button id="install-button">Instalar</button>
    `;

    // Añadimos el evento al botón "Instalar" dinámicamente
    document.getElementById('install-button').addEventListener('click', () => {
      // Contenido del archivo de registro para AI_Hiroshi
      const regContent = `
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\VOCALOID6\\Voicebanks\\AI_Hiroshi]
"VoicebankPath"="C:\\\\Program Files\\\\VOCALOID6\\\\Voicebanks\\\\AI_Hiroshi"
"VoicebankType"="Artificial Intelligence"
"CharacterName"="AI_Hiroshi"
"Version"="2.0.0"
"Language"="Japanese"
"SampleRate"="48000"
"ModelType"="Neural Network"
"Description"="Voicebank based on AI created by Alejandro for AI Hiroshi"
      `;

      // Crear el archivo utilizando Blob
      const blob = new Blob([regContent], { type: 'application/octet-stream' });

      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'AI_HIROSHI_Voicebank.reg';

      // Ejecutar la descarga del archivo
      link.click();

      // Liberar la URL del objeto después de la descarga
      URL.revokeObjectURL(link.href);

      // Confirmación en la consola
      console.log("Archivo de registro generado para AI_HIROSHI en VOCALOID6.");

      // Actualizar la interfaz
      content.innerHTML = `
        <h2>¡Instalación completa!</h2>
        <p>El archivo de registro se ha generado correctamente. Ejecútalo para finalizar la configuración.</p>
      `;
    });
  });
});

// Selecciona el botón en la interfaz HTML
const nextButton = document.getElementById('next-button');

// Evento al hacer clic en el botón
nextButton.addEventListener('click', () => {
  // Contenido del archivo de registro para AI_Hiroshi en la carpeta de Vocaloid6\Voicebanks
  const regContent = `
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\VOCALOID6\\Voicebanks\\AI_Hiroshi]
"InstallPath"="C:\\\\Program Files\\\\VOCALOID6\\\\Voicebanks\\\\AI_Hiroshi"
"Language"="Spanish"
"VoicebankName"="AI_Hiroshi_Voicebank"
"SampleRate"="44100"
"Version"="1.0.0"
"Description"="Voicebank AI Hiroshi configurado dentro de Vocaloid6"
  `;

  // Crear el archivo utilizando Blob
  const blob = new Blob([regContent], { type: 'application/octet-stream' });

  // Crear enlace para descargar el archivo
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'AI_Hiroshi_Voicebank.reg';

  // Ejecutar la descarga
  link.click();

  // Liberar la URL del objeto después de la descarga
  URL.revokeObjectURL(link.href);

  // Confirmación en la consola
  console.log("Archivo de registro de AI_Hiroshi generado dentro de Vocaloid6\\Voicebanks.");

  // Actualizar la interfaz del instalador
  const content = document.querySelector('.content');
  content.innerHTML = `
    <h2>¡Archivo Generado!</h2>
    <p>Por favor, ejecuta el archivo descargado para completar la configuración de AI_Hiroshi en Vocaloid6.</p>
  `;
});

// Selecciona el botón del HTML
const nextButton = document.getElementById('next-button');

// Añade el evento al botón
nextButton.addEventListener('click', () => {
  // Contenido del archivo .reg
  const regContent = `
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\AI_Hiroshi]
"InstallPath"="C:\\\\Program Files\\\\AI_Hiroshi"
"Version"="1.0.0"
`;

  // Crear un archivo Blob con el contenido del registro
  const blob = new Blob([regContent], { type: 'application/octet-stream' });

  // Crear un enlace para descargar el archivo
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'AI_Hiroshi_Setup.reg';

  // Simular un clic en el enlace para descargar el archivo
  link.click();

  // Liberar el recurso del archivo después de la descarga
  URL.revokeObjectURL(link.href);

  // Mensaje de confirmación en la consola
  console.log("Archivo .reg generado y descargado exitosamente.");
});

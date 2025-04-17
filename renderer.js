document.addEventListener("DOMContentLoaded", () => {
  // Variables para el flujo de instalación
  let step = 0;
  const content = document.querySelector('.content');

  // Selección del botón principal
  const nextButton1 = document.getElementById('next-button1');

  // Evento para el primer botón "Siguiente"
  nextButton1.addEventListener('click', () => {
    step++;
    content.innerHTML = `
      <h2>Bienvenido a la configuración de AI_Hiroshi</h2>
      <p>Haz clic en "Siguiente" para continuar al siguiente paso.</p>
      <button id="next-button2">Siguiente</button>
    `;

    // Agregar evento al segundo botón "Siguiente"
    document.getElementById('next-button2').addEventListener('click', () => {
      content.innerHTML = `
        <h2>Configuración Completa</h2>
        <p>Haz clic en "Instalar" para generar el archivo .zip con el voicebank.</p>
        <button id="install-button">Instalar</button>
      `;

      // Agregar evento para el botón "Instalar"
      document.getElementById('install-button').addEventListener('click', () => {
        // Contenido del archivo .reg
        const regContent = `
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\VOCALOID6\\Voicebanks\\AI_HIROSHI]
"VoicebankPath"="C:\\\\Program Files\\\\VOCALOID6\\\\Voicebanks\\\\AI_HIROSHI"
"VoicebankType"="Artificial Intelligence"
"CharacterName"="AI Hiroshi"
"Version"="2.0.0"
"Language"="Japanese"
"SampleRate"="48000"
"ModelType"="Neural Network"
"Description"="Voicebank based on AI created by Alejandro for AI Hiroshi"
        `;

        // Contenido de otros archivos
        const vvdContent = "Datos técnicos del archivo VVD.";
        const v6Content = "Configuraciones avanzadas para Vocaloid 6.";
        const datContent = "Archivo binario para uso interno.";
        const configContent = JSON.stringify({
          voicebank_name: "AI_Hiroshi",
          language: "Japanese",
          sample_rate: 48000,
          version: "2.0.0",
          description: "Voicebank based on AI created by Alejandro for AI Hiroshi"
        }, null, 2);
        const otoContent = `
[samples]
a.wav=0,500,100,300,400
e.wav=0,400,80,200,300
i.wav=0,450,90,250,350
o.wav=0,420,85,220,320
u.wav=0,430,95,230,330
        `;

        // Crear el archivo .zip usando JSZip
        const zip = new JSZip();
        zip.file("AI_HIROSHI_Voicebank.reg", regContent);
        zip.file("AI_HIROSHI.vvd", vvdContent);
        zip.file("AI_HIROSHI.v6", v6Content);
        zip.file("AI_HIROSHI.dat", datContent);
        zip.file("config.json", configContent);
        zip.file("oto.ini", otoContent);
        zip.file("README.txt", "Este es el voicebank AI_Hiroshi creado por Alejandro.");

        // Carpeta de muestras
        const samples = zip.folder("samples");
        samples.file("a.wav", "Contenido simulado para a.wav");
        samples.file("e.wav", "Contenido simulado para e.wav");
        samples.file("i.wav", "Contenido simulado para i.wav");
        samples.file("o.wav", "Contenido simulado para o.wav");
        samples.file("u.wav", "Contenido simulado para u.wav");

        // Generar y descargar el archivo .zip
        zip.generateAsync({ type: "blob" }).then((content) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(content);
          link.download = 'AI_HIROSHI_Voicebank.zip';
          document.body.appendChild(link); // Asegurar que el enlace esté en el DOM
          link.click(); // Simular clic en el enlace
          document.body.removeChild(link); // Eliminar el enlace después de la descarga

          // Confirmación en la interfaz
          content.innerHTML = `
            <h2>¡Instalación Completa!</h2>
            <p>El archivo .zip del voicebank se ha generado exitosamente. Extrae el contenido y sigue las instrucciones.</p>
          `;
          console.log("Archivo .zip generado y descargado correctamente.");
        }).catch((error) => {
          console.error("Error al generar el archivo .zip: ", error);
          content.innerHTML = `
            <h2>¡Error!</h2>
            <p>No se pudo generar el archivo .zip. Por favor, intenta nuevamente.</p>
          `;
        });
      });
    });
  });
});

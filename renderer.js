// Variables para manejar el flujo del instalador
let step = 0;
const content = document.querySelector('.content');

// Selección de botones
const nextButton1 = document.getElementById('next-button1');
const nextButton2 = document.getElementById('next-button2');
const installButton = document.getElementById('install-button');

// Evento para el primer botón "Next"
nextButton1.addEventListener('click', () => {
  step++;
  content.innerHTML = `
    <h2>Bienvenido a la configuración de AI_Hiroshi</h2>
    <p>Haz clic en "Siguiente" para continuar al siguiente paso.</p>
    <button id="next-button2">Siguiente</button>
  `;

  // Agregar evento para el segundo botón "Next"
  document.getElementById('next-button2').addEventListener('click', () => {
    content.innerHTML = `
      <h2>Configuración completa</h2>
      <p>Haz clic en "Instalar" para generar el archivo .zip con el voicebank.</p>
      <button id="install-button">Instalar</button>
    `;

    // Agregar evento para el botón "Instalar"
    document.getElementById('install-button').addEventListener('click', () => {
      // Contenido del archivo de registro .reg
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

      // Contenido del archivo .vvd
      const vvdContent = "Datos técnicos del archivo VVD para el voicebank de AI Hiroshi.";

      // Contenido del archivo .v6
      const v6Content = "Configuraciones avanzadas específicas para el motor Vocaloid 6.";

      // Contenido del archivo .dat
      const datContent = "Archivo binario relacionado con AI Hiroshi para uso interno.";

      // Crear contenido del archivo config.json
      const configContent = JSON.stringify({
        voicebank_name: "AI_Hiroshi",
        language: "Japanese",
        sample_rate: 48000,
        version: "2.0.0",
        description: "Voicebank based on AI created by Alejandro for AI Hiroshi"
      }, null, 2);

      // Crear contenido del archivo oto.ini
      const otoContent = `
[samples]
a.wav=0,500,100,300,400
e.wav=0,400,80,200,300
i.wav=0,450,90,250,350
o.wav=0,420,85,220,320
u.wav=0,430,95,230,330
      `;

      // Crear el .zip
      const zip = new JSZip();
      zip.file("AI_HIROSHI_Voicebank.reg", regContent);
      zip.file("AI_HIROSHI.vvd", vvdContent);
      zip.file("AI_HIROSHI.v6", v6Content);
      zip.file("AI_HIROSHI.dat", datContent);
      zip.file("config.json", configContent);
      zip.file("oto.ini", otoContent);
      zip.file("README.txt", "Este es el voicebank AI_Hiroshi creado por Alejandro.");
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
        link.click();
        URL.revokeObjectURL(link.href);

        // Actualizar la interfaz del instalador
        content.innerHTML = `
          <h2>¡Instalación completa!</h2>
          <p>El archivo .zip del voicebank se ha generado exitosamente. Extrae el contenido y sigue las instrucciones.</p>
        `;
        console.log("Archivo .zip generado correctamente.");
      });
    });
  });
});

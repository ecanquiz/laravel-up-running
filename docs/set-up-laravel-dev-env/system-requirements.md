# Configurar Entorno de Desarrollo

>Parte del éxito de PHP se debe a que es difícil encontrar un servidor web que no pueda servir PHP. Sin embargo, las herramientas PHP modernas tienen requisitos más estrictos que las del pasado. La mejor manera de desarrollar para Laravel es garantizar un entorno de servidor local y remoto consistente para su código y, afortunadamente, el ecosistema de Laravel tiene algunas herramientas para esto.

## Requisitos del Sistema

Todo lo que cubriremos en este capítulo es posible con máquinas Windows, pero necesitará docenas de páginas de instrucciones y advertencias personalizadas. Dejaré esas instrucciones y advertencias a los usuarios reales de Windows, por lo que los ejemplos aquí y en el resto del libro se centrarán en los desarrolladores de Unix/Linux/macOS.

Ya sea que elija servir su sitio web instalando PHP y otras herramientas en su máquina local, servir su entorno de desarrollo desde una máquina virtual a través de Vagrant o Docker, o confiar en una herramienta como MAMP/WAMP/XAMPP, su entorno de desarrollo deberá tener todo lo siguiente instalado para servir sitios Laravel:

- PHP >= 8.1
- Extensión PHP OpenSSL
- Extensión PHP PDO
- Extensión PHP Mbstring
- Extensión PHP Tokenizer
- Extensión XML PHP
- Extensión PHP Ctype
- Extensión PHP JSON
- Extensión PHP BCMath

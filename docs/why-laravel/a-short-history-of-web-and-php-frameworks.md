# Una Breve Historia de los Frameworks Web y PHP

Una parte importante para poder responder la pregunta "¿Por qué Laravel?" es comprender la historia de Laravel y comprender lo que vino antes. Antes del aumento de popularidad de Laravel, había una variedad de frameworks y otros movimientos en PHP y otros espacios de desarrollo web.

## Ruby on Rails

David Heinemeier Hansson lanzó la primera versión de Ruby on Rails en 2004, y desde entonces ha sido difícil encontrar un framework de aplicación web que no haya sido influenciado por Rails de alguna manera.

Rails popularizó MVC, las API RESTful JSON, la convención sobre la configuración, ActiveRecord y muchas más herramientas y convenciones que tuvieron una profunda influencia en la forma en que los desarrolladores web abordaron sus aplicaciones, especialmente con respecto al desarrollo rápido de aplicaciones.

## La afluencia de frameworks PHP

Para la mayoría de los desarrolladores estaba claro que Rails y frameworks de aplicaciones web similares eran la ola del futuro, y los frameworks PHP, incluidos aquellos que ciertamente imitaban a Rails, comenzaron a aparecer rápidamente.

CakePHP fue el primero en 2005, y pronto le siguieron Symfony, CodeIgniter, Zend Framework y Kohana (una bifurcación de CodeIgniter). Yii llegó en 2008, y Aura y Slim en 2010. El año 2011 trajo FuelPHP y Laravel, los cuales no eran del todo ramificaciones de CodeIgniter, sino que se propusieron como alternativas. Algunos de estos frameworks eran más Rails-y, centrándose en mapeadores relacionales de objetos (ORM) de bases de datos, estructuras MVC y otras herramientas dirigidas a un desarrollo rápido. Otros, como Symfony y Zend, se centraron más en patrones de diseño empresarial y comercio electrónico.


## Lo bueno y lo malo de CodeIgniter

CakePHP y CodeIgniter fueron los dos primeros frameworks PHP que fueron más abiertos acerca de en qué medida se inspiraban en Rails. CodeIgniter saltó rápidamente a la fama y en 2010 era posiblemente el más popular de los frameworks PHP independientes.

CodeIgniter era simple, fácil de usar y contaba con una documentación asombrosa y una comunidad sólida. Pero su uso de tecnología y patrones modernos avanzó lentamente; y a medida que el mundo de los frameworks creció y las herramientas de PHP avanzaron, CodeIgniter comenzó a quedarse atrás en términos de avances tecnológicos y características listas para usar. A diferencia de muchos otros frameworks, CodeIgniter estaba administrado por una empresa y tardó en ponerse al día con las características más nuevas de PHP 5.3, como los espacios de nombres y los cambios a GitHub y posteriormente a Composer. Fue en 2010 que Taylor Otwell, el creador de Laravel, quedó tan insatisfecho con CodeIgniter que se propuso escribir su propio framework.

## Laravel 1, 2 y 3

La primera versión beta de Laravel 1 se lanzó en junio de 2011 y se escribió completamente desde cero. Presentaba un ORM personalizado (Eloquent); enrutamiento basado en cierres (inspirado en Ruby Sinatra); un sistema modular para extensión; y ayudantes para formularios, validación, autenticación y más.

El desarrollo inicial de Laravel avanzó rápidamente y Laravel 2 y 3 se lanzaron en noviembre de 2011 y febrero de 2012, respectivamente. Introdujeron controladores, pruebas unitarias, una herramienta de línea de comandos, un contenedor de inversión de control (IoC), relaciones Eloquent y migraciones.

## Laravel 4

Con Laravel 4, Taylor reescribió todo el framework desde cero. En este punto, Composer, el ahora omnipresente administrador de paquetes de PHP, estaba mostrando signos de convertirse en un estándar de la industria, y Taylor vio el valor de reescribir el framework como una colección de componentes, distribuidos y agrupados por Composer.

Taylor desarrolló un conjunto de componentes bajo el nombre clave Illuminate y, en mayo de 2013, lanzó Laravel 4 con una estructura completamente nueva. En lugar de agrupar la mayor parte de su código como descarga, Laravel ahora extrajo la mayoría de sus componentes de Symfony (otro framework que lanzó sus componentes para que otros los usen) y los componentes de Illuminate a través de Composer.

Laravel 4 también introdujo colas, un componente de correo, fachadas y siembra de bases de datos. Y debido a que Laravel ahora dependía de componentes de Symfony, se anunció que Laravel reflejaría (no exactamente, pero poco después) el calendario de lanzamiento de seis meses que sigue Symfony.


## Laravel 5

El lanzamiento de Laravel 4.3 estaba previsto para noviembre de 2014, pero a medida que avanzaba el desarrollo quedó claro que la importancia de sus cambios merecía un lanzamiento importante, y Laravel 5 se lanzó en febrero de 2015.

Laravel 5 presentó una estructura de directorio renovada, eliminación del formulario y ayudantes HTML, la introducción de interfaces de contrato, una serie de nuevas vistas, Socialite para autenticación de redes sociales, Elixir para compilación de activos, _Scheduler_ para simplificar cron, dotenv para gestión simplificada del entorno. , _form requests_ y un nuevo REPL (bucle de read–evaluate–print). Desde entonces, ha ido creciendo en características y madurez, pero no ha habido cambios importantes como en versiones anteriores.

## Laravel 6

En septiembre de 2019, se introdujo Laravel 6 con dos cambios principales: primero, la eliminación de los ayudantes globales de cadena y matriz que ofrece Laravel (a favor de las fachadas); y segundo, pasar a SemVer (versiones semánticas) para la numeración de versiones. El efecto práctico de este cambio significa que, para todas las versiones de Laravel posteriores a la 5, tanto las versiones principales (6, 7, etc.) como las menores (6.1, 6.2, etc.) se publican con mucha más frecuencia.

## Versiones de Laravel en el nuevo mundo de SemVer (6+)

A partir de la versión 6, los lanzamientos de Laravel son menos monumentales que en el pasado debido al nuevo calendario de lanzamientos de SemVer. Entonces, en el futuro, los lanzamientos se centrarán más en cuánto tiempo ha pasado y menos en características nuevas muy específicas.
# ¿Por qué Laravel?
En los primeros días de la web dinámica, escribir una aplicación web era muy diferente a lo que es hoy. Luego, los desarrolladores fueron responsables de escribir el código no solo para la lógica empresarial única de nuestras aplicaciones, sino también para cada uno de los componentes que son tan comunes en todos los sitios: autenticación de usuarios, validación de entradas, acceso a bases de datos, plantillas y más.

Hoy en día, los programadores tienen docenas de frameworks de desarrollo de aplicaciones y miles de componentes y bibliotecas de fácil acceso. Es un estribillo común entre los programadores que, cuando aprendes un framework, han aparecido tres frameworks más nuevos (y supuestamente mejores) con la intención de reemplazarlo.

>“Sólo porque está ahí” podría ser una justificación válida para escalar una montaña, pero hay mejores razones para optar por utilizar un framework específico, o utilizar un framework en absoluto. Vale la pena preguntarse: ¿por qué los frameworks? Más específicamente, ¿por qué Laravel?

## ¿Por qué utilizar un framework?

Es fácil ver por qué es beneficioso utilizar los componentes o paquetes individuales que están disponibles para los desarrolladores de PHP. Con los paquetes, otra persona es responsable de desarrollar y mantener una pieza de código aislada que tiene un trabajo bien definido y, en teoría, esa persona tiene una comprensión más profunda de este componente único de la que usted tiene tiempo para tener.

Frameworks como Laravel (y Symfony, Lumen y Slim) empaquetan previamente una colección de componentes de terceros junto con un "pegamento" de framework personalizado, como archivos de configuración, proveedores de servicios, estructuras de directorios prescritas y programas de arranque de aplicaciones.

Entonces, el beneficio de usar un framework en general es que alguien ha tomado decisiones no solo sobre los componentes individuales por usted, sino también sobre _cómo esos componentes deben encajar entre sí_.

### "Lo construiré yo mismo"

Supongamos que inicia una nueva aplicación web sin el beneficio de un framework. ¿Por dónde empiezas? Bueno, probablemente debería enrutar las solicitudes HTTP, por lo que ahora necesita evaluar todas las bibliotecas de solicitudes y respuestas HTTP disponibles y elegir una. Entonces tendrás que elegir un enrutador. Ah, y probablemente necesitarás configurar algún tipo de archivo de configuración de rutas. ¿Qué sintaxis debería utilizar? ¿A dónde debería ir? ¿Qué pasa con los controladores? ¿Dónde viven y cómo se cargan? Bueno, probablemente necesites un contenedor de inyección de dependencias para resolver los controladores y sus dependencias. ¿Pero cual?

Además, si se toma el tiempo para responder todas esas preguntas y crear su aplicación con éxito, ¿cuál será el impacto en el próximo desarrollador? ¿Qué pasa cuando tienes cuatro aplicaciones basadas en frameworks personalizados, o una docena, y tienes que recordar dónde viven los controladores en cada una o cuál es la sintaxis de enrutamiento?


### Consistencia y flexibilidad

Los frameworks abordan este problema proporcionando una respuesta cuidadosamente considerada a la pregunta "¿Qué componente deberíamos usar aquí?" y garantizar que los componentes particulares elegidos funcionen bien juntos. Además, los frameworks proporcionan convenciones que reducen la cantidad de código que un desarrollador nuevo en el proyecto debe comprender; si comprende cómo funciona el enrutamiento en un proyecto de Laravel, por ejemplo, comprenderá cómo funciona en todos los proyectos de Laravel.

Cuando alguien prescribe implementar su propio framework para cada nuevo proyecto, lo que realmente está defendiendo es la capacidad de controlar lo que se incluye y lo que no en la base de su aplicación. Eso significa que los mejores frameworks no sólo le proporcionarán una base sólida, sino que también le darán la libertad de personalizarlos a su gusto. Y esto, como te mostraré en el resto de este libro, es parte de lo que hace que Laravel sea tan especial.

## Una breve historia de los frameworks web y PHP

Una parte importante para poder responder la pregunta "¿Por qué Laravel?" es comprender la historia de Laravel y comprender lo que vino antes. Antes del aumento de popularidad de Laravel, había una variedad de frameworks y otros movimientos en PHP y otros espacios de desarrollo web.

### Ruby on Rails

David Heinemeier Hansson lanzó la primera versión de Ruby on Rails en 2004, y desde entonces ha sido difícil encontrar un framework de aplicación web que no haya sido influenciado por Rails de alguna manera.

Rails popularizó MVC, las API RESTful JSON, la convención sobre la configuración, ActiveRecord y muchas más herramientas y convenciones que tuvieron una profunda influencia en la forma en que los desarrolladores web abordaron sus aplicaciones, especialmente con respecto al desarrollo rápido de aplicaciones.

### La afluencia de frameworks PHP

Para la mayoría de los desarrolladores estaba claro que Rails y frameworks de aplicaciones web similares eran la ola del futuro, y los frameworks PHP, incluidos aquellos que ciertamente imitaban a Rails, comenzaron a aparecer rápidamente.

CakePHP fue el primero en 2005, y pronto le siguieron Symfony, CodeIgniter, Zend Framework y Kohana (una bifurcación de CodeIgniter). Yii llegó en 2008, y Aura y Slim en 2010. El año 2011 trajo FuelPHP y Laravel, los cuales no eran del todo ramificaciones de CodeIgniter, sino que se propusieron como alternativas. Algunos de estos frameworks eran más Rails-y, centrándose en mapeadores relacionales de objetos (ORM) de bases de datos, estructuras MVC y otras herramientas dirigidas a un desarrollo rápido. Otros, como Symfony y Zend, se centraron más en patrones de diseño empresarial y comercio electrónico.


### Lo bueno y lo malo de CodeIgniter

CakePHP y CodeIgniter fueron los dos primeros frameworks PHP que fueron más abiertos acerca de en qué medida se inspiraban en Rails. CodeIgniter saltó rápidamente a la fama y en 2010 era posiblemente el más popular de los frameworks PHP independientes.

CodeIgniter era simple, fácil de usar y contaba con una documentación asombrosa y una comunidad sólida. Pero su uso de tecnología y patrones modernos avanzó lentamente; y a medida que el mundo de los frameworks creció y las herramientas de PHP avanzaron, CodeIgniter comenzó a quedarse atrás en términos de avances tecnológicos y características listas para usar. A diferencia de muchos otros frameworks, CodeIgniter estaba administrado por una empresa y tardó en ponerse al día con las características más nuevas de PHP 5.3, como los espacios de nombres y los cambios a GitHub y posteriormente a Composer. Fue en 2010 que Taylor Otwell, el creador de Laravel, quedó tan insatisfecho con CodeIgniter que se propuso escribir su propio framework.

### Laravel 1, 2 y 3

La primera versión beta de Laravel 1 se lanzó en junio de 2011 y se escribió completamente desde cero. Presentaba un ORM personalizado (Eloquent); enrutamiento basado en cierres (inspirado en Ruby Sinatra); un sistema modular para extensión; y ayudantes para formularios, validación, autenticación y más.

El desarrollo inicial de Laravel avanzó rápidamente y Laravel 2 y 3 se lanzaron en noviembre de 2011 y febrero de 2012, respectivamente. Introdujeron controladores, pruebas unitarias, una herramienta de línea de comandos, un contenedor de inversión de control (IoC), relaciones Eloquent y migraciones.

### Laravel 4

Con Laravel 4, Taylor reescribió todo el framework desde cero. En este punto, Composer, el ahora omnipresente administrador de paquetes de PHP, estaba mostrando signos de convertirse en un estándar de la industria, y Taylor vio el valor de reescribir el framework como una colección de componentes, distribuidos y agrupados por Composer.

Taylor desarrolló un conjunto de componentes bajo el nombre clave Illuminate y, en mayo de 2013, lanzó Laravel 4 con una estructura completamente nueva. En lugar de agrupar la mayor parte de su código como descarga, Laravel ahora extrajo la mayoría de sus componentes de Symfony (otro framework que lanzó sus componentes para que otros los usen) y los componentes de Illuminate a través de Composer.

Laravel 4 también introdujo colas, un componente de correo, fachadas y siembra de bases de datos. Y debido a que Laravel ahora dependía de componentes de Symfony, se anunció que Laravel reflejaría (no exactamente, pero poco después) el calendario de lanzamiento de seis meses que sigue Symfony.


### Laravel 5

El lanzamiento de Laravel 4.3 estaba previsto para noviembre de 2014, pero a medida que avanzaba el desarrollo quedó claro que la importancia de sus cambios merecía un lanzamiento importante, y Laravel 5 se lanzó en febrero de 2015.

Laravel 5 presentó una estructura de directorio renovada, eliminación del formulario y ayudantes HTML, la introducción de interfaces de contrato, una serie de nuevas vistas, Socialite para autenticación de redes sociales, Elixir para compilación de activos, _Scheduler_ para simplificar cron, dotenv para gestión simplificada del entorno. , _form requests_ y un nuevo REPL (bucle de read–evaluate–print). Desde entonces, ha ido creciendo en características y madurez, pero no ha habido cambios importantes como en versiones anteriores.

### Laravel 6

En septiembre de 2019, se introdujo Laravel 6 con dos cambios principales: primero, la eliminación de los ayudantes globales de cadena y matriz que ofrece Laravel (a favor de las fachadas); y segundo, pasar a SemVer (versiones semánticas) para la numeración de versiones. El efecto práctico de este cambio significa que, para todas las versiones de Laravel posteriores a la 5, tanto las versiones principales (6, 7, etc.) como las menores (6.1, 6.2, etc.) se publican con mucha más frecuencia.

### Versiones de Laravel en el nuevo mundo de SemVer (6+)

A partir de la versión 6, los lanzamientos de Laravel son menos monumentales que en el pasado debido al nuevo calendario de lanzamientos de SemVer. Entonces, en el futuro, los lanzamientos se centrarán más en cuánto tiempo ha pasado y menos en características nuevas muy específicas.

## ¿Qué tiene de especial Laravel?

Entonces, ¿qué es lo que distingue a Laravel? ¿Por qué vale la pena tener más de un framework PHP a la vez? Todos usan componentes de Symfony de todos modos, ¿verdad? Hablemos un poco sobre lo que hace que Laravel "funcione".


### La filosofía de Laravel

Sólo necesita leer los materiales de marketing y los archivos README de Laravel para comenzar a ver sus valores. Taylor usa palabras relacionadas con la luz como "Illuminate" y "Spark". Y luego están estos: “Artisans”. "Elegant." Además, estos: Breath of fresh air”. "Fresh start." Y finalmente: "Rapid". "Warp speed."

Los dos valores más comunicados del framework son aumentar la velocidad y la felicidad de los desarrolladores. Taylor ha descrito el lenguaje "Artisan" como un contraste intencional con valores más utilitarios. Puede ver la génesis de este tipo de pensamiento en [su pregunta de 2011 sobre StackExchange](https://softwareengineering.stackexchange.com/questions/90954/is-there-any-benefit-to-obsession-with-making-code-look-pretty) en la que afirmó: "A veces paso cantidades ridículas de tiempo (horas) angustiándose por hacer que el código 'se vea bonito'" solo por una mejor experiencia de mirando el código en sí. Y a menudo ha hablado del valor de hacer que sea más fácil y rápido para los desarrolladores hacer realidad sus ideas, eliminando barreras innecesarias para crear excelentes productos.

Laravel se trata, en esencia, de equipar y capacitar a los desarrolladores. Su objetivo es proporcionar código y características claras, simples y hermosas que ayuden a los desarrolladores a aprender, iniciar, desarrollar y escribir código que sea simple, claro y duradero rápidamente.

El concepto de dirigirse a desarrolladores es claro en todos los materiales de Laravel. "Los desarrolladores felices crean el mejor código" está escrito en la documentación. "La felicidad del desarrollador desde la descarga hasta la implementación" fue el eslogan no oficial durante un tiempo. Por supuesto, cualquier herramienta o framework dirá que quiere que los desarrolladores estén contentos. Pero tener la felicidad de los desarrolladores como una preocupación principal, en lugar de secundaria, ha tenido un gran impacto en el estilo de Laravel y en el progreso en la toma de decisiones. Mientras que otros frameworks pueden tener como objetivo principal la pureza arquitectónica o la compatibilidad con los objetivos y valores de los equipos de desarrollo empresarial, el enfoque principal de Laravel es servir al desarrollador individual. Eso no significa que no pueda escribir aplicaciones arquitectónicamente puras o listas para la empresa en Laravel, pero no tendrá que ser a expensas de la legibilidad y comprensibilidad de su código base.

### Cómo Laravel logra la felicidad de los desarrolladores

Simplemente decir que quieres hacer felices a los desarrolladores es una cosa. Hacerlo es otra, y requiere que usted se pregunte qué es lo que en un framework de trabajo es más probable que haga infelices a los desarrolladores y qué es lo que más probablemente los haga felices. Hay varias formas en que Laravel intenta hacer la vida de los desarrolladores más fácil.

Primero, Laravel es un framework de desarrollo rápido de aplicaciones. Esto significa que se centra en una curva de aprendizaje superficial (fácil) y en minimizar los pasos entre iniciar una nueva aplicación y publicarla. Todas las tareas más comunes en la creación de aplicaciones web, desde interacciones con bases de datos hasta autenticación, colas, correo electrónico y almacenamiento en caché, se simplifican gracias a los componentes que proporciona Laravel. Pero los componentes de Laravel no sólo son geniales por sí solos; Proporcionan una API consistente y estructuras predecibles en todo el framework. Eso significa que, cuando pruebes algo nuevo en Laravel, lo más probable es que termines diciendo: "...y simplemente funciona".

Esto tampoco termina con el framework en sí. Laravel proporciona un ecosistema completo de herramientas para crear y ejecutar aplicaciones. Tiene Sail, Valet y Homestead para desarrollo local, Forge para administración de servidores y Envoyer y Vapor para implementación avanzada. Y hay un conjunto de paquetes complementarios: Cajero para pagos y suscripciones, Echo para WebSockets, Scout para búsqueda, Sanctum y Passport para autenticación de API, Dusk para pruebas de interfaz, Socialite para inicio de sesión social, Horizon para monitorear colas, Nova para construir paneles de administración y Spark para iniciar su SaaS. Laravel está tratando de eliminar el trabajo repetitivo de los trabajos de los desarrolladores para que puedan hacer algo único.

A continuación, Laravel se centra en la “convención sobre la configuración”, lo que significa que si está dispuesto a utilizar los valores predeterminados de Laravel, tendrá que trabajar mucho menos que con otros frameworks que requieren que declare todas sus configuraciones, incluso si no utilizando la configuración recomendada. Los proyectos creados en Laravel toman menos tiempo que los creados en la mayoría de los otros frameworks PHP.

Laravel también se centra profundamente en la simplicidad. Es posible utilizar la inyección de dependencia y la burla y el patrón y repositorios de Data Mapper y la segregación de responsabilidad de consultas de comandos y todo tipo de otros patrones arquitectónicos más complejos con Laravel, si lo desea. Pero mientras otros frameworks podrían sugerir el uso de esas herramientas y estructuras en cada proyecto, Laravel y su documentación y comunidad se inclinan por comenzar con la implementación más simple posible: una función global aquí, una fachada allá, ActiveRecord allá. Esto permite a los desarrolladores crear la aplicación más simple posible para satisfacer sus necesidades, sin limitar su utilidad en entornos complejos.

Una fuente interesante de en qué se diferencia Laravel de otros frameworks PHP es que su creador y su comunidad están más conectados e inspirados en Ruby y Rails y los lenguajes de programación funcionales que en Java. Hay una fuerte corriente en PHP moderno que se inclina hacia la verbosidad y la complejidad, adoptando los aspectos más Java de PHP. Pero Laravel tiende a estar del otro lado, adoptando prácticas de codificación y características del lenguaje expresivas, dinámicas y simples.

### La comunidad Laravel

Si este libro es su primer contacto con la comunidad de Laravel, tiene algo especial que esperar. Uno de los elementos distintivos de Laravel, que ha contribuido a su crecimiento y éxito, es la acogedora comunidad docente que lo rodea. Desde los [videotutoriales de Laracasts](https://laracasts.com) de Jeffrey Way hasta [Laravel News](https://laravel-news.com), Slack, IRC y los canales de Discord, desde amigos de Twitter hasta blogueros, podcasts y conferencias de Laracon, Laravel tiene una comunidad rica y vibrante llena de gente que ha estado presente desde el primer día y gente que recién están comenzando su propio “día uno”. Y esto no es un accidente:

>Desde el principio de Laravel, tuve la idea de que todas las personas quieren sentirse parte de algo. Es un instinto humano natural querer pertenecer y ser aceptado en un grupo de personas con ideas afines. Entonces, al inyectar personalidad en un framework web y ser realmente activo con la comunidad, ese tipo de sentimiento puede crecer en la comunidad.

>—Taylor Otwell, entrevista sobre producto y soporte

Taylor entendió desde los primeros días de Laravel que un proyecto de código abierto exitoso necesitaba dos cosas: buena documentación y una comunidad acogedora. Y esas dos cosas son ahora características distintivas de Laravel.

## Cómo funciona

Hasta ahora, todo lo que he compartido aquí ha sido completamente abstracto. ¿Qué pasa con el código, preguntas? Profundicemos en una aplicación sencilla (Ejemplo 1-1) para que pueda ver cómo es realmente trabajar con Laravel día a día. 

Ejemplo 1-1. “Hello, World” en `routes/web.php`


```php
<?php
Route::get('/', function () {
    return 'Hello, World!';
});
```


La acción más simple posible que puede realizar en una aplicación Laravel es definir una ruta y devolver un resultado cada vez que alguien visita esa ruta. Si inicializa una aplicación Laravel nueva en su máquina, define la ruta en el Ejemplo 1-1 y luego sirve el sitio desde el directorio público, tendrá un ejemplo de "Hello, World!" completamente funcional (consulte la Figura 1- 1).

![img](./img/img1.png)

Se ve muy similar con los controladores, como puede ver en el Ejemplo 1-2 (que, si desea probar de inmediato, requiere que primero ejecute `php artisan make:controller WelcomeController` para crear el controlador).

Ejemplo 1-2. “Hello, World” con controladores

```php
// File: routes/web.php
<?php
use App\Http\Controllers\WelcomeController;

Route::get('/', [WelcomeController::class, 'index']);
```

```php
// File: app/Http/Controllers/WelcomeController.php
<?php
namespace App\Http\Controllers;

class WelcomeController extends Controller
{
    public function index()
    {
        return 'Hello, World!';
    }
}
```

Y si almacena sus saludos en una base de datos, también se verá bastante similar (consulte el Ejemplo 1-3).

Ejemplo 1-3. Saludo múltiple “Hello, World” con acceso a la base de datos


```php
// File: routes/web.php
<?php
use App\Greeting;

Route::get('create-greeting', function () {
    $greeting = new Greeting;
    $greeting->body = 'Hello, World!';
    $greeting->save();
});

Route::get('first-greeting', function () {
  return Greeting::first()->body;
});
```


```php
// File: app/Models/Greeting.php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Greeting extends Model
{
    use HasFactory;
}
```


```php
// File: database/migrations/2023_03_12_192110_create_greetings_table.php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
    * Run the migrations.
    */
    public function up(): void
    {
        Schema::create('greetings', function (Blueprint $table) {
            $table->id();
            $table->string('body');
            $table->timestamps();
        });

    }
    
    /**
    * Reverse the migrations.
    */
    public function down(): void
    {
        Schema::dropIfExists('greetings');
    }
};
```

El ejemplo 1-3 puede resultar un poco abrumador y, de ser así, sáltelo. Aprenderá todo lo que sucede aquí en capítulos posteriores, pero ya puede ver que con solo unas pocas líneas de código, puede configurar migraciones y modelos de bases de datos y extraer registros. Es así de simple.

## ¿Por qué Laravel?

Entonces, ¿por qué Laravel?

Porque Laravel te ayuda a hacer realidad tus ideas sin desperdiciar código, utilizando estándares de codificación modernos, rodeado de una comunidad vibrante y con un ecosistema de herramientas empoderador.

Y porque tú, querido desarrollador, mereces ser feliz.

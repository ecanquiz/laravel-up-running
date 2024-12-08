import{_ as s,c as a,o as e,V as i}from"./chunks/framework.D9sOcAzr.js";const n="/laravel-up-running/assets/controllers-01.Wa34lxzh.png",m=JSON.parse('{"title":"Controladores","description":"","frontmatter":{},"headers":[],"relativePath":"routing-and-controllers/controllers.md","filePath":"routing-and-controllers/controllers.md"}'),t={name:"routing-and-controllers/controllers.md"},l=i(`<h1 id="controladores" tabindex="-1">Controladores <a class="header-anchor" href="#controladores" aria-label="Permalink to &quot;Controladores&quot;">​</a></h1><p>He mencionado los controladores varias veces, pero hasta ahora, la mayoría de los ejemplos han mostrado clausuras de rutas. En el patrón MVC, los controladores son esencialmente clases que organizan la lógica de una o más rutas juntas en un solo lugar. Los controladores tienden a agrupar rutas similares, especialmente si su aplicación está estructurada en un formato tradicional similar a CRUD; en este caso, un controlador podría manejar todas las acciones que se pueden realizar en un recurso en particular.</p><div class="info custom-block"><p class="custom-block-title">¿Qué es CRUD?</p><p>CRUD significa <em>create</em>, <em>read</em>, <em>update</em> y <em>delete</em>, que son las cuatro operaciones principales que las aplicaciones web suelen ofrecer sobre un recurso. Por ejemplo, puedes crear una nueva entrada de blog, leerla, actualizarla o eliminarla.</p></div><p>Puede resultar tentador incluir toda la lógica de la aplicación en los controladores, pero es mejor pensar en los controladores como los policías de tráfico que dirigen las solicitudes HTTP por toda la aplicación. Dado que existen otras formas en las que las solicitudes pueden llegar a la aplicación — trabajos cron, llamadas a la línea de comandos de Artisan, trabajos en cola, etc. — es aconsejable no depender demasiado de los controladores para el comportamiento. Esto significa que el trabajo principal de un controlador es capturar la intención de una solicitud HTTP y pasarla al resto de la aplicación.</p><p>Por lo tanto, creemos un controlador. Una forma sencilla de hacerlo es con un comando de Artisan, por lo que desde la línea de comandos, ejecute lo siguiente:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> artisan make:controller TaskController</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">Artisan y generadores de Artisan</p><p>Laravel incluye una herramienta de línea de comandos llamada Artisan. Artisan se puede utilizar para ejecutar migraciones, crear usuarios y otros registros de bases de datos manualmente y realizar muchas otras tareas manuales que se realizan una sola vez.</p><p>Bajo el espacio de nombres <code>make</code>, Artisan proporciona herramientas para generar archivos de esqueleto para una variedad de archivos del sistema. Eso es lo que nos permite ejecutar <code>php artisan make:controller</code>.</p><p>Para obtener más información sobre esta y otras características de Artisan, consulte <a href="./../artisan-and-tinker/an-introduction-to-artisan.html">aquí</a>.</p></div><p>Esto creará un nuevo archivo llamado <code>TaskController.php</code> en <code>app/Http/Controllers</code>, con el contenido que se muestra en el siguiente ejemplo.</p><p><em>Controlador generado por defecto</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">php</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">namespace</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> App\\Http\\Controllers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Illuminate\\Http\\Request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TaskController</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Controller</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Modifique este archivo como se muestra en el ejemplo siguiente, creando un nuevo método público llamado <code>index()</code>. Solo devolveremos algo de texto allí.</p><p><em>Ejemplo de controlador simple</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">php</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">namespace</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> App\\Http\\Controllers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TaskController</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Controller</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> index</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Hello, World!&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Luego, como aprendimos antes, conectaremos una ruta a él, como se muestra en el ejemplo siguiente.</p><p><em>Ruta para el controlador simple</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// routes/web.php</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">php</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Illuminate\\Support\\Facades\\Route</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> App\\Http\\Controllers\\TaskController</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Route</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TaskController</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;index&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span></code></pre></div><p>Eso es todo. Visita la ruta <code>/</code> y verás las palabras <em>“Hello, World!”</em></p><p>El uso más común de un método controlador, entonces, será algo como el ejemplo siguiente, que proporciona la misma funcionalidad que nuestro <a href="./views.html#pasando-variables-a-las-vistas">ejemplo de clausura de ruta</a>.</p><p><em>Ejemplo de método de controlador común</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// TaskController.php</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> index</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> view</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tasks.index&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tasks&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Task</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">all</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Este método controlador carga la vista <code>resources/views/tasks/index.blade.php</code> o <code>resources/views/tasks/index.php</code> y le pasa una única variable llamada <code>tasks</code>, que contiene el resultado del método Eloquent <code>Task::all()</code>.</p><div class="info custom-block"><p class="custom-block-title">Generación de Controladores de Recursos</p><p>Si desea crear un controlador de recursos con métodos generados automáticamente para todas las rutas de recursos básicas como <code>create()</code> y <code>update()</code>, puede pasar el indicador <code>--resource</code> al usar <code>php artisan make:controller</code>:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> artisan make:controller TaskController --resource</span></span></code></pre></div></div><h2 id="obtener-la-entrada-del-usuario" tabindex="-1">Obtener la Entrada del Usuario <a class="header-anchor" href="#obtener-la-entrada-del-usuario" aria-label="Permalink to &quot;Obtener la Entrada del Usuario&quot;">​</a></h2><p>La segunda acción más común que se realiza en un método de controlador es tomar la entrada del usuario y actuar en consecuencia. Esto introduce algunos conceptos nuevos, así que echemos un vistazo a un poco de código de muestra y analicemos las nuevas partes.</p><p>Primero, vinculemos nuestra ruta; consulte el siguiente ejemplo.</p><p><em>Vinculación de acciones de formulario básicas</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// routes/web.php</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Route</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tasks/create&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TaskController</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;create&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Route</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">post</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tasks&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TaskController</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;store&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span></code></pre></div><p>Tenga en cuenta que estamos vinculando la acción <code>GET</code> de <code>tasks/create</code> (que muestra un formulario para crear una nueva tarea) y la acción <code>POST</code> de <code>tasks</code> (que es donde nuestro formulario <code>POST</code> hará cuando estemos creando una nueva tarea). Podemos suponer que el método <code>create()</code> en nuestro controlador solo muestra un formulario, así que veamos el método <code>store()</code> en el siguiente ejemplo.</p><p><em>Método común de controlador de entrada de formulario</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// TaskController.php</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> store</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Task</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">only</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;title&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;description&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> redirect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tasks&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Este ejemplo utiliza modelos Eloquent y la funcionalidad <code>redirect()</code>, y hablaremos más sobre ellos más adelante, pero por ahora hablemos rápidamente sobre cómo obtenemos nuestros datos aquí.</p><p>Estamos usando el asistente <code>request()</code> para representar la solicitud HTTP (más sobre esto más adelante) y usamos su método <code>only()</code> para extraer solo los campos <code>title</code> y <code>description</code> que envió el usuario.</p><p>Luego, pasamos esos datos al método <code>create()</code> de nuestro modelo <code>Task</code>, que crea una nueva instancia de la tarea con <code>title</code> establecido en el título ingresado y <code>description</code> establecido en la descripción ingresada. Finalmente, redirigimos nuevamente a la página que muestra todas las tareas.</p><p>Aquí hay algunas capas de abstracción en funcionamiento, que cubriremos en un segundo, pero debes saber que los datos que provienen del método <code>only()</code> provienen del mismo conjunto de datos del que extraen todos los métodos comunes utilizados en el objeto <code>Request</code>, incluidos <code>all()</code> y <code>get()</code>. El conjunto de datos del que extrae cada uno de estos métodos representa todos los datos proporcionados por el usuario, ya sean de parámetros de consulta o valores <code>POST</code>. Entonces, nuestro usuario completó dos campos en la página &quot;agregar tarea&quot;: ​​&quot;título&quot; y &quot;descripción&quot;.</p><p>Para desglosar un poco la abstracción, <code>request()-&gt;only()</code> toma una matriz asociativa de nombres de entrada y los devuelve:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">only</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;title&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;description&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// returns:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;title&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Whatever title the user typed on the previous page&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;description&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Whatever description the user typed on the previous page&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><p>Y <code>Task::create()</code> toma una matriz asociativa y crea una nueva tarea a partir de ella:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Task</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;title&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Buy milk&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;description&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Remember to check the expiration date this time, Norbert!&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span></code></pre></div><p>Al combinarlos, se crea una tarea con solo los campos “título” y “descripción” proporcionados por el usuario.</p><h2 id="inyeccion-de-dependencias-en-los-controladores" tabindex="-1">Inyección de Dependencias en los Controladores <a class="header-anchor" href="#inyeccion-de-dependencias-en-los-controladores" aria-label="Permalink to &quot;Inyección de Dependencias en los Controladores&quot;">​</a></h2><p>Las fachadas y los ayudantes globales de Laravel presentan una interfaz sencilla para las clases más útiles en el código base de Laravel. Puede obtener información sobre la solicitud actual y la entrada del usuario, la sesión, los cachés y mucho más.</p><p>Pero si prefiere inyectar sus dependencias, o si desea utilizar un servicio que no tiene una fachada o un ayudante, deberá encontrar alguna forma de incorporar instancias de estas clases a su controlador.</p><p>Esta es nuestra primera exposición al contenedor de servicios de Laravel. Por ahora, si no le resulta familiar, puede pensar en él como un poco de magia de Laravel; o, si desea saber más sobre cómo funciona realmente, puede pasar directamente <a href="./../the-container/a-quick-intro-to-dependency-injection.html">aquí</a>.</p><p>Todos los métodos del controlador (incluidos los constructores) se resuelven fuera del contenedor de Laravel, lo que significa que cualquier cosa que escribas y que el contenedor sepa cómo resolver se inyectará automáticamente.</p><div class="info custom-block"><p class="custom-block-title">Typehints en PHP</p><p><em>Sugerencia de tipo</em> en PHP significa poner el nombre de una clase o interfaz delante de una variable en la firma de un método:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __construct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Logger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $logger) {}</span></span></code></pre></div><p>Este typehint le dice a PHP que todo lo que se pasa al método <em>debe</em> ser del tipo <code>Logger</code>, que podría ser una interfaz o una clase.</p></div><p>Como buen ejemplo, ¿qué sucede si prefiere tener una instancia del objeto <code>Request</code> en lugar de usar el asistente global? Simplemente escriba <code>Illuminate\\Http\\Request</code> en los parámetros de su método, como en el ejemplo siguiente.</p><p><em>Inyección de método de controlador mediante sugerencia de tipo</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// TaskController.php</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> store</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\Illuminate\\Http\\Request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $request)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Task</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($request</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">only</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;title&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;description&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> redirect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tasks&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Entonces, has definido un parámetro que debe pasarse al método <code>store()</code>. Y como la has tipado, y como Laravel sabe cómo resolver ese nombre de clase, vas a tener el objeto <code>Request</code> listo para que lo uses en tu método sin trabajo de tu parte. Sin vinculación explícita, sin nada más — solo está ahí como la variable <code>$request</code>.</p><p>Y, como se puede ver al comparar los ejemplos anteriores, el ayudante <code>request()</code> y el objeto <code>Request</code> se comportan exactamente de la misma manera.</p><h2 id="controladores-de-recursos" tabindex="-1">Controladores de Recursos <a class="header-anchor" href="#controladores-de-recursos" aria-label="Permalink to &quot;Controladores de Recursos&quot;">​</a></h2><p>A veces, nombrar los métodos de los controladores puede ser la parte más difícil de escribir un controlador. Afortunadamente, Laravel tiene algunas convenciones para todas las rutas de un controlador REST/CRUD tradicional (llamado <em>controlador de recursos</em> en Laravel); Además, viene con un generador listo para usar y una definición de ruta conveniente que le permite vincular un controlador de recursos completo a la vez.</p><p>Para ver los métodos que Laravel espera para un controlador de recursos, generemos un nuevo controlador desde la línea de comandos:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> artisan make:controller MySampleResourceController --resource</span></span></code></pre></div><p>Ahora abre <code>app/Http/Controllers/MySampleResourceController.php</code>. Verás que viene precargado con bastantes métodos. Veamos qué representa cada uno. Usaremos una <code>Task</code> como ejemplo.</p><h3 id="los-metodos-de-los-controladores-de-recursos-de-laravel" tabindex="-1">Los métodos de los controladores de recursos de Laravel <a class="header-anchor" href="#los-metodos-de-los-controladores-de-recursos-de-laravel" aria-label="Permalink to &quot;Los métodos de los controladores de recursos de Laravel&quot;">​</a></h3><p><a href="./../routing-and-controllers/a-quick-intro-to-mvc-the-http-verbs-and-rest.html#los-verbos-http">¿Recuerdas la tabla anterior? Esta tabla muestra el verbo HTTP</a>, la URL, el nombre del método del controlador y el nombre de cada uno de estos métodos predeterminados que se generan en los controladores de recursos de Laravel.</p><h3 id="vincular-un-controlador-de-recursos" tabindex="-1">Vincular un controlador de recursos <a class="header-anchor" href="#vincular-un-controlador-de-recursos" aria-label="Permalink to &quot;Vincular un controlador de recursos&quot;">​</a></h3><p>Hemos visto que estos son los nombres de ruta convencionales que se usan en Laravel y también que es fácil generar un controlador de recursos con métodos para cada una de estas rutas predeterminadas. Afortunadamente, no tienes que generar rutas para cada uno de estos métodos de controlador a mano, si no lo deseas. Hay un truco para eso, llamado <em>vinculación de controlador de recursos</em>. Observa el ejemplo siguiente.</p><p><em>Vinculación del controlador de recursos</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// routes/web.php</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Route</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tasks&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TaskController</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>Esto vinculará automáticamente todas las rutas enumeradas en la <a href="./../routing-and-controllers/a-quick-intro-to-mvc-the-http-verbs-and-rest.html#los-verbos-http">tabla anterior</a> para este recurso a los nombres de método apropiados en el controlador especificado. También nombrará estas rutas de manera apropiada; por ejemplo, el método <code>index()</code> en el controlador de recursos de tareas se llamará <code>tasks.index</code>.</p><div class="info custom-block"><p class="custom-block-title"><code>artisan route:list</code></p><p>Si alguna vez te encuentras en una situación en la que te preguntas qué rutas tiene disponibles tu aplicación actual, existe una herramienta para eso: desde la línea de comandos, ejecuta <code>php artisan route:list</code> y obtendrás una lista de todas las rutas disponibles. Prefiero <code>php artisan route:list --exclude-vendor</code> para no ver todas las rutas extrañas que mis dependencias registran para que funcionen (ver Figura siguiente).</p></div><p><img src="`+n+`" alt="controllers"><em><code>artisan route:list</code></em></p><h2 id="controladores-de-recursos-de-api" tabindex="-1">Controladores de Recursos de API <a class="header-anchor" href="#controladores-de-recursos-de-api" aria-label="Permalink to &quot;Controladores de Recursos de API&quot;">​</a></h2><p>Cuando trabajas con API RESTful, la lista de posibles acciones en un recurso no es la misma que con un controlador de recursos HTML. Por ejemplo, puedes enviar una solicitud <code>POST</code> a una API para crear un recurso, pero no puedes realmente &quot;mostrar un formulario de creación&quot; en una API.</p><p>Para generar un <em>controlador de recursos API</em>, que es un controlador que tiene la misma estructura que un controlador de recursos excepto que excluye las acciones de <em>creación</em> y <em>edición</em>, pase la bandera <code>--api</code> al crear un controlador:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> artisan make:controller MySampleResourceController --api</span></span></code></pre></div><p>Para vincular un controlador de recursos API, utilice el método <code>apiResource()</code> en lugar del método <code>resource()</code>, como se muestra en el ejemplo siguiente.</p><p><em>Vínculo del controlador de recursos API</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// routes/web.php</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Route</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apiResource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;tasks&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TaskController</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h2 id="controladores-de-accion-simple" tabindex="-1">Controladores de Acción Simple <a class="header-anchor" href="#controladores-de-accion-simple" aria-label="Permalink to &quot;Controladores de Acción Simple&quot;">​</a></h2><p>Habrá ocasiones en sus aplicaciones en las que un controlador solo deba dar servicio a una única ruta. Es posible que se pregunte cómo nombrar el método del controlador para esa ruta. Afortunadamente, puede apuntar una única ruta a un único controlador sin preocuparse por nombrar el método.</p><p>Como ya sabrás, el método <code>__invoke()</code> es un método mágico de PHP que te permite “invocar” una instancia de una clase, tratándola como una función y llamándola.</p><p>Esta es la herramienta que utilizan los controladores de acción única de Laravel para permitirle señalar una ruta a un solo controlador, como puede ver en el ejemplo siguiente.</p><p><em>Uso del método <code>__invoke()</code></em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// \\App\\Http\\Controllers\\UpdateUserAvatar.php</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __invoke</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $user)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Update the user&#39;s avatar image</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// routes/web.php</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Route</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">post</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;users/{user}/update-avatar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">UpdateUserAvatar</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div>`,77),o=[l];function r(p,d,h,c,k,u){return e(),a("div",null,o)}const E=s(t,[["render",r]]);export{m as __pageData,E as default};
import{_ as s,c as a,o as i,V as e}from"./chunks/framework.D9sOcAzr.js";const g=JSON.parse('{"title":"Controladores","description":"","frontmatter":{},"headers":[],"relativePath":"routing-and-controllers/controllers.md","filePath":"routing-and-controllers/controllers.md"}'),n={name:"routing-and-controllers/controllers.md"},l=e(`<h1 id="controladores" tabindex="-1">Controladores <a class="header-anchor" href="#controladores" aria-label="Permalink to &quot;Controladores&quot;">​</a></h1><p>He mencionado los controladores varias veces, pero hasta ahora, la mayoría de los ejemplos han mostrado clausuras de rutas. En el patrón MVC, los controladores son esencialmente clases que organizan la lógica de una o más rutas juntas en un solo lugar. Los controladores tienden a agrupar rutas similares, especialmente si su aplicación está estructurada en un formato tradicional similar a CRUD; en este caso, un controlador podría manejar todas las acciones que se pueden realizar en un recurso en particular.</p><div class="info custom-block"><p class="custom-block-title">¿Qué es CRUD?</p><p>CRUD significa <em>create</em>, <em>read</em>, <em>update</em> y <em>delete</em>, que son las cuatro operaciones principales que las aplicaciones web suelen ofrecer sobre un recurso. Por ejemplo, puedes crear una nueva entrada de blog, leerla, actualizarla o eliminarla.</p></div><p>Puede resultar tentador incluir toda la lógica de la aplicación en los controladores, pero es mejor pensar en los controladores como los policías de tráfico que dirigen las solicitudes HTTP por toda la aplicación. Dado que existen otras formas en las que las solicitudes pueden llegar a la aplicación — trabajos cron, llamadas a la línea de comandos de Artisan, trabajos en cola, etc. — es aconsejable no depender demasiado de los controladores para el comportamiento. Esto significa que el trabajo principal de un controlador es capturar la intención de una solicitud HTTP y pasarla al resto de la aplicación.</p><p>Por lo tanto, creemos un controlador. Una forma sencilla de hacerlo es con un comando de Artisan, por lo que desde la línea de comandos, ejecute lo siguiente:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> artisan make:controller TaskController</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">Artisan y generadores de Artisan</p><p>Laravel incluye una herramienta de línea de comandos llamada Artisan. Artisan se puede utilizar para ejecutar migraciones, crear usuarios y otros registros de bases de datos manualmente y realizar muchas otras tareas manuales que se realizan una sola vez.</p><p>Bajo el espacio de nombres <code>make</code>, Artisan proporciona herramientas para generar archivos de esqueleto para una variedad de archivos del sistema. Eso es lo que nos permite ejecutar <code>php artisan make:controller</code>.</p><p>Para obtener más información sobre esta y otras características de Artisan, consulte <a href="./../artisan-and-tinker/an-introduction-to-artisan.html">aquí</a>.</p></div><p>Esto creará un nuevo archivo llamado <code>TaskController.php</code> en <code>app/Http/Controllers</code>, con el contenido que se muestra en el siguiente ejemplo.</p><p><em>Controlador generado por defecto</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">php</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span></code></pre></div><p>Al combinarlos, se crea una tarea con solo los campos “título” y “descripción” proporcionados por el usuario.</p><h2 id="injecting-dependencies-into-controllers" tabindex="-1">Injecting Dependencies into Controllers <a class="header-anchor" href="#injecting-dependencies-into-controllers" aria-label="Permalink to &quot;Injecting Dependencies into Controllers&quot;">​</a></h2><h2 id="controladores-de-recursos" tabindex="-1">Controladores de Recursos <a class="header-anchor" href="#controladores-de-recursos" aria-label="Permalink to &quot;Controladores de Recursos&quot;">​</a></h2>`,41),t=[l];function p(o,r,h,d,k,c){return i(),a("div",null,t)}const E=s(n,[["render",p]]);export{g as __pageData,E as default};

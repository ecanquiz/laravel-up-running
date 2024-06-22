import{_ as s,c as a,o as i,V as e}from"./chunks/framework.C80zbCY-.js";const u=JSON.parse('{"title":"Cómo Trabajar con JSON en JavaScript","description":"","frontmatter":{},"headers":[],"relativePath":"how-to-work-with-json-in-javascript.md","filePath":"how-to-work-with-json-in-javascript.md"}'),n={name:"how-to-work-with-json-in-javascript.md"},t=e(`<h1 id="como-trabajar-con-json-en-javascript" tabindex="-1">Cómo Trabajar con JSON en JavaScript <a class="header-anchor" href="#como-trabajar-con-json-en-javascript" aria-label="Permalink to &quot;Cómo Trabajar con JSON en JavaScript&quot;">​</a></h1><div class="info custom-block"><p class="custom-block-title">INFO</p><p>La fuente original (en ingles) de este tutorial se encuentra <a href="https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript" target="_blank" rel="noreferrer">aquí</a></p></div><h2 id="introduccion" tabindex="-1">Introducción <a class="header-anchor" href="#introduccion" aria-label="Permalink to &quot;Introducción&quot;">​</a></h2><p>Debido a que JSON se deriva del lenguaje de programación JavaScript, es una opción natural usarlo como formato de datos en JavaScript. JSON, abreviatura de JavaScript Object Notation, normalmente se pronuncia como el nombre &quot;Jason&quot;.</p><p>Para obtener más información sobre JSON en términos generales, lea el tutorial &quot;<a href="./an-introduction-to-json.html">Introducción a JSON</a>&quot;.</p><p>Para comenzar a pensar en dónde puede usar JSON en sus programas JavaScript, algunos casos de uso generales de JSON incluyen:</p><ul><li>Almacenamiento de datos</li><li>Generar estructuras de datos a partir de la entrada del usuario.</li><li>Transferir datos de servidor a cliente, de cliente a servidor y de servidor a servidor</li><li>Configurar y verificar datos</li></ul><p>Este tutorial le proporcionará una introducción a cómo trabajar con JSON en JavaScript. Para aprovechar al máximo esta introducción, debe estar familiarizado con el lenguaje de programación JavaScript.</p><h2 id="formato-json" tabindex="-1">Formato JSON <a class="header-anchor" href="#formato-json" aria-label="Permalink to &quot;Formato JSON&quot;">​</a></h2><p>El formato JSON se deriva de la sintaxis de objetos de JavaScript, pero está completamente basado en texto. Es un formato de datos clave-valor que normalmente se representa entre llaves.</p><p>Cuando trabaja con JSON, probablemente verá objetos JSON en un archivo <code>.json</code>, pero también pueden existir como un objeto JSON o una cadena dentro del contexto de un programa. Lea más sobre la <a href="./an-introduction-to-json.html">sintaxis y la estructura aquí</a>.</p><p>📃<code>sammy.json</code></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;first_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  :  </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Sammy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;last_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   :  </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Shark&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;online&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      :  </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Si, en cambio, tienes un objeto JSON en un archivo <code>.js</code> o <code>.html</code>, probablemente lo verás configurado en una variable:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sammy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;first_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  :  </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Sammy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;last_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   :  </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Shark&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;online&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      :  </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Además, es posible que vea JSON como una cadena en lugar de un objeto dentro del contexto de un archivo de programa o secuencia de comandos JavaScript. En este caso, también podrás verlo todo en una sola línea:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sammy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;first_name&quot; : &quot;Sammy&quot;, &quot;last_name&quot; : &quot;Shark&quot;, &quot;location&quot; : &quot;Ocean&quot;}&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>Convertir objetos JSON en cadenas puede resultar especialmente útil para transportar datos de forma rápida.</p><p>Hemos repasado el formato general de JSON y cómo puede esperar verlo como un archivo <code>.json</code> o dentro de JavaScript como un objeto o una cadena.</p><h2 id="comparacion-al-objeto-javascript" tabindex="-1">Comparación al Objeto JavaScript <a class="header-anchor" href="#comparacion-al-objeto-javascript" aria-label="Permalink to &quot;Comparación al Objeto JavaScript&quot;">​</a></h2><p>Vale la pena tener en cuenta que JSON fue desarrollado para ser utilizado por cualquier lenguaje de programación, mientras que los objetos JavaScript solo se pueden trabajar directamente a través del lenguaje de programación JavaScript.</p><p>En términos de sintaxis, los objetos JavaScript son similares a JSON, pero las claves de los objetos JavaScript no son cadenas entre comillas. Además, los objetos JavaScript están menos limitados en términos de tipos pasados ​​a valores, por lo que pueden usar funciones como valores.</p><p>Veamos un ejemplo de un objeto JavaScript del usuario del sitio web Sammy Shark que está actualmente en línea.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    first_name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Sammy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    last_name : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Shark&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    online    : </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    full_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">       return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.first_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot; &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.last_name;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>Esto le resultará muy familiar como objeto JSON, pero no hay comillas alrededor de ninguna de las claves (<code>first_name</code>, <code>last_name</code>, <code>online</code> o <code>full_name</code>) <strong>y</strong> hay un valor de función en la última línea.</p><p>Si queremos acceder a los datos del objeto JavaScript anterior, podríamos usar la <a href="./how-to-work-with-json-in-javascript.html#acceso-a-datos-json">notación de puntos</a> para llamar a <code>user.first_name;</code> y obtener una cadena, pero si queremos acceder al nombre completo, tendríamos que hacerlo llamando a <code>user.full_name();</code> porque es una función.</p><p>Los objetos JavaScript solo pueden existir dentro del lenguaje JavaScript, por lo que cuando trabaja con datos a los que se debe acceder mediante varios idiomas, es mejor optar por JSON.</p><h2 id="acceso-a-datos-json" tabindex="-1">Acceso a Datos JSON <a class="header-anchor" href="#acceso-a-datos-json" aria-label="Permalink to &quot;Acceso a Datos JSON&quot;">​</a></h2><p>Normalmente se accede a los datos JSON en Javascript mediante notación de puntos. Para entender cómo funciona esto, consideremos el objeto JSON <code>sammy</code>:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sammy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;first_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  :  </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Sammy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;last_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   :  </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Shark&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;online&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      :  </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Para acceder a cualquiera de los valores, usaremos una notación de puntos que se ve así:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sammy.first_name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sammy.last_name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sammy.online</span></span></code></pre></div><p>La variable <code>sammy</code> está primero, seguida de un punto, seguida de la clave a la que se accederá.</p><p>Para crear una alerta de JavaScript que nos muestre el valor asociado a la clave <code>first_name</code> en una ventana emergente, podemos hacerlo llamando a la función JavaScript <code>alert()</code>:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">alert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sammy.first_name);</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Output</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Sammy</span></span></code></pre></div><p>Aquí, hemos llamado con éxito el valor asociado con la clave <code>first_name</code> del objeto JSON <code>sammy</code>.</p><p>También podemos utilizar la sintaxis de corchetes para acceder a datos desde JSON. Para hacer eso, mantendríamos la clave entre comillas dobles entre corchetes. Para nuestra variable <code>sammy</code> anterior, el uso de la sintaxis de corchetes en una función <code>alert()</code> se ve así:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">alert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sammy[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;online&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Output</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span></code></pre></div><p>Cuando trabaja con <a href="./an-introduction-to-json.html#matrices-anidadas">elementos de una matriz anidada</a>, debe llamar al número del elemento en su matriz. Consideremos el JSON a continuación:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user_profile </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;username&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;SammyShark&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;social_media&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;twitter&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;link&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://twitter.com/digitalocean&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;facebook&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;link&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://www.facebook.com/DigitalOceanCloudHosting&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;github&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;link&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://github.com/digitalocean&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Para acceder a la cadena <code>facebook</code>, podemos llamar a ese elemento en la matriz dentro del contexto de la notación de puntos:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">alert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(user_profile.social_media[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">].description);</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Output</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">facebook</span></span></code></pre></div><p>Observe que para cada elemento anidado usaremos un punto adicional.</p><p>El uso de notación de puntos o sintaxis de corchetes nos permite acceder a los datos contenidos en formato JSON.</p><h2 id="funciones-para-trabajar-con-json" tabindex="-1">Funciones para Trabajar con JSON <a class="header-anchor" href="#funciones-para-trabajar-con-json" aria-label="Permalink to &quot;Funciones para Trabajar con JSON&quot;">​</a></h2><p>Esta sección analizará dos métodos para encadenar y analizar JSON. Poder convertir JSON de objeto a cadena y viceversa es útil para transferir y almacenar datos.</p><h3 id="json-stringify" tabindex="-1">JSON.stringify() <a class="header-anchor" href="#json-stringify" aria-label="Permalink to &quot;JSON.stringify()&quot;">​</a></h3><p>La función <code>JSON.stringify()</code> convierte un objeto en una cadena JSON.</p><p>Las cadenas son útiles para transportar datos de un cliente a un servidor mediante el almacenamiento o el paso de información de forma ligera. Por ejemplo, puede recopilar la configuración de un usuario en el lado del cliente y luego enviarla a un servidor. Más tarde, podrá leer la información con el método <code>JSON.parse()</code> y trabajar con los datos según sea necesario.</p><p>Veremos un objeto JSON que asignamos a la variable <code>obj</code> y luego lo convertiremos usando <code>JSON.stringify()</code> pasando <code>obj</code> a la función. Podemos asignar esta cadena a la variable <code>s</code>:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;first_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Sammy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;last_name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Shark&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;location&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Ocean&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> s </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj)</span></span></code></pre></div><p>Ahora, si trabajamos con <code>s</code>, tendremos el JSON disponible como una cadena en lugar de un objeto.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;{&quot;first_name&quot; : &quot;Sammy&quot;, &quot;last_name&quot; : &quot;Shark&quot;, &quot;location&quot; : &quot;Ocean&quot;}&#39;</span></span></code></pre></div><p>La función <code>JSON.stringify()</code> nos permite convertir objetos en cadenas. Para hacer lo contrario, veremos la función <code>JSON.parse()</code>.</p><h3 id="json-parse" tabindex="-1">JSON.parse() <a class="header-anchor" href="#json-parse" aria-label="Permalink to &quot;JSON.parse()&quot;">​</a></h3><p>Las cadenas son útiles para el transporte, pero querrás poder convertirlas nuevamente en un objeto JSON en el lado del cliente y/o del servidor. Podemos hacer esto usando la función <code>JSON.parse()</code>.</p><p>Para convertir el ejemplo de la sección <a href="./how-to-work-with-json-in-javascript.html#json-stringify">JSON.stringify()</a> anterior, pasaríamos la cadena <code>s</code> a la función y la asignaríamos a una nueva variable:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> o </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(s)</span></span></code></pre></div><p>Entonces, tendríamos el objeto <code>o</code> con el que trabajar, que sería idéntico al objeto <code>obj</code>.</p><p>Para profundizar más, consideremos un ejemplo de <code>JSON.parse()</code> dentro del contexto de un archivo HTML:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;!</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">DOCTYPE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> s </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;first_name&quot; : &quot;Sammy&quot;, &quot;last_name&quot; : &quot;Shark&quot;, &quot;location&quot; : &quot;Ocean&quot;}&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(s);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).innerHTML </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Name: &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj.first_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot; &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj.last_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt;br&gt;&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Location: &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj.location;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Output</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Sammy Shark</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Location:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Ocean</span></span></code></pre></div><p>Dentro del contexto de un archivo HTML, podemos ver cómo la cadena JSON <code>s</code> se convierte en un objeto que se puede recuperar en la representación final de la página <a href="./how-to-work-with-json-in-javascript.html#acceso-a-datos-json">accediendo al JSON</a> mediante notación de puntos.</p><p><code>JSON.parse()</code> es una función segura para analizar cadenas JSON y convertirlas en objetos.</p><h2 id="conclusion" tabindex="-1">Conclusión <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusión&quot;">​</a></h2><p>JSON es un formato natural para usar en JavaScript y tiene muchas implementaciones disponibles para usar en muchos lenguajes de programación populares. Si desea utilizar el formato en otro idioma de programación, puede ver la compatibilidad completa con el idioma en el sitio <a href="https://www.json.org/json-en.html" target="_blank" rel="noreferrer">&quot;Introduciendo JSON&quot;</a>.</p><p>Debido a que es liviano y se transfiere fácilmente entre sistemas y lenguajes de programación, JSON ha experimentado un mayor soporte en las API, incluida la <a href="https://www.digitalocean.com/community/tutorials/how-to-create-a-twitter-app-with-python" target="_blank" rel="noreferrer">API de Twitter</a>.</p><p>Probablemente no creará sus propios archivos <code>.json</code>, sino que los obtendrá de otras fuentes. Puede consultar estos <a href="/how-to-code-in-javascript/an-introduction-to-json.html">recursos</a> para obtener información sobre cómo convertir otras estructuras de datos a JSON.</p>`,71),l=[t];function o(p,h,r,k,d,c){return i(),a("div",null,l)}const g=s(n,[["render",o]]);export{u as __pageData,g as default};

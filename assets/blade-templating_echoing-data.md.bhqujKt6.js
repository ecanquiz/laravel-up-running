import{_ as e,c as a,o as s,V as i}from"./chunks/framework.D9sOcAzr.js";const g=JSON.parse('{"title":"Plantillas Blade","description":"","frontmatter":{},"headers":[],"relativePath":"blade-templating/echoing-data.md","filePath":"blade-templating/echoing-data.md"}'),n={name:"blade-templating/echoing-data.md"},l=i(`<h1 id="plantillas-blade" tabindex="-1">Plantillas Blade <a class="header-anchor" href="#plantillas-blade" aria-label="Permalink to &quot;Plantillas Blade&quot;">​</a></h1><p>En comparación con la mayoría de los demás lenguajes de backend, PHP funciona relativamente bien como lenguaje de plantillas. Pero tiene sus deficiencias y también es feo usar <code>&lt;?php</code> en línea por todos lados, por lo que se puede esperar que la mayoría de los frameworks modernos ofrezcan un lenguaje de plantillas.</p><p>Laravel ofrece un motor de plantillas personalizado llamado <em>Blade</em>, que está inspirado en el motor <em>Razor</em> de <em>.NET</em>. Se jacta de una sintaxis concisa, una curva de aprendizaje sencilla, un modelo de herencia potente e intuitivo y una fácil extensibilidad.</p><p>Para ver rápidamente cómo se escribe Blade, consulte el ejemplo siguiente.</p><p><em>Muestras de Blade</em></p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{{ $group-&gt;title }}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{!! $group-&gt;heroImageHtml() !!}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@forelse ($users as $user)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    • {{ $user-&gt;first_name }} {{ $user-&gt;last_name }}&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">br</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@empty</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    No users in this group.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@endforelse</span></span></code></pre></div><p>Como puede ver, <em>Blade</em> utiliza llaves para su <em>“echo”</em> e introduce una convención en la que sus etiquetas personalizadas, llamadas <em>“directives”</em>, tienen como prefijo <code>@</code>. Utilizará directivas para todas sus estructuras de control y también para la herencia y cualquier funcionalidad personalizada que desee agregar.</p><p>La sintaxis de <em>Blade</em> es clara y concisa, por lo que, en esencia, es más agradable y ordenado trabajar con él que con las alternativas. Pero en el momento en que necesitas algo de cierta complejidad en tus plantillas — herencia anidada, condicionales complejos o recursión — <em>Blade</em> comienza a brillar de verdad. Al igual que los mejores componentes de Laravel, toma requisitos de aplicaciones complejas y los hace fáciles y accesibles.</p><p>Además, dado que toda la sintaxis de <em>Blade</em> se compila en código PHP normal y luego se almacena en caché, es rápido y te permite usar PHP nativo en tus archivos <em>Blade</em> si lo deseas. Sin embargo, te recomendaría evitar usar PHP en la medida de lo posible — por lo general, si necesitas hacer algo que no puedes hacer con <em>Blade</em> o una directiva <em>Blade</em> personalizada, no pertenece a la plantilla.</p><div class="info custom-block"><p class="custom-block-title">Uso de Twig con Laravel</p><p>A diferencia de muchos otros frameworks basados ​​en <em>Symfony</em>, Laravel no utiliza <em>Twig</em> de forma predeterminada. Pero si te encanta <em>Twig</em>, existe un <a href="https://github.com/rcrowe/TwigBridge" target="_blank" rel="noreferrer">paquete <em>TwigBridge</em></a> que facilita el uso de <em>Twig</em> en lugar de <em>Blade</em>.</p></div><h2 id="haciendo-echo-de-los-datos" tabindex="-1">Haciendo Echo de Los Datos <a class="header-anchor" href="#haciendo-echo-de-los-datos" aria-label="Permalink to &quot;Haciendo Echo de Los Datos&quot;">​</a></h2><p>Como puede ver en el ejemplo anterior, <code>{ { and } }</code> se utilizan para encapsular secciones de PHP que desea <em>hacer echo</em>. <em><code>{ { variable } }</code></em> es similar a <em><code>&lt;?= $variable ?&gt;</code></em> en PHP simple.</p><p>Sin embargo, hay un aspecto diferente, y es posible que ya lo hayas adivinado: <em>Blade</em> escapa todos los <em>echos</em> de forma predeterminada utilizando <code>htmlentities()</code> de PHP para proteger a tus usuarios de la inserción de <em>scripts</em> maliciosos. Eso significa que <code>{ { $variable } }</code> es funcionalmente equivalente a <code>&lt;?= htmlentities($variable) ?&gt;</code>. Si quieres hacer <em>echo</em> sin el escape, utiliza <code>{!!and !!}</code> en su lugar.</p><blockquote><p><strong><code>{ { and } }</code> Cuando se Utiliza un Framework de Plantillas de Interfaz de Usuario</strong></p><p>Es posible que hayas notado que la sintaxis de <em>echo</em> para <em>Blade</em> (<code>{ { } }</code>) es similar a la sintaxis de <em>echo</em> para muchos frameworks <em>frontend</em>. Entonces, ¿cómo sabe Laravel cuándo estás escribiendo <em>Blade</em> o <em>Handlebars</em>?</p><p><em>Blade</em> ignorará cualquier <code>{ {</code> que esté precedido por un <code>@</code>. Por lo tanto, analizará el primero de los siguientes ejemplos, pero el segundo se &gt;reproducirá directamente:</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Parsed as Blade; the value of $bladeVariable is echoed to the view</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{{ $bladeVariable }}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// @ is removed and &quot;{{ handlebarsVariable }}&quot; echoed to the view directly</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{{ </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">handlebarsVariable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span></code></pre></div><p>También puedes envolver cualquier sección grande de contenido de <em>script</em> con la <a href="https://laravel.com/docs/11.x/blade#the-at-verbatim-directive" target="_blank" rel="noreferrer"><code>directiva @verbatim</code></a>.</p></blockquote>`,14),o=[l];function t(d,r,c,p,m,h){return s(),a("div",null,o)}const k=e(n,[["render",t]]);export{g as __pageData,k as default};

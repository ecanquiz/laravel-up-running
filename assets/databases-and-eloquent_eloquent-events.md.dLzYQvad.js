import{_ as s,c as e,o as a,V as i}from"./chunks/framework.D9sOcAzr.js";const u=JSON.parse('{"title":"Eventos Elocuentes","description":"","frontmatter":{},"headers":[],"relativePath":"databases-and-eloquent/eloquent-events.md","filePath":"databases-and-eloquent/eloquent-events.md"}'),n={name:"databases-and-eloquent/eloquent-events.md"},t=i(`<h1 id="eventos-elocuentes" tabindex="-1">Eventos Elocuentes <a class="header-anchor" href="#eventos-elocuentes" aria-label="Permalink to &quot;Eventos Elocuentes&quot;">​</a></h1><p>Los modelos Eloquent lanzan eventos al vacío de tu aplicación cada vez que ocurren ciertas acciones, independientemente de si estás detectando. Si estás familiarizado con pub/sub, se trata del mismo modelo (<a href="./../queues-jobs-events-broadcasting-and-the-scheduler/queques.html">equí aprenderás más sobre todo el sistema de eventos de Laravel</a>).</p><p>A continuación, se muestra un resumen rápido de cómo vincular un detector cuando se crea un nuevo <code>Contact</code>. Lo vincularemos en el método <code>boot()</code> de <code>AppServiceProvider</code> e imaginemos que estamos notificando a un servicio de terceros cada vez que creamos un nuevo <code>Contact</code> (ejemplo siguiente).</p><p><em>Vincular un detector a un evento Eloquent</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AppServiceProvider</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ServiceProvider</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> boot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        $thirdPartyService </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SomeThirdPartyService</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Contact</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">creating</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ($contact) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ($thirdPartyService) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                $thirdPartyService</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addContact</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($contact);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $e) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                Log</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Failed adding contact to ThirdPartyService; canceled.&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Cancels Eloquent create()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre></div><p>Podemos ver algunas cosas en el ejemplo anterior. Primero, usamos <code>Modelname::eventName()</code> como método y le pasamos una clausura. La clausura obtiene acceso a la instancia del modelo en la que se está operando. Segundo, vamos a necesitar definir este receptor en un proveedor de servicios en algún lugar. Y tercero, si devolvemos <code>false</code>, la operación se cancelará y <code>save()</code> o <code>update()</code> se cancelarán.</p><p>Estos son los eventos que cada modelo Eloquent dispara:</p><p>• <code>creating</code> • <code>created</code> • <code>updating</code> • <code>updated</code> • <code>saving</code> • <code>saved</code> • <code>deleting</code> • <code>deleted</code> • <code>restoring</code> • <code>restored</code> • <code>retrieved</code></p><p>La mayoría de estos deberían ser bastante claros, excepto posiblemente <code>restoring</code> y <code>restored</code>, que se disparan cuando se restaura una fila eliminada-suavemente. Además, <code>saving</code> se dispara tanto para <code>creating</code> como para <code>updating</code> y <code>saved</code> se dispara tanto para <code>created</code> como para <code>updated</code>.</p><p>El evento <code>retrieved</code> se dispara cuando se recupera un modelo existente de la base de datos.</p>`,10),o=[t];function d(l,p,c,r,h,k){return a(),e("div",null,o)}const g=s(n,[["render",d]]);export{u as __pageData,g as default};

import{_ as e,c as i,o as a,V as s}from"./chunks/framework.D9sOcAzr.js";const m=JSON.parse('{"title":"Vincular Modelo de Ruta","description":"","frontmatter":{},"headers":[],"relativePath":"routing-and-controllers/route-model-binding.md","filePath":"routing-and-controllers/route-model-binding.md"}'),n={name:"routing-and-controllers/route-model-binding.md"},t=s(`<h1 id="vincular-modelo-de-ruta" tabindex="-1">Vincular Modelo de Ruta <a class="header-anchor" href="#vincular-modelo-de-ruta" aria-label="Permalink to &quot;Vincular Modelo de Ruta&quot;">​</a></h1><p>Uno de los patrones de enrutamiento más comunes es que la primera línea de cualquier método de controlador intenta encontrar el recurso con el ID dado, como en el ejemplo siguiente.</p><p><em>Obtener un recurso para cada ruta</em></p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Route</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;conferences/{id}&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ($id) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    $conference </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Conference</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">findOrFail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($id);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>Laravel ofrece una característica que simplifica este patrón llamada <em>vínculo de modelo de ruta</em>. Esto le permite definir que un nombre de parámetro en particular (por ejemplo, <code>{conference}</code>) le indicará al solucionador de ruta que debe buscar un registro de base de datos de Eloquent con ese ID y luego pasarlo como parámetro <em>en lugar</em> de simplemente pasar el ID.</p><p>Hay dos tipos de enlace de modelo de ruta: implícito y personalizado (o explícito).</p><h2 id="implicit-route-model-binding" tabindex="-1">Implicit Route Model Binding <a class="header-anchor" href="#implicit-route-model-binding" aria-label="Permalink to &quot;Implicit Route Model Binding&quot;">​</a></h2>`,7),o=[t];function l(r,d,p,c,h,u){return a(),i("div",null,o)}const g=e(n,[["render",l]]);export{m as __pageData,g as default};

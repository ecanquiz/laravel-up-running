# Protección CSRF

Si ya ha intentado enviar un formulario en una aplicación de Laravel, incluida la del [ejemplo anterior](./form-method-spoofing.html#suplantacion-de-metodos-http-en-formularios-html), es probable que se haya encontrado con la temida `TokenMismatchException`.

De manera predeterminada, todas las rutas en Laravel, excepto las rutas de "solo lectura" (aquellas que usan `GET`, `HEAD` u `OPTIONS`), están protegidas contra ataques de falsificación de solicitud entre sitios (CSRF) al requerir que se pase un token, en forma de una entrada llamada `_token`, junto con cada solicitud. Este token se genera al comienzo de cada sesión, y cada ruta que no sea de solo lectura compara el `_token` enviado con el token de la sesión.

:::info ¿Qué es CSRF? (_cross-site request forgery_)

Una _falsificación de solicitud entre sitios_ es cuando un sitio web se hace pasar por otro. El objetivo es que alguien secuestre el acceso de sus usuarios a su sitio web enviando formularios desde su sitio web al suyo a través del navegador del usuario que ha iniciado sesión.

La mejor forma de evitar los ataques CSRF es proteger todas las rutas entrantes (`POST`, `DELETE`, etc.) con un token, algo que Laravel hace fuera de caja.
:::

Tiene dos opciones para evitar este error CSRF. El primer método, y el preferido, es agregar la entrada `_token` a cada uno de sus envíos. En los formularios HTML, hay una forma sencilla de hacerlo, como puede ver en el ejemplo siguiente.

_Tokens CSRF_
```html
<form action="/tasks/5" method="POST">
    @csrf
</form>
```

En las aplicaciones de JavaScript, requiere un poco más de trabajo, pero no mucho. La solución más común para los sitios que utilizan marcos de JavaScript es almacenar el token en cada página en una etiqueta `<meta>` como esta:

```html
<meta name="csrf-token" content="<?php echo csrf_token(); ?>">
```

Almacenar el token en una etiqueta `<meta>` facilita vincularlo al encabezado HTTP correcto, lo que puede hacer una vez de manera global para todas las solicitudes de su marco de JavaScript, como en el ejemplo siguiente.

_Vinculación global de un encabezado para CSRF_
```js
// In jQuery:
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// With Axios: it automatically retrieves it from a cookie. Nothing to do!
```

Laravel verificará el `X-CSRF-TOKEN` (y el `X-XSRF-TOKEN`, que usan Axios y otros frameworks de JavaScript como Angular) en cada solicitud, y los tokens válidos pasados ​​allí marcarán la protección CSRF como satisfecha.



:::info Vincular tokens CSRF con Vue Resource
La incorporación del token CSRF a Vue Resource es un poco diferente a la de Laravel; consulte la [documentación de Vue Resource](https://github.com/pagekit/vue-resource/tree/develop/docs#documentation) para ver ejemplos.
:::

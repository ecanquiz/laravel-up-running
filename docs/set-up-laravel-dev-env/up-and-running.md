# En Marcha

Ahora estás listo en funcionamiento con una instalación básica de Laravel. Ejecuta `git init`, confirma los archivos con `git add .` y `git commit`, y ya estás listo para comenzar a codificar. ¡Eso es todo! Y si estás usando Valet, puedes ejecutar los siguientes comandos y ver tu sitio en vivo al instante en tu navegador:

```sh
laravel new myProject && cd myProject && valet open
```

Cada vez que comienzo un nuevo proyecto, estos son los pasos que sigo:


```sh
laravel new myProject
cd myProject
git init
git add .
git commit -m "Initial commit"
```

Mantengo todos mis sitios en una carpeta `~/Sites`, que he configurado como mi directorio principal de Valet, por lo que en este caso tendría `myProject.test` accesible instantáneamente en mi navegador sin trabajo adicional. Puedo editar `.env` y apuntarlo a una base de datos en particular, agregar esa base de datos en mi aplicación MySQL y estoy listo para comenzar a codificar.
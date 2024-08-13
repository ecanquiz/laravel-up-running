# Creando un Nuevo Proyecto Laravel

Hay dos formas de crear un nuevo proyecto de Laravel, ambas se ejecutan desde la línea de comandos. La primera opción es instalar globalmente la herramienta de instalación de Laravel (usando Composer); la segunda es usar la función `create-project` de Composer.

Puede obtener más información sobre ambas opciones en detalle en la [página de documentación de instalación](https://laravel.com/docs/11.x/installation), pero le recomiendo la herramienta de instalación de Laravel.

## Instalación de Laravel con la Herramienta de Instalación de Laravel

Si tiene Composer instalado globalmente, instalar la herramienta de instalación de Laravel es tan simple como ejecutar el siguiente comando:

```sh
composer global require "laravel/installer"
```

Una vez que haya instalado la herramienta de instalación de Laravel, iniciar un nuevo proyecto de Laravel es sencillo. Simplemente ejecute este comando desde la línea de comandos:


```sh
laravel new projectName
```

Esto creará un nuevo subdirectorio de su directorio actual llamado _{projectName}_ e instalará un proyecto Laravel básico en él.

## Instalación de Laravel con la función `create-project` de Composer

Composer también ofrece una función llamada `create-project` para crear nuevos proyectos con un esqueleto particular. Para usar esta herramienta para crear un nuevo proyecto de Laravel, ejecute el siguiente comando:


```sh
composer create-project laravel/laravel projectName
```

Al igual que la herramienta de instalación, esto creará un subdirectorio de su directorio actual llamado _{projectName}_ que contiene un esqueleto de instalación de Laravel, listo para que lo desarrolle.

## Instalación de Laravel con Sail

Si planea trabajar con Laravel Sail, puede instalar una aplicación de Laravel y comenzar el proceso de instalación de Sail al mismo tiempo. Asegúrese de tener Docker instalado en su computadora y luego ejecute el siguiente comando, reemplazando _example-app_ con el nombre de su aplicación:


```sh
curl -s "https://laravel.build/example-app" | bash
```

Esto instalará Laravel en la carpeta _example-app_ debajo de su carpeta actual y luego comenzará el proceso de instalación de Sail.

Una vez que se complete el proceso de instalación, cambie a su nuevo directorio e inicie Sail:


```sh
cd example-app
./vendor/bin/sail up
```
:::info
La primera vez que ejecutes `sail up`, tardará bastante más que otros procesos de instalación, ya que necesita crear la imagen inicial de Docker.
:::

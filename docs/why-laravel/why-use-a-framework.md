
# ¿Por qué Laravel?

En los primeros días de la web dinámica, escribir una aplicación web era muy diferente a lo que es hoy. Luego, los desarrolladores fueron responsables de escribir el código no solo para la lógica empresarial única de nuestras aplicaciones, sino también para cada uno de los componentes que son tan comunes en todos los sitios: autenticación de usuarios, validación de entradas, acceso a bases de datos, plantillas y más.

Hoy en día, los programadores tienen docenas de frameworks de desarrollo de aplicaciones y miles de componentes y bibliotecas de fácil acceso. Es un estribillo común entre los programadores que, cuando aprendes un framework, han aparecido tres frameworks más nuevos (y supuestamente mejores) con la intención de reemplazarlo.

>“Sólo porque está ahí” podría ser una justificación válida para escalar una montaña, pero hay mejores razones para optar por utilizar un framework específico, o utilizar un framework en absoluto. Vale la pena preguntarse: ¿por qué los frameworks? Más específicamente, ¿por qué Laravel?

## ¿Por qué utilizar un framework?

Es fácil ver por qué es beneficioso utilizar los componentes o paquetes individuales que están disponibles para los desarrolladores de PHP. Con los paquetes, otra persona es responsable de desarrollar y mantener una pieza de código aislada que tiene un trabajo bien definido y, en teoría, esa persona tiene una comprensión más profunda de este componente único de la que usted tiene tiempo para tener.

Frameworks como Laravel (y Symfony, Lumen y Slim) empaquetan previamente una colección de componentes de terceros junto con un "pegamento" de framework personalizado, como archivos de configuración, proveedores de servicios, estructuras de directorios prescritas y programas de arranque de aplicaciones.

Entonces, el beneficio de usar un framework en general es que alguien ha tomado decisiones no solo sobre los componentes individuales por usted, sino también sobre _cómo esos componentes deben encajar entre sí_.

## _"Lo construiré yo mismo"_

Supongamos que inicia una nueva aplicación web sin el beneficio de un framework. ¿Por dónde empiezas? Bueno, probablemente debería enrutar las solicitudes HTTP, por lo que ahora necesita evaluar todas las bibliotecas de solicitudes y respuestas HTTP disponibles y elegir una. Entonces tendrás que elegir un enrutador. Ah, y probablemente necesitarás configurar algún tipo de archivo de configuración de rutas. ¿Qué sintaxis debería utilizar? ¿A dónde debería ir? ¿Qué pasa con los controladores? ¿Dónde viven y cómo se cargan? Bueno, probablemente necesites un contenedor de inyección de dependencias para resolver los controladores y sus dependencias. ¿Pero cual?

Además, si se toma el tiempo para responder todas esas preguntas y crear su aplicación con éxito, ¿cuál será el impacto en el próximo desarrollador? ¿Qué pasa cuando tienes cuatro aplicaciones basadas en frameworks personalizados, o una docena, y tienes que recordar dónde viven los controladores en cada una o cuál es la sintaxis de enrutamiento?


## Consistencia y flexibilidad

Los frameworks abordan este problema proporcionando una respuesta cuidadosamente considerada a la pregunta "¿Qué componente deberíamos usar aquí?" y garantizar que los componentes particulares elegidos funcionen bien juntos. Además, los frameworks proporcionan convenciones que reducen la cantidad de código que un desarrollador nuevo en el proyecto debe comprender; si comprende cómo funciona el enrutamiento en un proyecto de Laravel, por ejemplo, comprenderá cómo funciona en todos los proyectos de Laravel.

Cuando alguien prescribe implementar su propio framework para cada nuevo proyecto, lo que realmente está defendiendo es la capacidad de controlar lo que se incluye y lo que no en la base de su aplicación. Eso significa que los mejores frameworks no sólo le proporcionarán una base sólida, sino que también le darán la libertad de personalizarlos a su gusto. Y esto, como te mostraré en el resto de este libro, es parte de lo que hace que Laravel sea tan especial.

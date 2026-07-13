# Retrospectiva - Sprint 1

Dinámica de la Estrella de Mar:

1. **Comenzar a hacer:** Establecer bloques de tiempo (timeboxing) más estrictos para no sobre-analizar los wireframes.
2. **Hacer más:** Aprovechar herramientas de IA y recursos de la comunidad para agilizar tareas estructurales repetitivas.
3. **Continuar haciendo:** Mantener el enfoque directo en los requisitos de evaluación para cumplir con las fechas de entrega.
4. **Hacer menos:** Preocuparme por detalles estéticos menores en etapas de pura planificación.
5. **Dejar de hacer:** Postergar la creación del repositorio hasta el final del sprint.

## Retrospectiva - Sprint 2
Dinámica de la Estrella de Mar:

1. **Comenzar a hacer:** Apoyarme directamente en la documentación oficial de Express y EJS para estructurar la arquitectura del servidor, priorizando entender la lógica de la herramienta por sobre la generación automática de código.
2. **Hacer más:** Mantener el flujo ágil de control de versiones utilizando comandos de Git directamente desde la terminal del sistema para agilizar las entregas de cada vista.
3. **Continuar haciendo:** Escribir código puro (como la maquetación Vanilla CSS de las vistas) para afianzar las bases tecnológicas, manteniendo el entorno de desarrollo ligero y sin dependencias innecesarias.
4. **Hacer menos:** Repetir bloques de código estructural, como las barras de navegación, preparándome para modularizar el proyecto y delegar esa carga al motor de plantillas.
5. **Dejar de hacer:** Mantener todos los archivos en un solo nivel jerárquico; es imperativo empezar a organizar el proyecto dentro de directorios específicos (`src/views/`) para escalar el backend de forma ordenada.

## Retrospectiva - Sprint 3
Dinámica de la Estrella de Mar:

1. **Comenzar a hacer:** Implementar archivos `partials` desde la etapa de maquetación temprana, evitando así la refactorización masiva de código repetido en múltiples vistas.
2. **Hacer más:** Estricta organización de directorios (`src/views/products/`, `src/views/users/`) desde el día uno, facilitando la escalabilidad del backend al integrar nuevas rutas.
3. **Continuar haciendo:** Mantener la consistencia en el uso de extensiones `.ejs` y la correcta configuración del motor de templates en `app.js` para asegurar que el servidor renderice dinámicamente sin errores.
4. **Hacer menos:** Realizar configuraciones de rutas manualmente sin antes validar la estructura de archivos en el explorador, evitando confusiones con los niveles de directorios y los `../`.
5. **Dejar de hacer:** Ignorar la sintaxis propia del motor de plantillas en el editor de código; instalar extensiones de soporte (como *EJS language support*) es fundamental para detectar errores de sintaxis a tiempo.

## Retrospectiva - Sprint 4
Dinámica de la Estrella de Mar:

1. **Comenzar a hacer:** Configurar la arquitectura de middlewares como `method-override` desde el inicio de la etapa de ruteo para evitar bloqueos al implementar operaciones PUT y DELETE en formularios.
2. **Hacer más:** Separar la lógica de lectura y escritura de archivos (usando el módulo nativo `fs` de Node.js) en funciones reutilizables dentro del controlador para mantener el código más limpio.
3. **Continuar haciendo:** Probar rigurosamente las rutas RESTful una por una mediante la consola y el navegador, asegurando que la lógica del servidor funcione a la perfección antes de preocuparse por la interfaz.
4. **Hacer menos:** Depender de datos hardcodeados en las vistas EJS; toda la información debe fluir estrictamente de manera dinámica desde los archivos JSON, respetando el patrón MVC.
5. **Dejar de hacer:** Asumir que los formularios HTML nativos soportan todos los verbos HTTP; tener presente que solo procesan GET y POST es clave para no perder tiempo diagnosticando errores de ruteo falsos.

## Retrospectiva - Sprint 5
Dinámica de la Estrella de Mar:

1. **Comenzar a hacer:** Prestar máxima atención a los niveles de las rutas relativas (`../../`) al separar la lógica hacia los controladores, y verificar rigurosamente que los nombres de los archivos físicos coincidan exactamente con las importaciones `require()` para evitar que Node.js arroje errores de módulos no encontrados.
2. **Hacer más:** Implementar `console.log()` de forma estratégica dentro de las funciones del backend para rastrear el flujo de datos (como contraseñas y correos), recordando siempre que la consola del navegador es ciega a los procesos internos del servidor.
3. **Continuar haciendo:** Construir y analizar manualmente la lógica compleja de autenticación (como la encriptación de contraseñas y la inyección de sesiones globales en las vistas), priorizando el desarrollo del razonamiento analítico y el manejo de la documentación oficial.
4. **Hacer menos:** Probar el flujo en el navegador sin antes confirmar el guardado absoluto de los archivos involucrados y el reinicio del servidor, evitando perder tiempo diagnosticando fallos ilusorios por correr código antiguo en la memoria de Node.
5. **Dejar de hacer:** Asumir que una recarga silenciosa de la página es un error del HTML; interiorizar que en un patrón MVC, estas acciones suelen ser el resultado de redireccionamientos y validaciones estrictas (como fallos de *hash* o middlewares actuando) ejecutadas intencionalmente por el servidor.

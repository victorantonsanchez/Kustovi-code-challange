## Comentarios
- Se incluye una colección de postman con los endpoints a probar. El nombre del archivo es *Kustovi code challenge.postman_collection.json*.
- Para poder guardar la información en Firebase es necesario agregar la configuración de la cuenta en el archivo *config.js > providers > firebase*
- El usuario se identifica mediante la estrategia passport local "grant_type: password" para obtener el token de acceso.
- El usuario se identifica mediante la estrategia passport bearer para dar acceso a los endpoints privados.
- Solo se tiene en cuenta el authorization token en los endpoints de **create, update, delete films**, es decir solo comprobamos bearer token, no basic token.
- El token del usuario no se renueva y no se comprueba su caducidad.


## Comentarios sobre el punto 5 (Integración con las Functions de Firebase)
En el archivo *app-firebase.js* están los cambios sobre como realizar el despliegue en Functions de Firebase, es una aproximación ya que no está testado, era necesario actualizar la cuenta de Firebase para ello.

Además del cambio anterior también sería necesario realizar una adaptación en el archivo *src/providers/firebase.js* y realizar la inicialización de firebase de este modo:

```javascript
const app = firebase.initializeApp(
        functions.config().firebase
);
```
# Cómo usar Código QR

Código QR convierte cualquier link en un QR que puedes poner sobre tu stream: tu canal, tus redes, una encuesta o la página de un sorteo. Tus viewers lo escanean con el celular sin tener que copiar nada del chat.

## 1. Configura el widget

1. Abre el configurador.
2. Escribe la **URL de destino**: la dirección a la que llevará el QR, con `https://` al inicio. Si te falta, el configurador te ofrece agregarlo.
3. Personaliza el QR:
   - **Texto adicional** (opcional), arriba o abajo del QR, con su color, tamaño, fuente y un efecto de **sombra** o **contorno** para que se lea sobre cualquier escena. También puedes ponerle un **fondo detrás del texto**.
   - **Colores** del QR y de su fondo, o **fondo transparente**.
   - **Tamaño**, **margen** y **bordes redondeados**.
   - **Animación**: fijo o con entrada y repetición (ver más abajo).
4. Revisa la vista previa. Se muestra a tamaño real y el fondo a cuadros es la transparencia que verás en OBS. Escanéala con tu celular para comprobar que lleva al link correcto.
5. Pulsa **Copiar** para copiar el link del widget.

### Modos de animación

- **Fijo**: el QR está visible todo el tiempo.
- **Entrada + repetición**: el QR aparece con un efecto (desvanecer, deslizar o zoom), queda visible los segundos que elijas y vuelve a aparecer cada cierta cantidad de minutos, contados desde el inicio de una aparición hasta el de la siguiente. Sirve para recordar el link de vez en cuando sin tapar la escena todo el stream. En la vista previa, el botón **Reproducir animación** te deja ver la entrada otra vez.

### Avisos del configurador

Mientras configuras, el configurador te avisa si algo puede impedir que el QR se escanee:

- **Contraste bajo**: el color del QR y el de su fondo se parecen demasiado. Lo más seguro es un QR oscuro sobre fondo claro. Si usas **fondo transparente**, el QR se lee sobre lo que haya detrás en tu escena, así que revisa que contraste bien.
- **QR invertido** (claro sobre oscuro): algunos lectores no lo reconocen.
- **QR muy denso**: el link es largo para el tamaño elegido y los cuadritos del código quedan muy chicos para leerse desde el stream. Aumenta el tamaño o usa un link más corto.
- **Margen muy pequeño**: los lectores necesitan un borde libre alrededor del código. Sube el margen al valor que indica el aviso.
- **El QR no llega a ocultarse**: en *Entrada + repetición*, el tiempo visible cubre todo el ciclo.

## 2. Agrégalo a OBS

1. En OBS, en el panel **Fuentes**, pulsa **+** y elige **Navegador**.
2. Pega el link en **URL**.
3. Usa el ancho y alto que indica el configurador en "Cómo agregarlo en OBS". Ese tamaño cambia según el tamaño del QR, el margen y el texto, así que usa el de tu configuración: el tamaño de esta documentación corresponde solo al QR de ejemplo.
4. Si usas *Entrada + repetición*, marca **Actualizar navegador cuando la escena se active** para que el QR aparezca cada vez que entras a la escena.
5. Acepta y ubica el QR en tu escena. El fondo es transparente: no necesitas CSS personalizado.

## Cambiar un QR que ya está en OBS

Toda la configuración va dentro del link. Para cambiar el destino, los colores o cualquier otra opción, vuelve al configurador, haz los cambios, copia el link nuevo y reemplázalo en la **URL** de la fuente.

## Problemas comunes

**El QR no se escanea desde el stream.**
Los viewers ven tu stream comprimido y muchas veces en una pantalla chica. Aumenta el **tamaño** del QR, deja un **margen** suficiente, usa colores con buen contraste (oscuro sobre claro) y, si el link es muy largo, usa uno más corto. Revisa que el configurador no muestre avisos.

**La fuente del texto no se ve como en el configurador.**
Las fuentes se descargan de internet al cargar el widget. Si OBS no tiene conexión en ese momento, el texto usa una fuente genérica. Con la conexión de vuelta, haz clic derecho en la fuente → **Propiedades** → **Actualizar caché de la página actual**.

**El widget se ve vacío.**
Al link le falta la URL de destino. Vuelve al configurador, escríbela y copia el link de nuevo.

**El fondo no se ve transparente.**
Revisa que la fuente sea de tipo **Navegador**, que no tenga CSS personalizado con color de fondo y, si quieres que tampoco se vea el recuadro del QR, activa **Fondo transparente**.

**El QR se ve cortado.**
La fuente es más chica que el widget. Usa el tamaño que sugiere el configurador para tu configuración.

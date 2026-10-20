# QR Widget para OBS

Herramienta web que convierte una URL en un código QR listo para usar como **Browser Source en OBS**. Toda la configuración viaja en la URL del widget: sin backend ni base de datos.

## Uso en OBS

1. Abre el configurador, escribe la URL de destino y personaliza el QR (texto, colores, tamaño, fuente, animación). La vista previa muestra exactamente lo que verá OBS.
2. Pulsa **Copiar** para copiar el link del widget.
3. En OBS, en el panel **Fuentes**, pulsa **+** → **Navegador**.
4. Pega el link en **URL** y usa el tamaño sugerido que muestra el configurador en "Cómo agregarlo en OBS".
5. Acepta y ubica el QR en la escena. El fondo es transparente.

Para cambiar algo, genera un link nuevo en el configurador y reemplázalo en la fuente.

**Modos de animación:**

- **Fijo**: el QR está visible todo el tiempo.
- **Entrada + repetición**: aparece con un efecto (desvanecer, deslizar o zoom), queda visible _X_ segundos y vuelve a aparecer cada _Y_ minutos (contados de inicio a inicio).

El configurador avisa si la URL no es válida o no cabe en un QR, si el contraste de colores es bajo, si el QR queda demasiado denso para su tamaño o si el margen es muy pequeño para escanearlo.

## Parámetros de la URL

El widget vive en `/widget` y lee su configuración de la query string. Los parámetros ausentes o inválidos usan su valor por defecto, los números fuera de rango se ajustan al límite, y solo se escriben en el link los valores distintos del default.

| Parámetro | Campo                       | Valores                                                                                                                    | Default  |
| --------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| `u`       | URL de destino del QR       | texto (máx. 2048 caracteres y 2331 bytes)                                                                                  | —        |
| `t`       | Texto adicional             | texto (máx. 120 caracteres)                                                                                                | vacío    |
| `pos`     | Posición del texto          | `top` · `bottom`                                                                                                           | `bottom` |
| `tc`      | Color del texto             | hex sin `#` (`fff` o `ffffff`)                                                                                             | `ffffff` |
| `fs`      | Tamaño del texto (px)       | 12–120                                                                                                                     | `28`     |
| `ff`      | Fuente                      | `inter` · `roboto` · `montserrat` · `poppins` · `rubik` · `space-grotesk` · `oswald` · `bebas-neue` · `russo-one` · `orbitron` · `bangers` · `press-start-2p` | `inter`  |
| `te`      | Efecto del texto            | `none` · `shadow` · `outline`                                                                                              | `none`   |
| `tp`      | Fondo detrás del texto      | `1` · `0`                                                                                                                  | `0`      |
| `pc`      | Color del fondo del texto   | hex sin `#`                                                                                                                | `000000` |
| `qc`      | Color del QR                | hex sin `#`                                                                                                                | `000000` |
| `qb`      | Color de fondo del QR       | hex sin `#`                                                                                                                | `ffffff` |
| `qt`      | Fondo del QR transparente   | `1` · `0`                                                                                                                  | `0`      |
| `qs`      | Tamaño del QR (px)          | 64–1024                                                                                                                    | `256`    |
| `qp`      | Margen alrededor del QR (px)| 0–64                                                                                                                       | `16`     |
| `qr`      | Radio de los bordes (px)    | 0–64                                                                                                                       | `12`     |
| `an`      | Modo de animación           | `static` · `loop`                                                                                                          | `static` |
| `ae`      | Efecto de la animación      | `fade` · `slide` · `zoom`                                                                                                  | `fade`   |
| `vs`      | Visible durante (s)         | 3–600                                                                                                                      | `15`     |
| `rm`      | Aparece cada (min)          | 1–120                                                                                                                      | `5`      |

Ejemplo:

```
/widget?u=https%3A%2F%2Ftwitch.tv%2Ftu-canal&t=%C2%A1S%C3%ADgueme!&ff=bebas-neue&tp=1&an=loop&ae=slide
```

> ⚠️ No renombres un parámetro existente: rompería los links ya pegados en OBS. Para algo nuevo, agrega un parámetro.

## Desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de producción en dist/
npm run lint       # oxlint
npm run format     # prettier
npm test           # vitest
```

## Deploy

Sitio 100% estático en **Netlify**, configurado en `netlify.toml`: build `npm run build`, publish `dist` y Node 24. El redirect SPA (`/* /index.html 200`) hace que `/widget?...` funcione al cargarlo directo desde OBS. Los headers de seguridad permiten embeber el sitio solo en sí mismo y en [Stream Toolkit](https://streams-toolkit.netlify.app) (`frame-ancestors`); OBS no se ve afectado porque una fuente de navegador no es un iframe.

## Estructura

El código se organiza por **dominio**: todo lo que pertenece a una feature (páginas, componentes, hooks, lógica, estilos y tests) vive dentro de su carpeta.

```
src/
  app/                  # Arranque de la app: router, providers y estilos globales
    styles/
  features/
    configurator/       # Pantalla principal: formulario, vista previa, link generado
    widget/             # Ruta /widget que carga OBS + componente QrWidget
    widget-config/      # Esquema de configuración, defaults y (de)serialización de la URL
    theme/              # Tema claro/oscuro del configurador: tokens, useTheme, ThemeToggle
    fonts/              # Lista curada de Google Fonts y carga bajo demanda
  shared/               # Código genérico sin dominio usado por 2+ features
    lib/                # utilidades (color)
    ui/                 # estilos de UI compartidos (botones)
  main.tsx
```

Dentro de cada feature se usan subcarpetas según lo que haga falta: `pages/`, `components/`, `hooks/`, `lib/`.

**Reglas:**

- Cada feature expone su API pública en su `index.ts`. Desde fuera de la feature se importa solo desde ahí (`@/features/widget`), nunca desde sus archivos internos.
  - Única excepción: las hojas de estilo globales de una feature (p. ej. `features/theme/styles/theme.css`) se importan una vez desde `main.tsx`, para que carguen con el primer paint.
- Algo va en `shared/` solo si no pertenece a ningún dominio y lo usan dos o más features.
- `features/widget` se mantiene liviano porque lo carga OBS: no debe importar nada del configurador.
- Los tests van junto al archivo que prueban (`serialize.ts` → `serialize.test.ts`).
- El alias `@/` apunta a `src/`.
- El tema (tokens, colores, tipografía) se aplica solo bajo `[data-theme]`. El script inline de `index.html` no lo pone en `/widget`: **nunca** pongas `background` en `:root`, `html` o `body` sin ese selector, porque rompería la transparencia en OBS.

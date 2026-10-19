# QR Widget para OBS

Herramienta web que convierte una URL en un código QR listo para usar como **Browser Source en OBS**. Toda la configuración viaja en la URL del widget: sin backend ni base de datos.

## Desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de producción en dist/
npm run lint       # oxlint
npm run format     # prettier
npm test           # vitest
```

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

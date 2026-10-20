# MoonValley — instrucciones para Claude

Web estática de **Moon Valley Tours** (HTML + CSS + JS vanilla, sin build).
Publicada en GitHub Pages / Netlify. El usuario habla español: responde en español.

## Memoria entre conversaciones (OBLIGATORIO)

1. **Al empezar** cualquier sesión, lee `MEMORIA.md` para saber en qué se estaba trabajando.
2. **Al terminar** una tarea (antes del commit final), añade una entrada corta a `MEMORIA.md`
   (fecha, qué se hizo, archivos tocados, pendientes). Máximo 5 líneas por entrada.
3. Si `MEMORIA.md` supera ~150 líneas, resume las entradas antiguas en la sección
   "Resumen histórico" para que siga siendo barato de leer.

## Ahorro de tokens (reglas)

- **NO leer nunca** (están bloqueados en `.claude/settings.json`):
  - `3D Print Cost Calculator App - standalone.html` (1,3 MB, app aparte, no es parte de la web)
  - `single-file-version.html` (419 KB, versión exportada en un solo archivo)
- **`js/app.js` (149 KB)**: no leerlo entero. Las líneas 31 (`DESTS`) y 32 (`TOURS`, 82.000
  caracteres en una sola línea) son datos JSON enormes: usa `grep` o un script para consultarlas.
  Lee solo el rango de líneas de la función que necesites (ver mapa abajo).
- No abrir imágenes de `assets/` salvo que se pida.
- Hacer cambios concretos y mínimos; no "revisar todo el proyecto" sin necesidad.
- No lanzar subagentes salvo que el usuario lo pida.

## Mapa del proyecto

| Archivo | Contenido |
|---|---|
| `index.html` | Inicio: hero, destinos, tours destacados |
| `programs.html` | Todos los tours + búsqueda + filtros + modal |
| `prices.html` | Tabla de precios (EUR) |
| `booking.html` | Formulario de reserva → WhatsApp / email |
| `gallery.html` | Galería + lightbox |
| `about.html`, `contact.html` | Sobre nosotros, contacto, mapa, FAQ |
| `admin.html` | Panel de administración (v2.0) |
| `css/style.css` | Sistema de diseño "Celestial Premium" |
| `js/app.js` | Datos + traducciones + lógica de todas las páginas |

### `js/app.js` (números de línea aproximados)

- 13 `CONFIG` (email, WhatsApp, teléfono) — único sitio para datos de contacto
- 31 `DESTS`, 32 `TOURS` — datos (líneas gigantes, usar grep)
- 47–464 `I18N` — traducciones en 4 idiomas: `en`, `tr`, `ar`, `es`
- 465–490 idioma (`getLang`, `setLang`, `applyI18n`, clave `mv-lang` en localStorage)
- 528 `initShell` · 582 `tourCard` · 640 `openTourModal`
- 731 `initHome` · 784 `initPrograms` · 839 `initPrices` · 860 `initBooking`
- 982 `initGallery` · 1055 `initContact`

## Convenciones

- Sin frameworks ni dependencias nuevas.
- Todo texto visible debe existir en los 4 idiomas de `I18N`.
- Precios: niños 3–7 años −30 %, bebés 0–2 gratis.
- Probar localmente con `python3 -m http.server 8000`.

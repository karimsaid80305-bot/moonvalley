# Memoria del proyecto

Registro breve del trabajo hecho, para retomar en conversaciones nuevas.
La entrada más reciente va arriba. Claude la actualiza al terminar cada tarea.

## Pendientes / ideas abiertas

- Confirmar los números de WhatsApp/teléfono de `CONFIG` en `js/app.js` antes de lanzar.
- Decidir si `3D Print Cost Calculator App - standalone.html` debe vivir en otro repo
  (no forma parte de la web de Moon Valley).

## Registro

### 2026-10-20 — Ahorro de tokens y memoria
- Análisis de consumo de tokens: archivos HTML gigantes, `app.js` con líneas de 82 KB,
  demasiados conectores/plugins activos y conversaciones largas.
- Creados `CLAUDE.md` (reglas + mapa del proyecto), `MEMORIA.md` (este archivo) y
  `.claude/settings.json` (bloquea la lectura de los dos HTML gigantes).

### 2026-08-09 — Calculadora de impresión 3D
- Subido `3D Print Cost Calculator App - standalone.html` (app independiente, 1,3 MB).

## Resumen histórico (reconstruido del historial de git)

- **v1.0**: web completa de MoonValley Tours: 30 tours, 10 destinos, EN/TR, reservas por
  WhatsApp/email, galería, SEO (JSON-LD, sitemap), despliegue en GitHub Pages
  (`.nojekyll`, sitemap con URLs reales).
- **2026-06-13 — v2.0**: 4 idiomas (EN/TR/AR/ES), datos de contacto actualizados, panel
  `admin.html`. Arreglo: selector de idioma fuera del menú, siempre visible en la cabecera.

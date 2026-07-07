# 🤖 ANIMI — Master Prompt & Roadmap

## Descripción del proyecto
Animi es una app de asistente personal con personajes animados (Kira, Ryo, Mochi) que vive en la pantalla del celular del usuario como un overlay flotante. El personaje ayuda al usuario con sus tareas diarias, responde por voz, gestiona sus apps y protege su privacidad.

---

## Personajes
| Personaje | Tipo | Personalidad |
|-----------|------|-------------|
| Kira | Chica Anime | Amigable y energética |
| Ryo | Chico Anime | Serio y confiable |
| Mochi | Animal | Juguetón y curioso |

---

## Modelo de negocio
- **Gratis:** Funciones básicas (asistente, música, calendario)
- **Premium:** $3.99/mes (personalización avanzada, modo pareja, más personajes)

---

## Funciones planificadas

### ✅ Fase 1 — Base (en desarrollo)
- Overlay flotante con personaje animado
- Selector de personaje (Kira, Ryo, Mochi)
- Permiso SYSTEM_ALERT_WINDOW

### 🔐 Fase 2 — Seguridad y privacidad
1. **Protección contra hackeos:**
   - Cifrado de datos locales
   - Autenticación biométrica (huella/face ID)
   - Ofuscación del código APK con ProGuard
   - Detección de dispositivos rooteados

2. **Privacidad del usuario:**
   - Todos los datos se guardan SOLO en el celular del usuario (SQLite local)
   - NO se envían datos a servidores externos
   - Opción de eliminar todos los datos desde la app
   - Aviso claro: "Tus datos nunca salen de tu celular"

### 🎙️ Fase 3 — Asistente por voz
3. **Respuesta al llamado por voz:**
   - El usuario llama al personaje por su nombre: "Kira..."
   - Kira responde y ejecuta la acción solicitada
   - Ejemplos:
     - "Kira, reproduce la canción X" → abre reproductor/YouTube
     - "Kira, respóndele a mamá que llegaré a las 7" → abre WhatsApp, busca el contacto y envía el mensaje transcrito
     - "Kira, agrega al calendario reunión mañana a las 3pm" → crea el evento

4. **Gestión de mensajes:**
   - Avisa cuando llega mensaje nuevo con el icono de la app correspondiente (WhatsApp, Instagram, Gmail, etc.)
   - El usuario puede pedirle a Kira que responda el mensaje dictándole el texto
   - Compatible con: WhatsApp, Instagram, Gmail, y otras redes sociales

### 📅 Fase 4 — Calendario y recordatorios
5. **Gestión del calendario:**
   - Agrega actividades/eventos al calendario por voz
   - Te recuerda los eventos con una animación del personaje
   - Kira aparece con una notificación visual cuando hay un evento próximo

### 💑 Fase 5 — Modo Pareja (Premium)
6. **Vinculación entre dos usuarios:**
   - Dos usuarios pueden vincularse con un código único
   - Los personajes de ambos celulares se pueden comunicar
   - Funciones:
     - Enviarse rosas 🌹, besos 💋, corazones ❤️
     - Mensajes cortos entre personajes
     - Audios entre personajes
     - El personaje "entrega" el regalo con una animación especial
     - "Pensé en ti" → el personaje del otro celular reacciona

### 🎨 Fase 6 — Personalización (futuras versiones)
7. **Wallpapers:**
   - Descargar fondos de pantalla desde la app
   - Integración con ThemeForge AI Studio

### 🔒 Permisos con transparencia
8. **Sistema de permisos con mensaje del creador:**
   - Antes de acceder a apps sensibles (reproductor de video, galería, etc.) el personaje muestra un mensaje especial:
   - *"Mi creador piensa que el reproductor de video es algo muy personal, no tengo permitido entrar. Pero si me das permiso podré hacerlo"*
   - El usuario puede dar permiso:
     - Una sola vez
     - Siempre
     - Nunca

---

## Arquitectura técnica

### Stack
- **Frontend:** React Native + Expo SDK 57
- **Overlay:** Módulo nativo Android (Kotlin) con SYSTEM_ALERT_WINDOW
- **Base de datos local:** SQLite (expo-sqlite) — datos SOLO en el celular
- **Voz:** expo-speech + react-native-voice
- **IA:** Anthropic Claude API (para respuestas inteligentes)
- **Backend:** Supabase (solo para actualizaciones de la app, NO datos del usuario)

### Seguridad
- ProGuard para ofuscar el código
- expo-secure-store para datos sensibles
- Detección de root con react-native-root-checker
- Cifrado AES para la base de datos local

---

## Principios de diseño
1. **Privacidad primero:** Los datos del usuario NUNCA salen de su celular
2. **Transparencia:** El usuario siempre sabe qué hace el asistente
3. **Consentimiento:** Siempre pedir permiso antes de acceder a apps del usuario
4. **Personalidad:** El personaje tiene una voz y personalidad consistente
5. **El creador tiene valores:** El personaje refleja los valores del creador (respeto a la privacidad, honestidad)

---

## Frases especiales del personaje
- Al pedir acceso al reproductor de video: *"Mi creador piensa que el reproductor de video es algo muy personal, no tengo permitido entrar. Pero si me das permiso podré hacerlo"*
- Al eliminar datos: *"Eliminaré todos mis recuerdos de tu celular. ¿Estás seguro?"*
- Al vincular pareja: *"Voy a conectarme con el asistente de [nombre]. ¡Seremos amigos!"*

---

*Creado por Jhon Sarmiento — ThemeForge Studio 2026*
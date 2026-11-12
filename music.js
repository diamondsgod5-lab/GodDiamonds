// Música de fondo: intenta sonar al entrar, se pausa al salir/ocultar la página.
        // Si el navegador bloquea el autoplay, empieza en la primera interacción del visitante.
        (function controlarMusicaDeLaPagina() {
            const musica = new Audio("./musica-god-diamonds.mp3");
            musica.loop = true;
            musica.volume = 0.32;
            musica.preload = "auto";
            let autorizadaPorInteraccion = false;

            async function reproducir() {
                if (document.visibilityState === "hidden") return;
                try {
                    await musica.play();
                } catch (error) {
                    // Chrome/Safari pueden exigir un clic o toque antes de permitir sonido.
                }
            }

            function primeraInteraccion() {
                autorizadaPorInteraccion = true;
                reproducir();
                document.removeEventListener("pointerdown", primeraInteraccion, true);
                document.removeEventListener("keydown", primeraInteraccion, true);
            }

            // Intento automático al cargar la tienda.
            reproducir();

            // Alternativa cuando el navegador bloquea la reproducción automática.
            document.addEventListener("pointerdown", primeraInteraccion, true);
            document.addEventListener("keydown", primeraInteraccion, true);

            // Al cambiar de pestaña o minimizar, detener la canción.
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "hidden") {
                    musica.pause();
                } else if (autorizadaPorInteraccion) {
                    reproducir();
                } else {
                    reproducir();
                }
            });

            // Al abandonar la página, detener el audio.
            window.addEventListener("pagehide", () => musica.pause());
            window.addEventListener("beforeunload", () => musica.pause());
        })();

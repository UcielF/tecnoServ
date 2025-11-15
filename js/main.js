let vantaEffect;
let modo = "nodos"; // "nodos" "liquido"

// colors
function mezclarColores(color1, color2, porcentaje) {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);

    const r1 = (c1 >> 16) & 0xff;
    const g1 = (c1 >> 8) & 0xff;
    const b1 = c1 & 0xff;

    const r2 = (c2 >> 16) & 0xff;
    const g2 = (c2 >> 8) & 0xff;
    const b2 = c2 & 0xff;

    const r = Math.round(r1 + (r2 - r1) * porcentaje);
    const g = Math.round(g1 + (g2 - g1) * porcentaje);
    const b = Math.round(b1 + (b2 - b1) * porcentaje);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function iniciarFondo() {
    if (vantaEffect) vantaEffect.destroy();

    if (modo === "nodos") {
        vantaEffect = VANTA.NET({
            el: "#background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x7d2cff,
            backgroundColor: 0x000000,

         
            points: 15.00,        // antes: 12 → menos nodos
            maxDistance: 23.00,  // antes: 25 → líneas más largas, menos conexiones
            spacing: 25.00,      // antes: 18 → nodos más separados  

        });

       
        const color1 = "#7d2cff"; // violeta
        const color2 = "#007bff"; // azul
        let t = 0;
        let direccion = 1;
        setInterval(() => {
            t += direccion * 0.01;
            if (t >= 1) { t = 1; direccion = -1; }
            if (t <= 0) { t = 0; direccion = 1; }
            const colorInterpolado = mezclarColores(color1, color2, t);
            // Fondo
            const colorDecimal = parseInt(colorInterpolado.slice(1), 16);
            vantaEffect.setOptions({ color: colorDecimal });
            // Logo y botón sincronizados
            document.documentElement.style.setProperty('--color-animado', colorInterpolado);

        }, 100);
    }

    else if (modo === "liquido") {
        vantaEffect = VANTA.WAVES({
            el: "#background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x007bff,
            shininess: 35.00,
            waveHeight: 20.00,
            waveSpeed: 1.3,
            zoom: 0.85,
        });

        window.addEventListener("scroll", () => {
  const header = document.querySelector(".encabezado");
  if (window.scrollY > 50) {
    header.style.height = "70px";
  } else {
    header.style.height = "100px";
  }
});

    }
}

window.addEventListener("DOMContentLoaded", iniciarFondo);
lucide.createIcons();
window.addEventListener('scroll', function() {
  const header = document.querySelector('.encabezado');
  
  if (window.scrollY > 50) {
    header.classList.add('scroll-activo');
  } else {
    header.classList.remove('scroll-activo');
  }
});

const tel = document.getElementById("telefono");

tel.addEventListener("input", () => {
  tel.value = tel.value.replace(/\D/g, "");
});

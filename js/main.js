/* Villacán · funciones comunes */
(function () {
  'use strict';

  var TELEFONO_WA = '34699028284';
  var datos = window.VILLACAN || { fotos: [], videos: [], opiniones: [] };

  function enlaceWhatsApp(texto) {
    return 'https://wa.me/' + TELEFONO_WA + '?text=' + encodeURIComponent(texto);
  }

  function crear(etiqueta, clase, texto) {
    var el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  /* Enlaces de WhatsApp con mensaje preparado */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = enlaceWhatsApp(a.getAttribute('data-wa') || 'Hola, me gustaría información sobre Villacán');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* Año del pie */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Galería de fotos ---------- */
  var galeria = document.getElementById('galeria-fotos');
  var visor = document.getElementById('visor');
  if (galeria) {
    if (datos.fotos.length === 0) {
      var vacioF = crear('div', 'vacio');
      vacioF.appendChild(crear('strong', '', 'Muy pronto, ¡fotos de nuestros peludos!'));
      vacioF.appendChild(crear('span', '', 'Estamos preparando la galería. Mientras tanto, puedes ver más en nuestro Instagram.'));
      galeria.before(vacioF);
      for (var i = 0; i < 6; i++) {
        var b = crear('button', 'foto');
        b.disabled = true;
        b.setAttribute('aria-label', 'Foto próximamente');
        var im = crear('img');
        im.src = 'img/foto-pendiente.svg';
        im.alt = '';
        b.appendChild(im);
        b.appendChild(crear('span', 'pie-pendiente', 'Próximamente'));
        galeria.appendChild(b);
      }
    } else {
      datos.fotos.forEach(function (f) {
        var b = crear('button', 'foto');
        b.type = 'button';
        var im = crear('img');
        im.src = f.archivo;
        im.alt = f.texto || 'Foto de Villacán';
        im.loading = 'lazy';
        b.appendChild(im);
        if (f.texto) b.appendChild(crear('span', 'pie', f.texto));
        b.addEventListener('click', function () { abrirVisor(f); });
        galeria.appendChild(b);
      });
    }
  }

  function abrirVisor(f) {
    if (!visor) return;
    var img = visor.querySelector('img');
    img.src = f.archivo;
    img.alt = f.texto || 'Foto de Villacán';
    visor.querySelector('.visor-texto').textContent = f.texto || '';
    visor.querySelector('.visor-comentar').href = enlaceWhatsApp('Hola, os escribo sobre la foto "' + (f.texto || f.archivo) + '": ');
    visor.showModal();
  }
  if (visor) {
    visor.querySelector('.cerrar').addEventListener('click', function () { visor.close(); });
    visor.addEventListener('click', function (e) { if (e.target === visor) visor.close(); });
  }

  /* ---------- Vídeos ---------- */
  var listaVideos = document.getElementById('lista-videos');
  if (listaVideos) {
    if (datos.videos.length === 0) {
      ['Hora del recreo', 'Paseo por el parque', 'La siesta'].forEach(function (titulo) {
        var art = crear('article', 'video');
        var marco = crear('div', 'marco-pendiente');
        marco.innerHTML = '<div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M10 8.5v7l6-3.5z" fill="currentColor"/></svg>Vídeo próximamente</div>';
        art.appendChild(marco);
        art.appendChild(crear('h3', '', titulo));
        listaVideos.appendChild(art);
      });
    } else {
      datos.videos.forEach(function (v) {
        var art = crear('article', 'video');
        var marco = crear('div', 'marco');
        if (v.tipo === 'youtube') {
          var ifr = crear('iframe');
          ifr.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id);
          ifr.title = v.titulo || 'Vídeo de Villacán';
          ifr.loading = 'lazy';
          ifr.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
          ifr.allowFullscreen = true;
          marco.appendChild(ifr);
        } else {
          var vid = crear('video');
          vid.src = v.archivo;
          vid.controls = true;
          vid.preload = 'metadata';
          vid.playsInline = true;
          marco.appendChild(vid);
        }
        art.appendChild(marco);
        art.appendChild(crear('h3', '', v.titulo || ''));
        listaVideos.appendChild(art);
      });
    }
  }

  /* ---------- Opiniones publicadas ---------- */
  var listaOp = document.getElementById('lista-opiniones');
  if (listaOp) {
    if (datos.opiniones.length === 0) {
      var vacioO = crear('div', 'vacio');
      vacioO.appendChild(crear('strong', '', 'Todavía no hay opiniones publicadas'));
      vacioO.appendChild(crear('span', '', '¿Tu perro ya ha estado con nosotros? ¡Sé el primero en contarnos qué tal!'));
      listaOp.replaceWith(vacioO);
    } else {
      datos.opiniones.forEach(function (o) {
        var art = crear('article', 'opinion');
        var n = Math.max(0, Math.min(5, o.estrellas || 5));
        var est = crear('div', 'estrellas', '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n));
        est.setAttribute('aria-label', n + ' de 5 estrellas');
        art.appendChild(est);
        art.appendChild(crear('p', '', '“' + o.texto + '”'));
        art.appendChild(crear('p', 'autor', o.nombre));
        art.appendChild(crear('span', 'perro', (o.perro ? 'Dueño/a de ' + o.perro : '') + (o.fecha ? ' · ' + o.fecha : '')));
        listaOp.appendChild(art);
      });
    }
  }

  /* ---------- Formulario de opinión (se envía por WhatsApp) ---------- */
  var form = document.getElementById('form-opinion');
  if (form) {
    function fijarError(id, msg) { document.getElementById(id).textContent = msg; }
    form.querySelectorAll('input, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        var err = el.closest('.campo') && el.closest('.campo').querySelector('.error');
        if (err) err.textContent = '';
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = form.nombre.value.trim();
      var perro = form.perro.value.trim();
      var texto = form.comentario.value.trim();
      var est = form.querySelector('input[name="estrellas"]:checked');
      var ok = true;
      if (!nombre) { fijarError('error-nombre', 'Escribe tu nombre.'); ok = false; }
      if (!est) { fijarError('error-estrellas', 'Elige una puntuación de 1 a 5 estrellas.'); ok = false; }
      if (texto.length < 10) { fijarError('error-comentario', 'Cuéntanos un poco más (al menos 10 caracteres).'); ok = false; }
      if (!form.permiso.checked) { fijarError('error-permiso', 'Necesitamos tu permiso para poder publicarla.'); ok = false; }
      if (!ok) { var primero = form.querySelector('.error:not(:empty)'); if (primero) primero.closest('.campo').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }

      var mensaje = 'Hola Villacán, os dejo mi opinión para la web:\n\n' +
        '⭐ ' + est.value + '/5\n' +
        'Nombre: ' + nombre + '\n' +
        (perro ? 'Perro: ' + perro + '\n' : '') +
        '\n' + texto + '\n\n' +
        '✅ Doy permiso para publicarla en la web de Villacán.';
      window.open(enlaceWhatsApp(mensaje), '_blank', 'noopener');
      document.getElementById('aviso-enviado').hidden = false;
    });
  }
})();

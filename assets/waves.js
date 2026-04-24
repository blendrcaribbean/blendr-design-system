/* =========================================================================
   Blendr Waves — portable wave system (v3, authentic paths)
   =========================================================================
   This library composes the actual Blendr brand wave shapes — the same SVG
   paths used in the source branding assets ("Branding Waves – Filled 27–30").
   Each wave is a tapered, S-curving filled shape that spans its viewBox
   horizontally and peaks in the middle.

   Public API
     • BlendrWaves.svg(opts)                         → SVG string
     • <blendr-wave variant=".." palette=".." />     → web component
     • BlendrWaves.apply(el, opts)                   → render into a node

   Variants
     • 'ribbon'    one wave across the mid-line (default, ends cut off)
     • 'stacked'   thin top wave + thick bottom wave (ends cut off)
     • 'arc'       single cresting wave, right taper visible
     • 'duet'      thin + thick crossing — both tapered ends visible
     • 'tail'      single thick wave with left taper visible on-canvas
     • 'frame'     top + bottom framing (thin / thick)

   Shape keys (usable directly via BlendrWaves.shape(key))
     • 'crestDown'  derived from source-30 — peaks top-center, dips below
     • 'crestUp'    derived from source-27 — mirrors crestDown (dips first)
     • 'riseRight'  derived from source-28 — low-left, rises across
     • 'riseLeft'   derived from source-29 — mirror of riseRight

   Palettes
     • 'light'  Foam / Sky / Sea on Paper
     • 'dark'   Deep Teal / Teal / Ink on Ink
     • 'mist'   soft light set
     • 'teal'   dark teal set
     • 'mono'   single tone, layered at opacity (pass `color`)
     • 'custom' pass `stops: [c, c, c]` and `bg`

   Options
     animated · speed · amplitude · color · bg · stops · preserveAspectRatio
   ======================================================================= */

(function (global) {
  'use strict';

  // Palettes -------------------------------------------------------------
  const PALETTES = {
    light: { bg: '#E6F5F8', stops: ['#B2D4DE', '#8BB6BA', '#D4EBEE'] },
    dark:  { bg: '#0F2226', stops: ['#1E4A50', '#143338', '#0A1A1D'] },
    mist:  { bg: '#F6FBFC', stops: ['#D4EBEE', '#B2D4DE', '#8BB6BA'] },
    teal:  { bg: '#143338', stops: ['#1E4A50', '#5E8A8D', '#0F2226'] },
  };

  // Authentic brand-wave paths, preserved with their original viewBoxes.
  // We describe each as its own coordinate system; the renderer places them
  // inside the composed canvas using <svg x y width height viewBox>.
  //
  // Each entry is a { path, vb: [w, h] } pair.
  const SHAPES = {
    // source 30 — large cresting wave (peaks top-center)
    crestDown: {
      vb: [2340.27, 547.26],
      path: "M1782.83,547.26c-34.74,0-69.37-1.97-103.85-5.93-140.27-16.1-277.01-65.08-406.42-145.56-189.29-117.72-367.98-176.78-544.97-176.78-191.62,0-381.25,69.17-580.45,207.99-10.85,7.56-25.77,5.02-33.48-5.73L14.19,282.59c-7.86-10.96-5.24-26.23,5.82-33.95C126.63,174.21,233.52,115.99,338.06,75.43,452.98,30.84,569.64,5.76,684.79.9c115.92-4.89,234.26,10.52,351.72,45.81,114.87,34.51,233.2,89.38,351.7,163.08,100.07,62.24,204.59,100.38,310.64,113.35,84.85,10.38,171.58,4.89,257.79-16.33,151.04-37.18,249.68-110.61,250.66-111.35l-.39.29,118.07,153.8c8.5,11.07,5.89,26.99-5.68,34.79-15.46,10.42-39.03,25.36-69.64,41.97-72.69,39.44-150.21,69.91-230.41,90.56-78.53,20.22-157.7,30.38-236.43,30.38Z",
    },
    // source 27 — mirror of 30
    crestUp: {
      vb: [2340.27, 547.26],
      path: "M557.44,547.26c-78.73,0-157.89-10.15-236.43-30.38-80.2-20.65-157.72-51.12-230.41-90.56-30.61-16.61-54.18-31.54-69.64-41.97-11.57-7.8-14.17-23.72-5.68-34.79l118.07-153.8-.39-.29c.98.74,99.62,74.17,250.66,111.35,86.2,21.22,172.94,26.71,257.79,16.33,106.05-12.98,210.56-51.11,310.64-113.35,118.5-73.7,236.83-128.57,351.7-163.08C1421.23,11.42,1539.56-4,1655.49.9c115.15,4.86,231.81,29.94,346.73,74.53,104.53,40.56,211.43,98.78,318.04,173.21,11.06,7.72,13.68,22.99,5.82,33.95l-99.47,138.65c-7.71,10.74-22.62,13.3-33.47,5.74-383.2-267.05-731.2-276.39-1125.43-31.22-129.41,80.48-266.15,129.46-406.42,145.56-34.47,3.96-69.12,5.93-103.85,5.93Z",
    },
    // source 28 — low-left, rises across, falls right
    riseRight: {
      vb: [2299.15, 478.26],
      path: "M536.45,478.26c-75.84,0-152.13-9.79-227.84-29.28-142.34-36.66-245.26-98.23-287.52-126.49-11.63-7.78-14.27-23.75-5.75-34.84l76.01-99.01-.18-.14c1.01.77,103.28,77.37,260.49,116.65,90.59,22.63,181.84,28.68,271.21,17.96,111.68-13.39,221.5-53.26,326.41-118.51,115.92-72.09,231.46-125.7,343.41-159.34C1406.45,11.07,1520.96-3.86,1633.02.87c111.37,4.7,224.31,29,335.71,72.22,101.85,39.52,206.18,96.35,310.41,169.08,11.06,7.72,13.68,22.99,5.82,33.95l-59.24,82.58c-7.71,10.75-22.64,13.3-33.5,5.73-194.93-135.92-380.14-205.87-565.53-213.7-193.32-8.16-388.99,51.12-598.2,181.23-125.04,77.77-256.98,125.06-392.14,140.58-33.15,3.81-66.49,5.71-99.9,5.71Z",
    },
    // source 29 — mirror of 28
    riseLeft: {
      vb: [2299.15, 478.26],
      path: "M1592.41,478.24c-99.04,0-199.67-15.17-299.73-45.24-111.95-33.64-227.49-87.25-343.41-159.34-104.91-65.25-214.73-105.12-326.41-118.51-89.37-10.71-180.62-4.67-271.21,17.96-157.22,39.28-259.48,115.88-260.49,116.65l.18-.14L15.33,190.62c-8.52-11.1-5.87-27.07,5.75-34.84,42.26-28.26,145.19-89.83,287.52-126.49C417.68,1.2,527.95-6.74,636.35,5.71c135.16,15.52,267.1,62.81,392.14,140.58,209.22,130.11,404.89,189.39,598.2,181.23,185.4-7.83,370.6-77.78,565.53-213.7,10.86-7.57,25.78-5.03,33.5,5.73l59.24,82.58c7.86,10.96,5.24,26.23-5.82,33.95-104.23,72.73-208.56,129.57-310.41,169.08-111.39,43.22-224.34,67.52-335.71,72.22-13.5.57-27.04.85-40.61.85Z",
    },
  };

  // Canonical render canvas
  const VB = { w: 2400, h: 800 };

  // Place one shape inside the canvas — ALWAYS at its native aspect ratio.
  // The shape is never stretched or squished; only uniformly scaled and
  // translated. This preserves the brand's exact curve geometry.
  //
  //   key        — which SHAPE
  //   widthPct   — render width as a fraction of canvas width (VB.w). The
  //                height is computed from the shape's native aspect ratio.
  //   cx         — horizontal center of the shape, as a fraction of canvas W
  //   cy         — vertical center, as a fraction of canvas H
  //   canvasH    — actual canvas height in units (varies with `aspect`)
  function placeShape(key, widthPct, cx, cy, canvasH) {
    const s = SHAPES[key];
    const nativeAspect = s.vb[0] / s.vb[1];
    const w = VB.w * widthPct;
    const h = w / nativeAspect;
    const x = VB.w * cx - w / 2;
    const y = canvasH * cy - h / 2;
    return { shape: key, inner: s, x, y, w, h };
  }

  // --- Variant compositions --------------------------------------------
  // 1–2 waves per variant — when two, thinner + thicker for contrast.
  // Shapes keep their native aspect ratio — we only translate and
  // uniformly scale them.
  function compose(variant, amp, canvasH) {
    const P = (key, widthPct, cx, cy) =>
      placeShape(key, widthPct * amp, cx, cy, canvasH);
    switch (variant) {
      case 'ribbon':
        return [{ ...P('riseRight', 1.45, 0.50, 0.55), stop: 1 }];
      case 'stacked':
        return [
          { ...P('crestUp',   1.15, 0.50, 0.22), stop: 0 }, // thin
          { ...P('crestDown', 1.45, 0.50, 0.78), stop: 1 }, // thick
        ];
      case 'arc':
        return [{ ...P('crestUp', 0.92, 0.50, 0.50), stop: 1 }];
      case 'duet':
        return [
          { ...P('riseLeft',  0.80, 0.68, 0.32), stop: 0 }, // thin, right
          { ...P('riseRight', 1.00, 0.32, 0.72), stop: 1 }, // thick, left
        ];
      case 'tail':
        return [{ ...P('crestDown', 0.95, 0.72, 0.50), stop: 1 }];
      case 'frame':
        return [
          { ...P('crestUp',   1.10, 0.50, 0.15), stop: 0 }, // thin
          { ...P('crestDown', 1.35, 0.50, 0.85), stop: 1 }, // thick
        ];
      default:
        return [{ ...P('riseRight', 1.45, 0.50, 0.55), stop: 1 }];
    }
  }

  function resolvePalette(opts) {
    if (opts.palette === 'custom' && Array.isArray(opts.stops)) {
      return { bg: opts.bg || '#E6F5F8', stops: opts.stops.slice(0, 3) };
    }
    if (opts.palette === 'mono' && opts.color) {
      return { bg: opts.bg || '#E6F5F8', stops: [opts.color, opts.color, opts.color] };
    }
    return PALETTES[opts.palette] || PALETTES.light;
  }

  function svg(opts = {}) {
    const o = Object.assign({
      variant: 'ribbon',
      palette: 'light',
      amplitude: 1,
      animated: false,
      speed: 18,
      // Aspect ratio of the render canvas (width/height). Defaults to 3:1
      // (the brand hero proportion). For other container shapes pass the
      // container's actual aspect so waves aren't vertically stretched.
      aspect: 3,
    }, opts);

    const { bg, stops } = resolvePalette(o);
    // Build a canvas matching the requested aspect — width is fixed at
    // VB.w (2400) and height follows. Placements use cy as a fraction of
    // this height, so the y-positions stay proportional.
    const canvasW = VB.w;
    const canvasH = Math.round(VB.w / o.aspect);
    const bands = compose(o.variant, o.amplitude, canvasH);
    const monoOp = o.palette === 'mono' ? [0.45, 0.7, 0.92] : null;

    const shapes = bands.map((b, i) => {
      const fill = stops[b.stop] || stops[0];
      const op   = monoOp ? monoOp[b.stop] : 1;
      const inner = `<svg x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}"
                          viewBox="0 0 ${b.inner.vb[0]} ${b.inner.vb[1]}"
                          preserveAspectRatio="xMidYMid meet"
                          overflow="visible">
                       <path d="${b.inner.path}" fill="${fill}" fill-opacity="${op}" />
                     </svg>`;
      if (!o.animated) return inner;
      const dur = (o.speed * (1 + i * 0.22)).toFixed(1);
      const dx  = (i % 2 === 0 ? -1 : 1) * 60;
      return `<g>
        ${inner}
        <animateTransform attributeName="transform" type="translate"
          values="0 0; ${dx} 0; 0 0"
          dur="${dur}s" repeatCount="indefinite" additive="sum" />
      </g>`;
    }).join('');

    // Note: because <g> wraps the <svg>, the inline animateTransform lives on
    // the <g> but the image lives on the nested svg — the group transform is
    // applied to the whole thing. We render the animated version this way so
    // each band drifts independently.
    const animatedShapes = o.animated ? bands.map((b, i) => {
      const fill = stops[b.stop] || stops[0];
      const op   = monoOp ? monoOp[b.stop] : 1;
      const dur = (o.speed * (1 + i * 0.22)).toFixed(1);
      const dx  = (i % 2 === 0 ? -1 : 1) * 60;
      return `<g>
        <animateTransform attributeName="transform" type="translate"
          values="0 0; ${dx} 0; 0 0"
          dur="${dur}s" repeatCount="indefinite" />
        <svg x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}"
             viewBox="0 0 ${b.inner.vb[0]} ${b.inner.vb[1]}"
             preserveAspectRatio="xMidYMid meet" overflow="visible">
          <path d="${b.inner.path}" fill="${fill}" fill-opacity="${op}" />
        </svg>
      </g>`;
    }).join('') : null;

    return `<svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 ${canvasW} ${canvasH}"
                 preserveAspectRatio="xMidYMid slice"
                 style="display:block;width:100%;height:100%;background:${bg};overflow:hidden">
              ${o.animated ? animatedShapes : shapes}
            </svg>`;
  }

  function apply(el, opts) { if (el) el.innerHTML = svg(opts); }

  function shape(key) { return SHAPES[key]; }

  class BlendrWaveEl extends HTMLElement {
    static get observedAttributes() {
      return ['variant', 'palette', 'amplitude', 'animated', 'speed', 'color', 'bg', 'aspect'];
    }
    connectedCallback() {
      this.render();
      // Re-render on container resize so waves stay at the right aspect
      if (!this._ro && 'ResizeObserver' in window) {
        this._ro = new ResizeObserver(() => this.render());
        this._ro.observe(this);
      }
    }
    disconnectedCallback() {
      if (this._ro) { this._ro.disconnect(); this._ro = null; }
    }
    attributeChangedCallback() { this.isConnected && this.render(); }
    render() {
      // Use the container's actual aspect unless one is explicitly set,
      // so waves never get vertically squished or stretched.
      const rect = this.getBoundingClientRect();
      const attrAspect = parseFloat(this.getAttribute('aspect'));
      const autoAspect = rect.width && rect.height ? rect.width / rect.height : 3;
      const opts = {
        variant: this.getAttribute('variant') || 'ribbon',
        palette: this.getAttribute('palette') || 'light',
        amplitude: parseFloat(this.getAttribute('amplitude') || '1'),
        animated: this.hasAttribute('animated'),
        speed: parseFloat(this.getAttribute('speed') || '18'),
        color: this.getAttribute('color') || undefined,
        bg: this.getAttribute('bg') || undefined,
        aspect: !Number.isNaN(attrAspect) ? attrAspect : autoAspect,
      };
      this.style.display = this.style.display || 'block';
      this.style.overflow = 'hidden';
      this.innerHTML = svg(opts);
    }
  }
  if (!customElements.get('blendr-wave')) {
    customElements.define('blendr-wave', BlendrWaveEl);
  }

  const api = {
    svg, apply, shape, PALETTES, SHAPES,
    VARIANTS: ['ribbon', 'stacked', 'arc', 'duet', 'tail', 'frame'],
    SHAPE_KEYS: Object.keys(SHAPES),
  };
  global.BlendrWaves = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : this);

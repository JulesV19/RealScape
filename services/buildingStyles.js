// ─────────────────────────────────────────────────────────────────────────────
// REGION_PROFILES — configurable style mix per French region.
// Weights must sum to 1.0.  Edit freely to adjust the local/universal balance.
// ─────────────────────────────────────────────────────────────────────────────
export const REGION_PROFILES = {
  ile_de_france: {
    styles: [
      { id: 'haussmannien', weight: 0.60 },
      { id: 'classique',    weight: 0.20 },
      { id: 'moderne',      weight: 0.20 },
    ],
  },
  normandie: {
    styles: [
      { id: 'normand',   weight: 0.50 },
      { id: 'classique', weight: 0.30 },
      { id: 'moderne',   weight: 0.20 },
    ],
  },
  alsace: {
    styles: [
      { id: 'alsacien',  weight: 0.55 },
      { id: 'classique', weight: 0.25 },
      { id: 'moderne',   weight: 0.20 },
    ],
  },
  bretagne: {
    styles: [
      { id: 'breton',    weight: 0.55 },
      { id: 'classique', weight: 0.25 },
      { id: 'moderne',   weight: 0.20 },
    ],
  },
  paca: {
    styles: [
      { id: 'provencal', weight: 0.55 },
      { id: 'classique', weight: 0.25 },
      { id: 'moderne',   weight: 0.20 },
    ],
  },
  generic_france: {
    styles: [
      { id: 'classique',    weight: 0.45 },
      { id: 'haussmannien', weight: 0.30 },
      { id: 'moderne',      weight: 0.25 },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STYLE_DEFS — per-style: canvas draw fn, facade tile dimensions,
//              material params, wall color palettes, and 3-D relief config.
//
// Canvas draw functions receive (ctx, W, H, PPM) where PPM = pixels per meter.
// ─────────────────────────────────────────────────────────────────────────────
export const STYLE_DEFS = {

  // ── Haussmannien ─────────────────────────────────────────────────────────
  haussmannien: {
    floorW: 3.5, floorH: 3.5,
    roughness: 0.65, normalStrength: 8.0,
    wallColors: ['#e6decb', '#ded8c5', '#eae2cf'],
    hasShop: true,
    defaultRoofShape: 'mansard',
    relief: {
      hasCornicheTop: true,    cornicheDepth: 0.6,  cornicheHeight: 0.5,
      hasCornicheGround: true,
      balconyFloors: [1, 'last'], balconyEveryFloor: false,
      balconyType: 'fer_forge',  balconySlabDepth: 0.8,
      hasTimberFrame: false,
      hasFloorBands: true, hasCornerPillars: true,
    },
    draw(ctx, W, H, PPM) {
      // Pierre de taille
      ctx.fillStyle = '#e6decb'; ctx.fillRect(0, 0, W, H);
      // Joints de pierres
      ctx.fillStyle = '#d1c8b4';
      for (let y = 0; y < H; y += PPM * 0.6 | 0) ctx.fillRect(0, y, W, 2);
      for (let x = 0; x < W; x += W / 2 | 0)     ctx.fillRect(x, 0, 2, H);
      // Corniche supérieure
      ctx.fillStyle = '#f2ece1'; ctx.fillRect(0, H - PPM * 0.3, W, PPM * 0.3);
      ctx.fillStyle = '#a8a090'; ctx.fillRect(0, H - PPM * 0.3, W, 2);
      // Porte-fenêtre
      const wW = PPM * 1.6 | 0, wH = PPM * 2.6 | 0,
            wx  = (W - wW) / 2 | 0, wy = PPM * 0.3 | 0;
      ctx.fillStyle = '#f5efe6';
      ctx.fillRect(wx - PPM * 0.2, wy - PPM * 0.2, wW + PPM * 0.4, wH + PPM * 0.2);
      ctx.fillStyle = '#b8b0a1';
      ctx.fillRect(wx - PPM * 0.2, wy - PPM * 0.2, wW + PPM * 0.4, 2);
      ctx.fillRect(wx - PPM * 0.2, wy - PPM * 0.2, 2, wH + PPM * 0.2);
      ctx.fillStyle = '#fcfcfc'; ctx.fillRect(wx - 4, wy - 4, wW + 8, wH + 4);
      ctx.fillStyle = '#212529'; ctx.fillRect(wx, wy, wW, wH);
      ctx.fillStyle = '#fcfcfc';
      ctx.fillRect(wx + wW / 2 - 2, wy, 4, wH);
      for (let i = 1; i <= 4; i++) ctx.fillRect(wx, wy + (wH / 5) * i - 2, wW, 4);
      // Consoles et rebord de balcon
      const balFloor = wy + wH;
      ctx.fillStyle = '#b5b0a6';
      ctx.fillRect(wx - PPM * 0.2, balFloor, PPM * 0.3, PPM * 0.5);
      ctx.fillRect(wx + wW - PPM * 0.1, balFloor, PPM * 0.3, PPM * 0.5);
      ctx.fillStyle = '#dcd4c6';
      ctx.fillRect(wx - PPM * 0.3, balFloor, wW + PPM * 0.6, PPM * 0.1);
      ctx.fillStyle = '#8a857d';
      ctx.fillRect(wx - PPM * 0.3, balFloor + PPM * 0.1, wW + PPM * 0.6, 2);
    },
  },

  // ── Classique bourgeois ───────────────────────────────────────────────────
  classique: {
    floorW: 4.0, floorH: 3.5,
    roughness: 0.68, normalStrength: 5.0,
    wallColors: ['#d8d2c2', '#d4ceba', '#ddd8c8'],
    hasShop: true,
    defaultRoofShape: 'mansard',
    relief: {
      hasCornicheTop: true,    cornicheDepth: 0.4,  cornicheHeight: 0.4,
      hasCornicheGround: true,
      balconyFloors: [1], balconyEveryFloor: false,
      balconyType: 'beton',  balconySlabDepth: 0.6,
      hasTimberFrame: false,
      hasFloorBands: true, hasCornerPillars: true,
    },
    draw(ctx, W, H, PPM) {
      ctx.fillStyle = '#d6cfbd'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#c4bcab';
      for (let y = 0; y < H; y += PPM * 0.6 | 0) ctx.fillRect(0, y, W, 2);
      ctx.fillStyle = '#eae4d3'; ctx.fillRect(0, H - PPM * 0.3, W, PPM * 0.3);
      ctx.fillStyle = '#9e9787'; ctx.fillRect(0, H - PPM * 0.3, W, 2);
      const wW = PPM * 1.5 | 0, wH = PPM * 2.2 | 0,
            wx  = (W - wW) / 2 | 0, wy = PPM * 0.5 | 0;
      ctx.fillStyle = '#e8e8e8'; ctx.fillRect(wx - 5, wy - 5, wW + 10, wH + 5);
      ctx.fillStyle = '#1a1f24'; ctx.fillRect(wx, wy, wW, wH);
      ctx.fillStyle = '#e8e8e8';
      ctx.fillRect(wx + wW / 2 - 2, wy, 4, wH);
      ctx.fillRect(wx, wy + wH / 2 - 2, wW, 4);
      ctx.fillStyle = '#a6a195';
      ctx.fillRect(wx - PPM * 0.2, wy + wH, wW + PPM * 0.4, PPM * 0.1);
    },
  },

  // ── Normand (colombages) ──────────────────────────────────────────────────
  normand: {
    floorW: 4.0, floorH: 3.0,
    roughness: 0.75, normalStrength: 4.0,
    wallColors: ['#f0ebe0', '#f2ede3', '#ece7dc'],
    hasShop: false,
    relief: {
      hasCornicheTop: false, hasCornicheGround: false,
      balconyFloors: [], balconyEveryFloor: false, balconyType: null,
      hasTimberFrame: true,  timberColor: 0x4a3728,
      hasFloorBands: false, hasCornerPillars: false,
    },
    draw(ctx, W, H, PPM) {
      const bw = PPM * 0.12 | 0, tc = '#4a3728';
      // Fond crème
      ctx.fillStyle = '#f0ebe0'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = tc;
      // Lisses horizontales haut/bas
      ctx.fillRect(0, 0, W, bw);
      ctx.fillRect(0, H - bw, W, bw);
      // Poteaux verticaux : bords + centre
      ctx.fillRect(0, 0, bw, H);
      ctx.fillRect(W - bw, 0, bw, H);
      ctx.fillRect((W - bw) / 2 | 0, 0, bw, H);
      // Croix de Saint-André dans les deux panneaux
      ctx.beginPath(); ctx.lineWidth = bw * 0.7; ctx.strokeStyle = tc;
      ctx.moveTo(bw, bw);      ctx.lineTo((W - bw) / 2, H - bw);
      ctx.moveTo((W - bw) / 2, bw); ctx.lineTo(bw, H - bw);
      ctx.moveTo((W - bw) / 2 + bw, bw); ctx.lineTo(W - bw, H - bw);
      ctx.moveTo(W - bw, bw); ctx.lineTo((W - bw) / 2 + bw, H - bw);
      ctx.stroke();
      // Fenêtre à petits bois
      const wW = PPM * 1.1 | 0, wH = PPM * 1.5 | 0,
            wx  = (W - wW) / 2 | 0, wy = (H - wH) / 2 | 0;
      ctx.fillStyle = '#e0d8c8'; ctx.fillRect(wx - 6, wy - 6, wW + 12, wH + 12);
      ctx.fillStyle = '#ffffff';  ctx.fillRect(wx - 3, wy - 3, wW + 6,  wH + 6);
      ctx.fillStyle = '#1a2530';  ctx.fillRect(wx, wy, wW, wH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(wx + wW / 2 - 2, wy, 4, wH);
      ctx.fillRect(wx, wy + wH / 2 - 2, wW, 4);
    },
  },

  // ── Alsacien (colombages colorés) ─────────────────────────────────────────
  alsacien: {
    floorW: 4.0, floorH: 3.0,
    roughness: 0.70, normalStrength: 3.5,
    wallColors: ['#f2e870', '#f0c090', '#c8dc98', '#f5e8b8'],
    hasShop: false,
    relief: {
      hasCornicheTop: false, hasCornicheGround: false,
      balconyFloors: [], balconyEveryFloor: false, balconyType: null,
      hasTimberFrame: true,  timberColor: 0x5c3d1e,
      hasFloorBands: false, hasCornerPillars: false,
    },
    draw(ctx, W, H, PPM) {
      const bw = PPM * 0.14 | 0, tc = '#5c3d1e';
      // Fond jaune (la vertex color modulera les variantes rose/vert)
      ctx.fillStyle = '#f2e870'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = tc;
      ctx.fillRect(0, 0, W, bw);
      ctx.fillRect(0, H - bw, W, bw);
      ctx.fillRect(0, 0, bw, H);
      ctx.fillRect(W - bw, 0, bw, H);
      ctx.fillRect((W / 3) | 0, 0, bw, H);
      ctx.fillRect((2 * W / 3) | 0, 0, bw, H);
      // Croisillons dans le premier panneau
      ctx.beginPath(); ctx.lineWidth = bw * 0.65; ctx.strokeStyle = tc;
      ctx.moveTo(bw, bw);          ctx.lineTo((W / 3) | 0, H - bw);
      ctx.moveTo((W / 3) | 0, bw); ctx.lineTo(bw, H - bw);
      ctx.stroke();
      // Fenêtre
      const wW = PPM * 1.0 | 0, wH = PPM * 1.4 | 0,
            wx  = (W - wW) / 2 | 0, wy = (H - wH) / 2 | 0;
      ctx.fillStyle = '#6b4c30'; ctx.fillRect(wx - 5, wy - 5, wW + 10, wH + 10);
      ctx.fillStyle = '#ffffff';  ctx.fillRect(wx - 2, wy - 2, wW + 4,  wH + 4);
      ctx.fillStyle = '#182030';  ctx.fillRect(wx, wy, wW, wH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(wx + wW / 2 - 2, wy, 4, wH);
      ctx.fillRect(wx, wy + wH / 2 - 2, wW, 4);
    },
  },

  // ── Breton (granit) ───────────────────────────────────────────────────────
  breton: {
    floorW: 4.0, floorH: 3.0,
    roughness: 0.85, normalStrength: 7.0,
    wallColors: ['#9a9590', '#908a85', '#9e9893', '#a5a09b'],
    hasShop: false,
    relief: {
      hasCornicheTop: false, hasCornicheGround: false,
      balconyFloors: [], balconyEveryFloor: false, balconyType: null,
      hasTimberFrame: false,
      hasFloorBands: false, hasCornerPillars: false,
    },
    draw(ctx, W, H, PPM) {
      // Granit gris
      ctx.fillStyle = '#9a9590'; ctx.fillRect(0, 0, W, H);
      // Joints appareillement
      ctx.fillStyle = '#7a7570';
      const bH = PPM * 0.45 | 0;
      for (let y = 0; y < H; y += bH) {
        ctx.fillRect(0, y, W, 1);
        const off = (Math.floor(y / bH) % 2 === 0) ? 0 : PPM * 0.45 | 0;
        for (let x = off; x < W; x += PPM * 0.9 | 0) ctx.fillRect(x, y, 1, bH);
      }
      // Petite fenêtre avec encadrement granit
      const wW = PPM * 1.0 | 0, wH = PPM * 1.5 | 0,
            wx  = (W - wW) / 2 | 0, wy = (H - wH) / 2 | 0;
      ctx.fillStyle = '#b0aaa5'; ctx.fillRect(wx - 6, wy - 6, wW + 12, wH + 12);
      ctx.fillStyle = '#7a7570';
      ctx.fillRect(wx - 6, wy - 6, wW + 12, 2);
      ctx.fillRect(wx - 6, wy - 6, 2, wH + 12);
      ctx.fillRect(wx + wW + 4, wy - 6, 2, wH + 12);
      ctx.fillRect(wx - 6, wy + wH + 4, wW + 12, 2);
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(wx, wy, wW, wH);
      ctx.fillStyle = '#b0aaa5';
      ctx.fillRect(wx + wW / 2 - 2, wy, 4, wH);
    },
  },

  // ── Provençal (crépi + volets) ────────────────────────────────────────────
  provencal: {
    floorW: 4.5, floorH: 3.0,
    roughness: 0.80, normalStrength: 5.5,
    wallColors: ['#e8c87a', '#e8b090', '#f0d8a0', '#e8a888', '#f5d890'],
    hasShop: false,
    relief: {
      hasCornicheTop: false, hasCornicheGround: false,
      balconyFloors: [], balconyEveryFloor: false, balconyType: null,
      hasTimberFrame: false,
      hasFloorBands: false, hasCornerPillars: false,
    },
    draw(ctx, W, H, PPM) {
      // Crépi ocre
      ctx.fillStyle = '#e8c87a'; ctx.fillRect(0, 0, W, H);
      // Texture crépi (bruit déterministe)
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      for (let y = 0; y < H; y += 5) {
        for (let x = 0; x < W; x += 5) {
          if ((x * 7 + y * 13) % 12 < 2) ctx.fillRect(x, y, 3, 2);
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      for (let y = 2; y < H; y += 7) {
        for (let x = 3; x < W; x += 7) {
          if ((x * 11 + y * 5) % 10 < 2) ctx.fillRect(x, y, 4, 3);
        }
      }
      // Fenêtre rectangulaire
      const wW = PPM * 1.1 | 0, wH = PPM * 1.6 | 0,
            wx  = (W - wW) / 2 | 0, wy = (H - wH) / 2 | 0;
      // Larmier
      ctx.fillStyle = '#c8a860';
      ctx.fillRect(wx - 8, wy - 12, wW + 16, 6);
      // Encadrement
      ctx.fillStyle = '#d4b070'; ctx.fillRect(wx - 5, wy - 5, wW + 10, wH + 10);
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(wx, wy, wW, wH);
      // Volets bois peints verts
      const sW = wW * 0.55 | 0, sH = wH + 10;
      ctx.fillStyle = '#2d6a2d';
      ctx.fillRect(wx - sW - 3, wy - 5, sW, sH);
      ctx.fillRect(wx + wW + 3,  wy - 5, sW, sH);
      ctx.fillStyle = '#245a24';
      for (let i = 1; i < 5; i++) {
        const ly = wy - 5 + (sH / 5) * i;
        ctx.fillRect(wx - sW - 3, ly, sW, 1);
        ctx.fillRect(wx + wW + 3,  ly, sW, 1);
      }
    },
  },

  // ── Moderne générique ─────────────────────────────────────────────────────
  moderne: {
    floorW: 5.0, floorH: 3.0,
    roughness: 0.50, normalStrength: 2.0,
    wallColors: ['#d0ccca', '#d4d0cc', '#c8c4c0', '#ccc8c4'],
    hasShop: true,
    relief: {
      hasCornicheTop: false, hasCornicheGround: false,
      balconyFloors: [], balconyEveryFloor: true,
      balconyType: 'beton',  balconySlabDepth: 0.5,
      hasTimberFrame: false,
      hasFloorBands: false, hasCornerPillars: false,
    },
    draw(ctx, W, H, PPM) {
      ctx.fillStyle = '#d0ccca'; ctx.fillRect(0, 0, W, H);
      // Fenêtre horizontale large
      const wW = PPM * 2.4 | 0, wH = PPM * 1.3 | 0,
            wx  = (W - wW) / 2 | 0, wy = (H - wH) / 2 - (PPM * 0.2 | 0);
      ctx.fillStyle = '#b8b4b0'; ctx.fillRect(wx - 4, wy - 4, wW + 8, wH + 8);
      ctx.fillStyle = '#1a1a1a'; ctx.fillRect(wx, wy, wW, wH);
      // Montants alu
      ctx.fillStyle = '#b8b4b0';
      ctx.fillRect(wx + (wW / 3 | 0) - 2, wy, 4, wH);
      ctx.fillRect(wx + (2 * wW / 3 | 0) - 2, wy, 4, wH);
      ctx.fillRect(wx, wy + wH / 2 - 1, wW, 2);
    },
  },
};

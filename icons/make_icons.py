#!/usr/bin/env python3
"""Genera icon-192.png e icon-512.png senza dipendenze esterne."""
import struct, zlib, os

def write_png(filename, size):
    w = h = size
    bg = (0xFF, 0x6B, 0x35)      # arancione
    border = (0x1A, 0x1A, 0x2E)  # nero
    face = (0xF2, 0xC9, 0xA0)    # incarnato
    hair = (0x1A, 0x1A, 0x2E)    # capelli neri
    blu = (0x2B, 0x5B, 0xA8)     # blu
    white = (0xFF, 0xFF, 0xFF)
    red = (0xE0, 0x30, 0x30)

    # Crea immagine RGB come lista di righe
    img = [[bg] * w for _ in range(h)]

    def clamp(v): return max(0, min(w-1, v))

    def fill_rect(x0, y0, x1, y1, col):
        for y in range(max(0,y0), min(h,y1)):
            for x in range(max(0,x0), min(w,x1)):
                img[y][x] = col

    def fill_circle(cx, cy, r, col):
        for y in range(max(0, cy-r), min(h, cy+r+1)):
            for x in range(max(0, cx-r), min(w, cx+r+1)):
                if (x-cx)**2 + (y-cy)**2 <= r**2:
                    img[y][x] = col

    def fill_ellipse(cx, cy, rx, ry, col):
        for y in range(max(0, cy-ry), min(h, cy+ry+1)):
            for x in range(max(0, cx-rx), min(w, cx+rx+1)):
                if (x-cx)**2/rx**2 + (y-cy)**2/ry**2 <= 1:
                    img[y][x] = col

    s = size / 512  # fattore di scala

    def sc(v): return int(v * s)

    # Bordo arrotondato (angoli)
    border_w = sc(20)
    for y in range(h):
        for x in range(w):
            if x < border_w or x >= w-border_w or y < border_w or y >= h-border_w:
                img[y][x] = border

    # Corpo / spalle
    fill_rect(sc(120), sc(400), sc(392), sc(490), blu)
    fill_rect(sc(120), sc(480), sc(392), sc(512), blu)

    # Collo
    fill_rect(sc(216), sc(350), sc(296), sc(410), face)

    # Testa
    fill_ellipse(sc(256), sc(240), sc(120), sc(140), face)

    # Capelli sfondo
    fill_ellipse(sc(256), sc(120), sc(120), sc(65), hair)
    fill_ellipse(sc(256), sc(100), sc(100), sc(60), hair)
    # Frangetta
    for x in range(sc(136), sc(376)):
        y_hair = sc(140) + int(12*s * (1 + 0.5*((x - sc(256))/sc(120))**2))
        for dy in range(sc(30)):
            if 0 <= y_hair+dy < h:
                img[y_hair+dy][x] = hair
    # Capelli laterali
    for y in range(sc(155), sc(345)):
        t = (y - sc(155)) / (sc(345)-sc(155))
        xL = sc(136) - int(8*s*t)
        xR = sc(376) + int(8*s*t)
        thick = sc(22)
        for dx in range(thick):
            if 0 <= xL+dx < w: img[y][xL+dx] = hair
            if 0 <= xR-dx < w: img[y][xR-dx] = hair

    # Occhi
    fill_ellipse(sc(200), sc(220), sc(28), sc(32), white)
    fill_ellipse(sc(200), sc(224), sc(16), sc(19), (0x4A, 0x2C, 0x0A))
    fill_ellipse(sc(200), sc(224), sc(10), sc(12), hair)
    fill_circle(sc(207), sc(216), sc(6), white)

    fill_ellipse(sc(312), sc(220), sc(28), sc(32), white)
    fill_ellipse(sc(312), sc(224), sc(16), sc(19), (0x4A, 0x2C, 0x0A))
    fill_ellipse(sc(312), sc(224), sc(10), sc(12), hair)
    fill_circle(sc(319), sc(216), sc(6), white)

    # Bocca
    for x in range(sc(190), sc(322)):
        t = (x - sc(190)) / (sc(322)-sc(190))
        y_mouth = sc(312) + int(sc(56) * 4*t*(1-t))
        for dy in range(sc(9)):
            if 0 <= y_mouth+dy < h:
                img[y_mouth+dy][x] = red if dy < sc(5) else white

    # Punto esclamativo rosso
    fill_rect(sc(390), sc(40), sc(410), sc(110), red)
    fill_circle(sc(400), sc(130), sc(12), red)

    # Scrivi PNG
    def make_png(img, w, h):
        def chunk(name, data):
            c = struct.pack('>I', len(data)) + name + data
            return c + struct.pack('>I', zlib.crc32(name+data) & 0xFFFFFFFF)

        ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)
        raw = b''
        for row in img:
            raw += b'\x00'
            for px in row:
                raw += bytes(px)
        idat = zlib.compress(raw, 9)

        return (b'\x89PNG\r\n\x1a\n'
                + chunk(b'IHDR', ihdr)
                + chunk(b'IDAT', idat)
                + chunk(b'IEND', b''))

    with open(filename, 'wb') as f:
        f.write(make_png(img, w, h))
    print(f'Creato {filename} ({size}x{size})')

script_dir = os.path.dirname(os.path.abspath(__file__))
write_png(os.path.join(script_dir, 'icon-192.png'), 192)
write_png(os.path.join(script_dir, 'icon-512.png'), 512)
print('Icone generate!')

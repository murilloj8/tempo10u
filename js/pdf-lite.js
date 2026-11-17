/* Tiny PDF writer: turns a list of canvases into a PDF (one JPEG image per page).
   TEMPO_PDF.fromCanvases(canvases, {width: 612, height: 792}) -> Blob (US Letter by default). */
(function () {
  function b64ToBytes(b64) {
    const bin = atob(b64), out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function fromCanvases(canvases, size) {
    const PW = (size && size.width) || 612, PH = (size && size.height) || 792;
    const enc = new TextEncoder(), parts = [], offsets = [];
    let length = 0;
    const push = (x) => { const b = typeof x === "string" ? enc.encode(x) : x; parts.push(b); length += b.length; };
    const obj = (n, body) => { offsets[n] = length; push(`${n} 0 obj\n`); body(); push("\nendobj\n"); };
    const n = canvases.length, pageIds = canvases.map((_, i) => 3 + i * 3);
    push("%PDF-1.4\n"); push(new Uint8Array([0x25, 0xE2, 0xE3, 0xCF, 0xD3, 0x0A]));
    obj(1, () => push("<< /Type /Catalog /Pages 2 0 R >>"));
    obj(2, () => push(`<< /Type /Pages /Count ${n} /Kids [${pageIds.map((id) => id + " 0 R").join(" ")}] >>`));
    canvases.forEach((cv, i) => {
      const pid = pageIds[i], cid = pid + 1, iid = pid + 2;
      const jpg = b64ToBytes(cv.toDataURL("image/jpeg", 0.9).split(",")[1]);
      // Fit the image inside the page, keeping its shape.
      const s = Math.min(PW / cv.width, PH / cv.height), w = cv.width * s, h = cv.height * s, x = (PW - w) / 2, y = PH - h;
      const content = `q ${w.toFixed(2)} 0 0 ${h.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /Im${i} Do Q`;
      obj(pid, () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /XObject << /Im${i} ${iid} 0 R >> >> /Contents ${cid} 0 R >>`));
      obj(cid, () => { push(`<< /Length ${content.length} >>\nstream\n`); push(content); push("\nendstream"); });
      obj(iid, () => {
        push(`<< /Type /XObject /Subtype /Image /Width ${cv.width} /Height ${cv.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`);
        push(jpg); push("\nendstream");
      });
    });
    const total = 3 + n * 3, xref = length;
    let x = `xref\n0 ${total}\n0000000000 65535 f \n`;
    for (let i = 1; i < total; i++) x += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
    push(x); push(`trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
    return new Blob(parts, { type: "application/pdf" });
  }
  window.TEMPO_PDF = { fromCanvases };
})();

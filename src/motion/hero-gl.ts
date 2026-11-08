/*
 * Hero photo shader: grayscale at rest. On hover, colour blooms from the cursor with a soft edge
 * and widens until the whole portrait is in colour; leaving fades it back. Scroll adds a faint stretch.
 */

const VS = "attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}";

const FS = [
  "precision highp float;",
  "varying vec2 v;uniform sampler2D t;uniform vec2 res,img,mouse;uniform float hover,vel,rad,zoom;",
  "vec2 cover(vec2 uv){float rs=res.x/res.y,ri=img.x/img.y;vec2 s=rs<ri?vec2(rs/ri,1.):vec2(1.,ri/rs);return uv*s+(1.-s)*vec2(.5,.88);}",
  "float lum(vec3 c){return dot(c,vec3(.299,.587,.114));}",
  "void main(){",
  " vec2 uv=v;vec2 asp=vec2(res.x/res.y,1.);",
  " float sv=clamp(vel,-1.,1.);",
  " uv.y=(uv.y-.5)/(1.+abs(sv)*.08)+.5;",
  " uv=(uv-.5)/zoom+.5;",
  " vec3 c=texture2D(t,cover(uv)).rgb;",
  " vec3 gray=vec3(lum(c));gray=((gray-.5)*1.06+.5)*.82;",
  " vec3 col=((c-.5)*1.02+.5)*.96;",
  " float dist=length((v-mouse)*asp);",
  " float m=(1.-smoothstep(rad*.35,rad,dist))*hover;",
  " gl_FragColor=vec4(mix(gray,col,m),1.);",
  "}",
].join("\n");

export type HeroGL = {
  st: { mx: number; my: number; tx: number; ty: number; h: number; th: number; vel: number; zoom: number; dirty: number };
  render: () => void;
  cv: HTMLCanvasElement;
  ready: () => boolean;
};

export function createHeroGL(me: HTMLImageElement, root: HTMLElement): HeroGL | null {
  const cv = document.querySelector<HTMLCanvasElement>(".ph-gl");
  if (!cv) return null;
  let gl: WebGLRenderingContext | null = null;
  try {
    gl = cv.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: "high-performance" });
  } catch {
    gl = null;
  }
  if (!gl) return null;
  const g = gl;

  function sh(type: number, src: string) {
    const s = g.createShader(type)!;
    g.shaderSource(s, src);
    g.compileShader(s);
    if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
      console.warn(g.getShaderInfoLog(s));
      return null;
    }
    return s;
  }
  const v = sh(g.VERTEX_SHADER, VS), f = sh(g.FRAGMENT_SHADER, FS);
  if (!v || !f) return null;
  const pr = g.createProgram()!;
  g.attachShader(pr, v);
  g.attachShader(pr, f);
  g.linkProgram(pr);
  if (!g.getProgramParameter(pr, g.LINK_STATUS)) return null;
  g.useProgram(pr);
  g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer());
  g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), g.STATIC_DRAW);
  const loc = g.getAttribLocation(pr, "p");
  g.enableVertexAttribArray(loc);
  g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);
  const U: Record<string, WebGLUniformLocation | null> = {};
  ["t", "res", "img", "mouse", "hover", "vel", "rad", "zoom"].forEach((n) => (U[n] = g.getUniformLocation(pr, n)));
  const tex = g.createTexture();
  let ready = false;
  const st = { mx: 0.5, my: 0.62, tx: 0.5, ty: 0.62, h: 0, th: 0, vel: 0, zoom: 1, dirty: 3 };

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2), w = cv!.clientWidth, h = cv!.clientHeight;
    if (!w || !h) return;
    cv!.width = Math.round(w * dpr);
    cv!.height = Math.round(h * dpr);
    g.viewport(0, 0, cv!.width, cv!.height);
    g.uniform2f(U.res, w, h);
  }
  function render() {
    if (!ready) return;
    g.uniform2f(U.mouse, st.mx, st.my);
    g.uniform1f(U.hover, st.h);
    g.uniform1f(U.vel, st.vel);
    g.uniform1f(U.rad, 0.22 + st.h * 1.3);
    g.uniform1f(U.zoom, st.zoom);
    g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
  }
  function fail() {
    ready = false;
    root.classList.remove("gl-on");
    cv!.remove();
  }
  function upload() {
    try {
      g.bindTexture(g.TEXTURE_2D, tex);
      g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, me);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
      g.uniform1i(U.t, 0);
      g.uniform2f(U.img, me.naturalWidth || 768, me.naturalHeight || 722);
      resize();
      ready = true;
      render();
      root.classList.add("gl-on");
    } catch {
      fail();
    }
  }
  cv.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    fail();
  });
  const go = () => (me.complete && me.naturalWidth ? upload() : me.addEventListener("load", upload, { once: true }));
  (me.decode ? me.decode() : Promise.resolve()).then(go, go);
  addEventListener("resize", () => {
    if (ready) {
      resize();
      st.dirty = 3;
    }
  });
  return { st, render, cv, ready: () => ready };
}

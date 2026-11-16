/**
 * Jegatheesh Web Studio - Vanilla JavaScript Rebuilt Bundle
 * Works 100% offline and via double-clicking index.html (file:// protocol)
 */

// 0. Embedded Scene Data & Fetch Interceptor for local / offline support
const UNICORN_SCENE_DATA = {"history":[{"layerType":"flattened","id":"flat_0","compiledFragmentShaders":["#version 300 es\n// Copyright (c) Unicorn Studio. Licensed under the Unicorn Studio Commercial License.\n// Unauthorized copying, redistribution, or use in competing products is prohibited.\nprecision highp float;\nin vec2 vTextureCoord;\nin vec3 vVertexPosition;\n\nuniform vec2 uMousePos;\nuniform float uL0_ElemOpacity;\nuniform float uL1_Time;\nuniform vec2 uResolution;\nuniform float uL1_ElemOpacity;\n\nconst float PI = 3.14159265359;\nconst float TAU = 6.28318530718;\n\nout vec4 fragColor;\n\nvec2 rotate_L0(vec2 coord, float angle) {\nfloat s = sin(angle);\nfloat c = cos(angle);\nreturn vec2(\ncoord.x * c - coord.y * s,\ncoord.x * s + coord.y * c\n);\n}\nvec3 getBgColor_L0(vec2 uv) {\nreturn vec3(0.9764705882352941, 0.9372549019607843, 0.9058823529411765);\n}\nuvec2 pcg2d_L1(uvec2 v) {\nv = v * 1664525u + 1013904223u;\nv.x += v.y * v.y * 1664525u + 1013904223u;\nv.y += v.x * v.x * 1664525u + 1013904223u;\nv ^= v >> 16;\nv.x += v.y * v.y * 1664525u + 1013904223u;\nv.y += v.x * v.x * 1664525u + 1013904223u;\nreturn v;\n}\nfloat randFibo_L1(vec2 p) {\nuvec2 v = floatBitsToUint(p);\nv = pcg2d_L1(v);\nuint r = v.x ^ v.y;\nreturn float(r) / float(0xffffffffu);\n}\nfloat deband_L1() {\nreturn (randFibo_L1(gl_FragCoord.xy) - 0.5) / 255.0;\n}\nvec3 getNoiseColor_L1(float t, vec3 col1, vec3 col2, float chroma) {\nvec3 mid = 0.5 * (col1 + col2);\nvec3 axisAmp = 0.5 * (col2 - col1);\nvec3 base = mid + axisAmp * cos(TAU * t);\nvec3 axis = length(axisAmp) > 0.0001 ? normalize(axisAmp) : vec3(1.0, 0.0, 0.0);\nvec3 ref = abs(axis.x) > 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);\nvec3 tangent1 = normalize(cross(axis, ref));\nvec3 tangent2 = normalize(cross(axis, tangent1));\nfloat richness = 0.24 * length(axisAmp) + 0.02;\nvec3 ripple =\ntangent1 * sin(TAU * (t * 2.0 + 0.123)) +\ntangent2 * sin(TAU * (t * 2.0 + 0.437));\nvec3 col = base + (richness * chroma) * ripple;\ncol = clamp(col, -10.0, 10.0);\ncol = 1./(1. + exp(-col * 4. + 0.25) * 7.5);\nreturn clamp(col, 0.0, 1.0);\n}\nmat2 rot_L1(float a) {\nreturn mat2(cos(a),-sin(a),sin(a),cos(a));\n}\nvec3 hash3_L1(vec2 p) {\nvec3 q = vec3(dot(p,vec2(127.1,311.7)),\ndot(p,vec2(269.5,183.3)),\ndot(p,vec2(419.2,371.9)));\nreturn fract(sin(q)*43758.5453);\n}\nfloat voronoise_L1(vec2 uv, float driftVal, float time, float direction, float scale, float phase) {\nfloat u = 1.;\nfloat v = 1.;\nvec2 d = vec2(0, driftVal * time * 0.008);\nvec2 skew = vec2(direction, 1.0 - direction);\nvec2 x = (uv * skew * 2.) - d * mix(1., 14., scale) * 2.;\nvec2 p = floor(x);\nvec2 f = fract(x);\nfloat k = 1.0 + 63.0 * pow(1.0-v,4.0);\nfloat va = 0.0;\nfloat wt = 0.0;\nfor( int j=-2;\nj<=2;\nj++ )\nfor( int i=-2;\ni<=2;\ni++ ) {\nvec2 g = vec2( float(i),float(j) );\nvec3 o = hash3_L1( p + g ) * vec3(u,u,1.0);\no.xy += 0.5 * vec2(sin(time * 0.1 + phase + o.x * 6.28));\nvec2 r = g - f + o.xy;\nfloat dd = dot(r,r);\nfloat ww = pow( 1.0-smoothstep(0.0,1.414,sqrt(dd)), k );\nva += o.z*ww;\nwt += ww;\n}\nreturn va / max(wt, 1e-5);\n}\nfloat getVoronoiNoise_L1(vec2 uv, float turbulence, float driftVal, float time, float direction, float scale, float phase) {\nfloat turb = turbulence * 2.5;\nfloat noise = voronoise_L1(uv, driftVal, time, direction, scale, phase);\nreturn mix(0.5, noise, turb);\n}\nfloat getNoise_L1(vec2 uv, float turbulence, float driftVal, float time, float scale, float direction, float phase) {\nreturn getVoronoiNoise_L1(uv, turbulence, driftVal, time, direction, scale, phase);\n}\n\nvec4 computeLayer_L0(vec2 uv) {\nvec2 pos = vec2(0.5, 0.5) + mix(vec2(0), (uMousePos-0.5), 0.0000);\nuv -= pos;\nuv /= max(0.5000*2., 1e-5);\nuv = rotate_L0(uv, (0.0000 - 0.5) * 2. * PI);\nvec4 color = vec4(getBgColor_L0(uv), 1.0) * 1.0000;\nreturn color;\n}\nvec4 computeLayer_L1(vec2 uv, vec4 prevLayerColor, float sharedDither) {\nfloat aspectRatio = uResolution.x/uResolution.y;\nvec2 aspect = vec2(aspectRatio, 1.0);\nvec2 mPos = vec2(0.5, 0.5) + mix(vec2(0), (uMousePos-0.5), 0.0000);\nvec2 pos = mix(vec2(0.5, 0.5), mPos, 0.0000);\nfloat scale = mix(1., 14., 0.1200);\nvec2 drift = vec2(0, 0.0000 * uL1_Time * 0.0125);\nmat2 rotation = rot_L1(0.0000 * 2. * PI);\nvec2 st = (uv - pos) * aspect * scale * rotation;\nfloat noise = getNoise_L1(st, 0.5400, 0.0000, uL1_Time, 0.1200, 0.5000, 0.0000);\nvec4 color = prevLayerColor;\nvec4 bg = color;\nfloat shift = 0.3600 + (1.0000 * uL1_Time * 0.01);\nvec3 noiseColor = getNoiseColor_L1(noise + shift, vec3(1, 0.9176470588235294, 0.8470588235294118), vec3(1, 0.9098039215686274, 0.8352941176470589), 0.0000);\ncolor.rgb = noiseColor.rgb;\nfloat dither = sharedDither;\ncolor.rgb += dither * 0.5;\ncolor = (clamp(color, 0.0, 1.0)) * (0.4000);\nreturn color;\n}\n\nvoid main() {\nvec2 uv = vTextureCoord;\nfloat sharedDither = deband_L1();\nvec4 result = vec4(0.0);\nvec4 c0 = computeLayer_L0(uv);\nc0 *= uL0_ElemOpacity;\nresult = c0 + result * (1.0 - c0.a);\nvec4 c1 = computeLayer_L1(uv, result, sharedDither);\nc1 *= uL1_ElemOpacity;\nresult = c1 + result * (1.0 - c1.a);\nfragColor = result;\n}"],"compiledVertexShaders":["#version 300 es\n// Copyright (c) Unicorn Studio. Licensed under the Unicorn Studio Commercial License.\n// Unauthorized copying, redistribution, or use in competing products is prohibited.\nprecision highp float;\nin vec3 aVertexPosition;\nin vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nout vec2 vTextureCoord;\nout vec3 vVertexPosition;\nvoid main() {\ngl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\nvVertexPosition = aVertexPosition;\nvTextureCoord = aTextureCoord;\n}"],"sublayers":[{"id":"b227bbfd-43de-4d81-a690-a776da5b82ce","publicId":"gradient","layerType":"effect","type":"gradient","sublayerIndex":0,"opacity":1,"animating":false},{"id":"32dd966c-f7f4-4a58-814c-392a1e6b9ec5","publicId":"noise_fill","layerType":"effect","type":"noiseFill","sublayerIndex":1,"opacity":1,"animating":true}],"data":{"uniforms":{"resolution":{"name":"uResolution","type":"2f","value":{"type":"Vec2","_x":1080,"_y":1080}},"mousePos":{"name":"uMousePos","type":"2f","value":{"type":"Vec2","_x":0.5,"_y":0.5}},"L0_elemOpacity":{"name":"uL0_ElemOpacity","type":"1f","value":1},"L1_time":{"name":"uL1_Time","type":"1f","value":0},"L1_elemOpacity":{"name":"uL1_ElemOpacity","type":"1f","value":1}},"textures":[],"timeUniforms":[],"mouseUniforms":[],"hasMouseTracking":false,"hasVideoSublayers":false,"estimatedSublayerWorkRaw":25.475,"occlusion":{"candidateLayers":0}},"states":{"appear":[],"scroll":[],"hover":[],"mousemove":[]},"breakpoints":[],"userDownsample":1,"visible":true},{"layerType":"flattened","id":"flat_2","compiledFragmentShaders":["#version 300 es\n// Copyright (c) Unicorn Studio. Licensed under the Unicorn Studio Commercial License.\n// Unauthorized copying, redistribution, or use in competing products is prohibited.\nprecision highp float;\nin vec2 vTextureCoord;\nin vec3 vVertexPosition;\n\nuniform sampler2D uBgTexture;\nuniform vec2 uArtboardResolution;\nuniform float uL0_Width;\nuniform float uL0_Top;\nuniform vec2 uL0_MousePos;\nuniform float uL0_TrackMouse;\nuniform float uL0_ElemOpacity;\nuniform float uL1_Scale;\nuniform float uL1_Time;\nuniform vec2 uL1_Pos;\nuniform vec2 uMousePos;\nuniform vec2 uResolution;\nuniform float uL1_ElemOpacity;\n\nconst float TAU = 6.28318530718;\nconst float PI = 3.14159265359;\nconst int MAX_ITERATIONS = 8;\n\nout vec4 fragColor;\n\nvec3 blend_L0 (int blendMode, vec3 src, vec3 dst) {\nreturn vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)), (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)), (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\nvec2 rotate2D_L0(vec2 p, float angle) {\nfloat s = sin(angle);\nfloat c = cos(angle);\nreturn vec2(p.x * c - p.y * s, p.x * s + p.y * c);\n}\nvec2 getAnchorOffsets_L0() {\nreturn vec2(0.5, 0.5);\n}\nvec3 getFillColor_L0(vec2 localPos, vec2 elementSize, float signedDist, float maxInset) {\nvec2 halfSize = elementSize * 0.5;\nvec2 p = localPos - halfSize;\nreturn vec3(0.9490196078431372, 0.8509803921568627, 0.7647058823529411);\n}\nfloat sdBox_L0(vec2 p, vec2 b) {\nvec2 d = abs(p) - b;\nreturn length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);\n}\nfloat sdRegularPolygon_L0(vec2 p, int n) {\nint sides = max(n, 3);\nfloat fn = float(sides);\nfloat an = PI / fn;\nfloat bn = TAU / fn;\nfloat a = atan(p.y, p.x + 1e-9) + (PI * 0.5 - an);\na = mod(a + an, bn) - an;\nreturn length(p) * cos(a) - cos(an);\n}\nfloat sdShape_L0(vec2 canvasPosPx, vec2 elementPosPx, vec2 elementSizePx, float rotationTurns) {\nvec2 p = vec2(0.0);\nvec2 halfSize = vec2(0.0);\nelementSizePx = abs(elementSizePx);\nvec2 centerPx = elementPosPx + elementSizePx * 0.5;\nvec2 rel = canvasPosPx - centerPx;\nvec2 local = rotate2D_L0(rel, -rotationTurns * TAU) + elementSizePx * 0.5;\np = local - elementSizePx * 0.5;\nhalfSize = elementSizePx * 0.5;\nvec2 pn = vec2(p.x / max(halfSize.x, 0.00001), p.y / max(halfSize.y, 0.00001));\nfloat d = sdRegularPolygon_L0(pn, int(3.0000));\nreturn d * min(halfSize.x, halfSize.y);\nreturn sdBox_L0(p, halfSize);\n}\nvec4 sampleShape_L0(vec2 canvasUV) {\nvec2 canvasPosPx = vec2(canvasUV.x * uArtboardResolution.x, (1.0 - canvasUV.y) * uArtboardResolution.y);\nfloat absWidth = uL0_Width * uArtboardResolution.x;\nfloat absHeight = 0.9012 * uArtboardResolution.y;\nabsHeight = absWidth / 1.0256;\nvec2 elementSizePx = vec2(absWidth, absHeight);\nvec2 elementPosPx = vec2(0.5000, uL0_Top) * uArtboardResolution - getAnchorOffsets_L0() * elementSizePx;\nfloat dist = sdShape_L0(canvasPosPx, elementPosPx, elementSizePx, 0.0000);\nfloat aa = max(length(vec2(dFdx(dist), dFdy(dist))), 0.75);\nfloat uvGrad = max(length(dFdx(canvasUV)), length(dFdy(canvasUV)));\nfloat seamFactor = smoothstep(0.01, 0.03, uvGrad);\naa = mix(aa, 0.75, seamFactor);\nfloat fillAlpha = 1.0 - smoothstep(mix(0.0, -150., 1.0000), mix(aa, 150., 1.0000), dist);\nfillAlpha = mix(fillAlpha, step(dist, 0.0), seamFactor);\nvec2 localPos;\nlocalPos = rotate2D_L0(canvasPosPx - (elementPosPx + elementSizePx * 0.5), 0.0000 * -TAU) + elementSizePx * 0.5;\nvec2 localSize;\nlocalSize = elementSizePx;\nvec2 centerPx;\ncenterPx = elementPosPx + elementSizePx * 0.5;\nfloat centerDist = sdShape_L0(centerPx, elementPosPx, elementSizePx, 0.0000);\nfloat maxInset = max(-centerDist, 0.00001);\nmaxInset = min(localSize.x, localSize.y) * 0.5;\nvec3 fillRgb = getFillColor_L0(localPos, localSize, dist, maxInset);\nfloat finalFillAlpha = fillAlpha * 1.0000;\nvec4 fill = vec4(fillRgb * finalFillAlpha, finalFillAlpha);\nfloat strokeAlpha = 0.0;\nvec4 stroke = vec4(vec3(0.10980392156862745, 0.10980392156862745, 0.10588235294117647) * strokeAlpha, strokeAlpha);\nvec4 col = stroke + fill * (1.0 - stroke.a);\nreturn col;\n}\nfloat ease_L1 (int easingFunc, float t) {\nreturn t;\n}\nvec3 hash33_L1(vec3 p3) {\np3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));\np3 += dot(p3, p3.yxz + 19.19);\nreturn -1.0 + 2.0 * fract(vec3(\n(p3.x + p3.y) * p3.z,\n(p3.x + p3.z) * p3.y,\n(p3.y + p3.z) * p3.x\n));\n}\nfloat perlin_noise_L1(vec3 p) {\nvec3 pi = floor(p);\nvec3 pf = p - pi;\nvec3 w = pf * pf * (3.0 - 2.0 * pf);\nfloat n000 = dot(pf - vec3(0.0, 0.0, 0.0), hash33_L1(pi + vec3(0.0, 0.0, 0.0)));\nfloat n100 = dot(pf - vec3(1.0, 0.0, 0.0), hash33_L1(pi + vec3(1.0, 0.0, 0.0)));\nfloat n010 = dot(pf - vec3(0.0, 1.0, 0.0), hash33_L1(pi + vec3(0.0, 1.0, 0.0)));\nfloat n110 = dot(pf - vec3(1.0, 1.0, 0.0), hash33_L1(pi + vec3(1.0, 1.0, 0.0)));\nfloat n001 = dot(pf - vec3(0.0, 0.0, 1.0), hash33_L1(pi + vec3(0.0, 0.0, 1.0)));\nfloat n101 = dot(pf - vec3(1.0, 0.0, 1.0), hash33_L1(pi + vec3(1.0, 0.0, 1.0)));\nfloat n011 = dot(pf - vec3(0.0, 1.0, 1.0), hash33_L1(pi + vec3(0.0, 1.0, 1.0)));\nfloat n111 = dot(pf - vec3(1.0, 1.0, 1.0), hash33_L1(pi + vec3(1.0, 1.0, 1.0)));\nfloat nx00 = mix(n000, n100, w.x);\nfloat nx01 = mix(n001, n101, w.x);\nfloat nx10 = mix(n010, n110, w.x);\nfloat nx11 = mix(n011, n111, w.x);\nfloat nxy0 = mix(nx00, nx10, w.y);\nfloat nxy1 = mix(nx01, nx11, w.y);\nfloat nxyz = mix(nxy0, nxy1, w.z);\nreturn nxyz;\n}\nvec2 distortUV_L1(vec2 uv) {\nvec2 st = uv;\nfloat aspectRatio = uResolution.x / max(uResolution.y, 0.001);\nvec2 aspectVec = vec2(aspectRatio, 1.);\nvec2 mPos = uL1_Pos + mix(vec2(0), (uMousePos-0.5), 0.0000);\nfloat mixRadiusStep = step(1.0, 1.0000);\nvec2 pos = mix(uL1_Pos, mPos, mixRadiusStep);\nfloat dist = ease_L1(0, max(0.,1. - length(st * aspectVec - mPos * aspectVec) * 4. * (1. - 1.0000)));\nfloat sprd = (uL1_Scale + 0.01) / ((aspectRatio + 1.) / 2.);\nfloat amt = (1.0000 * 2.0) * 0.01 * dist;\nif(amt <= 0.) {\nreturn st;\n}\nvec2 invPos = 1. - pos;\nfloat freq = 5. * sprd;\nfloat t = 0.0000 * 5. + uL1_Time * 0.0166;\nfloat degrees = 360. * (0.5000 * 6.);\nfloat rad = degrees * PI / 180.;\nfor (int i = 0;\ni < MAX_ITERATIONS;\ni++) {\nvec2 clampedSt = clamp(st, -1., 2.);\nvec2 scaled = (clampedSt - 0.5) * aspectVec + invPos;\nfloat perlin = perlin_noise_L1(vec3((scaled - 0.5) * freq, t)) - 0.5;\nfloat ang = perlin * rad;\nst += vec2(cos(ang), sin(ang)) * amt;\n}\nreturn mix(uv, clamp(st, 0., 1.), 1.0000);\n}\n\nvec4 computeLayer_L0(vec2 uv) {\nvec2 pos = (uL0_MousePos - 0.5) * uL0_TrackMouse;\nuv -= pos;\nvec4 color = sampleShape_L0(uv);\nreturn color;\n}\n\nvoid main() {\nvec2 uv = vTextureCoord;\nvec2 uv_z1_raw = distortUV_L1(uv);\nvec2 uv_z1 = mix(uv, uv_z1_raw, clamp(uL1_ElemOpacity, 0.0, 1.0));\nvec4 result = texture(uBgTexture, uv_z1);\nvec4 c0 = computeLayer_L0(uv_z1);\n{\nvec3 _s = c0.rgb / max(c0.a, 0.0001);\nvec3 _d = result.rgb;\nc0 = vec4(vec3((_d.x <= 0.5) ? (2.0 * _s.x * _d.x) : (1.0 - 2.0 * (1.0 - _d.x) * (1.0 - _s.x)), (_d.y <= 0.5) ? (2.0 * _s.y * _d.y) : (1.0 - 2.0 * (1.0 - _d.y) * (1.0 - _s.y)), (_d.z <= 0.5) ? (2.0 * _s.z * _d.z) : (1.0 - 2.0 * (1.0 - _d.z) * (1.0 - _s.z))), 1.0) * (c0.a * uL0_ElemOpacity);\n}\nresult = c0 + result * (1.0 - c0.a);\nfragColor = result;\n}"],"compiledVertexShaders":["#version 300 es\n// Copyright (c) Unicorn Studio. Licensed under the Unicorn Studio Commercial License.\n// Unauthorized copying, redistribution, or use in competing products is prohibited.\nprecision highp float;\nin vec3 aVertexPosition;\nin vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nout vec2 vTextureCoord;\nout vec3 vVertexPosition;\nvoid main() {\ngl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\nvVertexPosition = aVertexPosition;\nvTextureCoord = aTextureCoord;\n}"],"sublayers":[{"id":"be5d7c43-8bb8-4934-a945-2b3acb205d81","publicId":"shape","layerType":"shape","sublayerIndex":0,"opacity":1,"blendMode":"OVERLAY","animating":false,"width":0.5776388888888888,"widthMode":0,"height":0.9011934293097082,"heightMode":2,"left":0.5,"top":0.49999999999999994,"anchorPoint":8,"aspectRatio":1.0255536626916524},{"id":"51df0a9c-0134-49d0-9bee-173b786634c6","publicId":"flow_field","layerType":"effect","type":"flowField","sublayerIndex":1,"opacity":1,"animating":true}],"data":{"uniforms":{"resolution":{"name":"uResolution","type":"2f","value":{"type":"Vec2","_x":1080,"_y":1080}},"mousePos":{"name":"uMousePos","type":"2f","value":{"type":"Vec2","_x":0.5,"_y":0.5}},"artboardResolution":{"name":"uArtboardResolution","type":"2f","value":{"type":"Vec2","_x":1440,"_y":900}},"L0_aspectRatio":{"name":"uAspectRatio","type":"1f","value":1.0255536626916524},"L0_top":{"name":"uL0_Top","type":"1f","value":0.49999999999999994},"L0_trackMouse":{"name":"uL0_TrackMouse","type":"1f","value":0},"L0_width":{"name":"uL0_Width","type":"1f","value":0.5776388888888888},"L0_elemOpacity":{"name":"uL0_ElemOpacity","type":"1f","value":1},"L1_spread":{"name":"uL1_Scale","type":"1f","value":0.25},"L1_pos":{"name":"uL1_Pos","type":"2f","value":{"type":"Vec2","_x":0.5,"_y":0.5}},"L1_time":{"name":"uL1_Time","type":"1f","value":0},"L1_elemOpacity":{"name":"uL1_ElemOpacity","type":"1f","value":1},"L0_mousePos":{"name":"uL0_MousePos","type":"2f","value":{"type":"Vec2","_x":0.5,"_y":0.5}}},"textures":[],"timeUniforms":[{"key":"L1_time","speed":0.2,"animating":true}],"mouseUniforms":[{"key":"L0_mousePos","momentum":1.8,"spring":0,"trackAxes":"xy"}],"hasMouseTracking":true,"hasVideoSublayers":false,"estimatedSublayerWorkRaw":69.84999999999998,"occlusion":{"candidateLayers":0}},"states":{"appear":[],"scroll":[],"hover":[],"mousemove":[]},"breakpoints":[{"name":"Desktop","min":992,"max":null,"props":{"L0_top":0.49999999999999994,"L0_trackMouse":1,"L0_width":0.5776388888888888,"L1_spread":0.36,"L1_pos":{"type":"Vec2","_x":0.4958162343528197,"_y":0.5059919989676087}}},{"name":"Mobile","min":0,"max":575,"props":{"L0_top":0.5,"L0_trackMouse":0,"L0_width":0.951924168959944,"L1_spread":0.304,"L1_pos":{"type":"Vec2","_x":0.5214344679710533,"_y":0.4164034435875842}}}],"userDownsample":1,"visible":true}],"options":{"name":"Flow gradient (Remix)","fps":60,"dpi":1,"scale":0.75,"includeLogo":false,"isProduction":false,"flatten":true},"version":"2.2.14","id":"oJCcJds41vZmulPTjsiB"};

(function() {
  const origFetch = window.fetch;
  window.fetch = function(input, init) {
    const url = typeof input === 'string' ? input : (input && input.url ? input.url : '');
    if (url.includes('flow_gradient_remix_scene') || (url.endsWith('.json') && url.includes('scene'))) {
      return Promise.resolve(new Response(JSON.stringify(UNICORN_SCENE_DATA), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    }
    if (origFetch) {
      return origFetch.apply(this, arguments).catch(err => {
        console.warn('Fetch fallback for:', url, err);
        return Promise.resolve(new Response(JSON.stringify(UNICORN_SCENE_DATA), { status: 200 }));
      });
    }
    return Promise.resolve(new Response(JSON.stringify(UNICORN_SCENE_DATA), { status: 200 }));
  };
})();

// 1. Initialize Lenis Smooth Scrolling
let lenisInstance = null;
try {
  if (typeof Lenis !== 'undefined') {
    window.lenis = new Lenis({
      anchors: true,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      duration: 1.2
    });
    lenisInstance = window.lenis;
    if (typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }
} catch (e) {
  console.warn('Lenis init note:', e);
}

// 2. Global Parallax
function initGlobalParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const mm = gsap.matchMedia();
  mm.add(
    {
      isMobile: "(max-width:479px)",
      isMobileLandscape: "(max-width:767px)",
      isTablet: "(max-width:991px)",
      isDesktop: "(min-width:992px)"
    },
    (context) => {
      const { isMobile, isMobileLandscape, isTablet } = context.conditions;
      const ctx = gsap.context(() => {
        document.querySelectorAll('[data-parallax="trigger"]').forEach((trigger) => {
          const disable = trigger.getAttribute("data-parallax-disable");
          if (
            (disable === "mobile" && isMobile) ||
            (disable === "mobileLandscape" && isMobileLandscape) ||
            (disable === "tablet" && isTablet)
          ) {
            return;
          }
          const target = trigger.querySelector('[data-parallax="target"]') || trigger;
          const direction = trigger.getAttribute("data-parallax-direction") || "vertical";
          const prop = direction === "horizontal" ? "xPercent" : "yPercent";
          const scrubAttr = trigger.getAttribute("data-parallax-scrub");
          const scrub = scrubAttr ? parseFloat(scrubAttr) : true;
          const startAttr = trigger.getAttribute("data-parallax-start");
          const startVal = startAttr !== null ? parseFloat(startAttr) : 20;
          const endAttr = trigger.getAttribute("data-parallax-end");
          const endVal = endAttr !== null ? parseFloat(endAttr) : -20;
          const scrollStartRaw = trigger.getAttribute("data-parallax-scroll-start") || "top bottom";
          const scrollStart = `clamp(${scrollStartRaw})`;
          const scrollEndRaw = trigger.getAttribute("data-parallax-scroll-end") || "bottom top";
          const scrollEnd = `clamp(${scrollEndRaw})`;

          gsap.fromTo(
            target,
            { [prop]: startVal },
            {
              [prop]: endVal,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: scrollStart,
                end: scrollEnd,
                scrub,
              },
            }
          );
        });
      });
      return () => ctx.revert();
    }
  );
}

// 3. Dynamic Text Cursor
function initDynamicTextCursor() {
  const cursor = document.querySelector('[data-cursor]');
  const cursorTextTarget = document.querySelector('[data-cursor-text-target]');
  if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let hasMouseMoved = false;

  const xTo = (typeof gsap !== 'undefined') ? gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3.out' }) : null;
  const yTo = (typeof gsap !== 'undefined') ? gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3.out' }) : null;

  function updateCursor() {
    const hoverItem = document.elementFromPoint(mouseX, mouseY)?.closest("[data-cursor-hover]");
    const rect = cursor.getBoundingClientRect();
    const isHovering = !!hoverItem;
    const isEdge = rect.right >= window.innerWidth;
    cursor.setAttribute("data-cursor", isHovering ? (isEdge ? "active-edge" : "active") : "");

    if (isHovering) {
      const imageEl = hoverItem.querySelector("[data-cursor-image]");
      const onImage = imageEl && (() => {
        const imgRect = imageEl.getBoundingClientRect();
        return (
          mouseX >= imgRect.left &&
          mouseX <= imgRect.right &&
          mouseY >= imgRect.top &&
          mouseY <= imgRect.bottom
        );
      })();
      cursor.setAttribute("data-cursor-theme", onImage ? "on-image" : "off-image");
    }
    if (hoverItem && cursorTextTarget) {
      const text = hoverItem.getAttribute("data-cursor-text");
      if (text) cursorTextTarget.textContent = text;
    }
  }

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    hasMouseMoved = true;
    if (xTo && yTo) {
      xTo(mouseX);
      yTo(mouseY);
    } else {
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
    requestAnimationFrame(updateCursor);
  });

  window.addEventListener('scroll', () => {
    if (!hasMouseMoved) return;
    requestAnimationFrame(updateCursor);
  }, { passive: true });
}

// 4. Privacy Modal
function initModalBasic() {
  const modalGroup = document.querySelector('[data-modal-group-status]');
  const modals = document.querySelectorAll('[data-modal-name]');
  const modalTargets = document.querySelectorAll('[data-modal-target]');

  modalTargets.forEach((modalTarget) => {
    modalTarget.addEventListener('click', function(e) {
      e.preventDefault();
      const modalTargetName = this.getAttribute('data-modal-target');
      modalTargets.forEach((target) => target.setAttribute('data-modal-status', 'not-active'));
      modals.forEach((modal) => modal.setAttribute('data-modal-status', 'not-active'));
      
      const targetElem = document.querySelector(`[data-modal-target="${modalTargetName}"]`);
      const modalElem = document.querySelector(`[data-modal-name="${modalTargetName}"]`);
      if (targetElem) targetElem.setAttribute('data-modal-status', 'active');
      if (modalElem) modalElem.setAttribute('data-modal-status', 'active');
      if (modalGroup) modalGroup.setAttribute('data-modal-group-status', 'active');
      if (window.lenis) window.lenis.stop();
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach((closeBtn) => {
    closeBtn.addEventListener('click', closeAllModals);
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeAllModals();
      closeContactModal();
    }
  });

  function closeAllModals() {
    modalTargets.forEach((target) => target.setAttribute('data-modal-status', 'not-active'));
    modals.forEach((modal) => modal.setAttribute('data-modal-status', 'not-active'));
    if (modalGroup) {
      modalGroup.setAttribute('data-modal-group-status', 'not-active');
    }
    if (window.lenis) window.lenis.start();
  }
}

// 5. Contact / Booking Modal Handler
function initContactModal() {
  let backdrop = document.querySelector('.modal-contact-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'modal-contact-backdrop';
    const waUrl = "https://wa.me/917010254014?text=Hi%20Jegatheesh%2C%20I%20would%20like%20to%20discuss%20building%20a%20premium%20portfolio%20website%20for%20my%20photography%20business.";
    backdrop.innerHTML = `
      <div class="modal-contact-card">
        <button class="modal-contact-close" aria-label="Close modal">&times;</button>
        <h2 class="modal-contact-title">Let's connect.</h2>
        <p class="modal-contact-desc">Ready to build a premium, visually stunning portfolio website for your photography business? Reach out directly via WhatsApp, email, or any social channel:</p>
        <div class="modal-contact-options">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="modal-contact-btn modal-contact-btn--whatsapp">
            <span>WhatsApp: +91 7010254014</span>
            <svg viewBox="0 0 11 11"><path d="M1.24993 10.5245L-9.14435e-06 9.27457L7.49961 1.77495L0.624959 1.77495L0.624959 3.99351e-05L10.5245 4.06895e-05L10.5245 9.89954L8.74954 9.89954L8.74954 3.02489L1.24993 10.5245Z"/></svg>
          </a>
          <a href="mailto:jegatheeshwebstudio@gmail.com?subject=Portfolio%20Website%20Inquiry%20-%20Jegatheesh%20Web%20Studio" class="modal-contact-btn modal-contact-btn--email">
            <span>Email: jegatheeshwebstudio@gmail.com</span>
            <svg viewBox="0 0 11 11"><path d="M1.24993 10.5245L-9.14435e-06 9.27457L7.49961 1.77495L0.624959 1.77495L0.624959 3.99351e-05L10.5245 4.06895e-05L10.5245 9.89954L8.74954 9.89954L8.74954 3.02489L1.24993 10.5245Z"/></svg>
          </a>
          <a href="tel:+917010254014" class="modal-contact-btn modal-contact-btn--phone">
            <span>Direct Call: +91 7010254014</span>
            <svg viewBox="0 0 11 11"><path d="M1.24993 10.5245L-9.14435e-06 9.27457L7.49961 1.77495L0.624959 1.77495L0.624959 3.99351e-05L10.5245 4.06895e-05L10.5245 9.89954L8.74954 9.89954L8.74954 3.02489L1.24993 10.5245Z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/william-jegatheesh-s-b8b365329" target="_blank" rel="noopener noreferrer" class="modal-contact-btn modal-contact-btn--linkedin">
            <span>LinkedIn: William Jegatheesh</span>
            <svg viewBox="0 0 11 11"><path d="M1.24993 10.5245L-9.14435e-06 9.27457L7.49961 1.77495L0.624959 1.77495L0.624959 3.99351e-05L10.5245 4.06895e-05L10.5245 9.89954L8.74954 9.89954L8.74954 3.02489L1.24993 10.5245Z"/></svg>
          </a>
          <a href="https://www.instagram.com/jegatheeshwebstudio.in" target="_blank" rel="noopener noreferrer" class="modal-contact-btn modal-contact-btn--instagram">
            <span>Instagram: @jegatheeshwebstudio.in</span>
            <svg viewBox="0 0 11 11"><path d="M1.24993 10.5245L-9.14435e-06 9.27457L7.49961 1.77495L0.624959 1.77495L0.624959 3.99351e-05L10.5245 4.06895e-05L10.5245 9.89954L8.74954 9.89954L8.74954 3.02489L1.24993 10.5245Z"/></svg>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61575322053613" target="_blank" rel="noopener noreferrer" class="modal-contact-btn modal-contact-btn--facebook">
            <span>Facebook: Jegatheesh Web Studio</span>
            <svg viewBox="0 0 11 11"><path d="M1.24993 10.5245L-9.14435e-06 9.27457L7.49961 1.77495L0.624959 1.77495L0.624959 3.99351e-05L10.5245 4.06895e-05L10.5245 9.89954L8.74954 9.89954L8.74954 3.02489L1.24993 10.5245Z"/></svg>
          </a>
          <a href="https://github.com/jegatheesh-che" target="_blank" rel="noopener noreferrer" class="modal-contact-btn modal-contact-btn--github">
            <span>GitHub: @jegatheesh-che</span>
            <svg viewBox="0 0 11 11"><path d="M1.24993 10.5245L-9.14435e-06 9.27457L7.49961 1.77495L0.624959 1.77495L0.624959 3.99351e-05L10.5245 4.06895e-05L10.5245 9.89954L8.74954 9.89954L8.74954 3.02489L1.24993 10.5245Z"/></svg>
          </a>
        </div>
        <div class="modal-contact-personal">
          <p class="modal-contact-personal-title">Want to know more about Jegatheesh? Feel free to visit my personal spaces:</p>
          <div class="modal-contact-personal-grid">
            <a href="https://jegatheesh.fun" target="_blank" rel="noopener noreferrer" class="modal-contact-btn modal-contact-btn--portfolio">
              <span class="modal-contact-port-text">
                <strong>jegatheesh.fun</strong>
                <small>Personal Space</small>
              </span>
              <svg viewBox="0 0 11 11"><path d="M1.24993 10.5245L-9.14435e-06 9.27457L7.49961 1.77495L0.624959 1.77495L0.624959 3.99351e-05L10.5245 4.06895e-05L10.5245 9.89954L8.74954 9.89954L8.74954 3.02489L1.24993 10.5245Z"/></svg>
            </a>
            <a href="https://jegatheesh.online" target="_blank" rel="noopener noreferrer" class="modal-contact-btn modal-contact-btn--portfolio">
              <span class="modal-contact-port-text">
                <strong>jegatheesh.online</strong>
                <small>Personal Website</small>
              </span>
              <svg viewBox="0 0 11 11"><path d="M1.24993 10.5245L-9.14435e-06 9.27457L7.49961 1.77495L0.624959 1.77495L0.624959 3.99351e-05L10.5245 4.06895e-05L10.5245 9.89954L8.74954 9.89954L8.74954 3.02489L1.24993 10.5245Z"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    backdrop.querySelector('.modal-contact-close').addEventListener('click', closeContactModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeContactModal();
    });
  }

  document.querySelectorAll('a[href="#contact"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  });
}

function openContactModal() {
  const backdrop = document.querySelector('.modal-contact-backdrop');
  if (backdrop) {
    backdrop.classList.add('is-open');
    if (window.lenis) window.lenis.stop();
  }
}

function closeContactModal() {
  const backdrop = document.querySelector('.modal-contact-backdrop');
  if (backdrop) {
    backdrop.classList.remove('is-open');
    if (window.lenis) window.lenis.start();
  }
}

// 6. Interactive Dots Grid Background
function initInteractiveDotsGridBackground() {
  const elements = document.querySelectorAll('[data-dots-canvas-init]');
  if (!elements.length) return;
  const gap = '3em';
  const dotSize = '0.125em';
  const shape = 'square';
  const dotColorInactive = 'rgba(8, 102, 255, 0.18)';
  const dotColorActive = '#60a5fa';
  const dotMaxScale = 1.75;
  const pressScale = 1.5;
  const hoverRadius = 10;
  const easeDuration = 0.9;
  const hasPointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const pointer = { x: 0, y: 0, cx: 0, cy: 0, active: false };
  const hover = { value: 0, from: 0, to: 0, start: 0 };
  const press = { value: 0, from: 0, to: 0, start: 0 };
  const canvases = [];
  let dpr, size, spacing, radius, raf, lastTime = performance.now();

  function toPx(value, element) {
    const probe = document.createElement('div');
    probe.style.cssText = `position:absolute;visibility:hidden;width:${value};`;
    element.appendChild(probe);
    const px = probe.getBoundingClientRect().width;
    probe.remove();
    return px;
  }

  function parseColor(color, element) {
    const probe = document.createElement('span');
    probe.style.color = color;
    element.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = resolved;
    ctx.fillRect(0, 0, 1, 1);
    const data = [...ctx.getImageData(0, 0, 1, 1).data];
    data[3] /= 255;
    return data;
  }

  function mixColor(a, b, p) {
    return `rgba(${a.map((v, i) => v + (b[i] - v) * p).join(',')})`;
  }

  function setEase(state, to) {
    Object.assign(state, { from: state.value, to, start: performance.now() });
  }

  function updateEase(state, time) {
    if (!easeDuration) return state.value = state.to;
    const p = Math.min(Math.max((time - state.start) / (easeDuration * 1000), 0), 1);
    state.value = state.from + (state.to - state.from) * (1 - Math.pow(1 - p, 4));
  }

  elements.forEach((element) => {
    let canvas = element.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      Object.assign(canvas.style, { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' });
      if (getComputedStyle(element).position === 'static') element.style.position = 'relative';
      element.prepend(canvas);
    }
    const ctx = canvas.getContext('2d');
    canvases.push({
      element, canvas, ctx, width: 0, height: 0, visible: true,
      inactive: parseColor(element.getAttribute('data-dots-color-inactive') || dotColorInactive, element),
      active: parseColor(element.getAttribute('data-dots-color-active') || dotColorActive, element)
    });
  });

  function pointerInside() {
    return canvases.some(({ element }) => {
      const r = element.getBoundingClientRect();
      return pointer.x >= r.left && pointer.x <= r.right && pointer.y >= r.top && pointer.y <= r.bottom;
    });
  }

  function render(state, origin) {
    const rect = state.element.getBoundingClientRect();
    const left = rect.left - origin.left;
    const top = rect.top - origin.top;
    const px = pointer.cx - origin.left;
    const py = pointer.cy - origin.top;
    const maxScale = dotMaxScale * (1 + (pressScale - 1) * press.value);
    state.ctx.clearRect(0, 0, state.width, state.height);
    const colStart = Math.floor(left / spacing);
    const colEnd = Math.ceil((left + state.width) / spacing);
    const rowStart = Math.floor(top / spacing);
    const rowEnd = Math.ceil((top + state.height) / spacing);

    for (let row = rowStart; row <= rowEnd; row++) {
      const gy = row * spacing;
      const y = gy - top;
      for (let col = colStart; col <= colEnd; col++) {
        const gx = col * spacing;
        const x = gx - left;
        const influence = hasPointer && hover.value ? Math.max(0, 1 - Math.hypot(gx - px, gy - py) / radius) * hover.value : 0;
        const currentSize = size * (1 + (maxScale - 1) * influence);
        state.ctx.fillStyle = mixColor(state.inactive, state.active, influence);
        if (shape === 'square') {
          state.ctx.fillRect(x - currentSize / 2, y - currentSize / 2, currentSize, currentSize);
        } else {
          state.ctx.beginPath();
          state.ctx.arc(x, y, currentSize / 2, 0, Math.PI * 2);
          state.ctx.fill();
        }
      }
    }
  }

  function renderAll(visibleOnly = false) {
    if (!elements[0]) return;
    const origin = elements[0].getBoundingClientRect();
    canvases.forEach(state => (!visibleOnly || state.visible) && render(state, origin));
  }

  function tick(time) {
    raf = null;
    if (!canvases.some(state => state.visible)) return;
    const delta = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;
    updateEase(hover, time);
    updateEase(press, time);
    if (!easeDuration) {
      pointer.cx = pointer.x;
      pointer.cy = pointer.y;
    } else {
      const strength = 1 - Math.exp(-delta * 6 / easeDuration);
      pointer.cx += (pointer.x - pointer.cx) * strength;
      pointer.cy += (pointer.y - pointer.cy) * strength;
    }
    renderAll(true);
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (hasPointer && !raf && canvases.some(state => state.visible)) {
      lastTime = performance.now();
      raf = requestAnimationFrame(tick);
    }
  }

  function resize() {
    if (!elements[0]) return;
    dpr = Math.min(devicePixelRatio || 1, 2);
    size = toPx(dotSize, elements[0]);
    spacing = size + toPx(gap, elements[0]);
    radius = spacing * hoverRadius;
    canvases.forEach(state => {
      const rect = state.element.getBoundingClientRect();
      state.width = rect.width;
      state.height = rect.height;
      state.canvas.width = Math.round(rect.width * dpr);
      state.canvas.height = Math.round(rect.height * dpr);
      state.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    renderAll();
    start();
  }

  if (hasPointer) {
    window.addEventListener('pointermove', e => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const inside = pointerInside();
      if (inside !== pointer.active) {
        pointer.active = inside;
        setEase(hover, +inside);
        if (inside) {
          pointer.cx = pointer.x;
          pointer.cy = pointer.y;
        } else {
          setEase(press, 0);
        }
      }
      start();
    });
    window.addEventListener('pointerdown', () => pointer.active && setEase(press, 1));
    window.addEventListener('pointerup', () => setEase(press, 0));
  }

  if ('IntersectionObserver' in window) {
    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const state = canvases.find(state => state.element === entry.target);
        if (state) state.visible = entry.isIntersecting;
      });
      hasPointer ? start() : renderAll(true);
    });
    elements.forEach(element => intersectionObserver.observe(element));
  }

  window.addEventListener('resize', resize);
  resize();
}

// 7. Sticky Title Scroll - Anti-Rush Reading Protection with Generous Holds & Smooth Inertial Scrub
function initStickyTitleScroll() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const wraps = document.querySelectorAll('[data-sticky-title="wrap"]');
  wraps.forEach((wrap) => {
    const headings = Array.from(wrap.querySelectorAll('[data-sticky-title="heading"]'));
    if (!headings.length) return;

    const indicator = wrap.querySelector('#sticky-scroll-indicator');
    const stepEl = wrap.querySelector('#sticky-scroll-step');
    const fillEl = wrap.querySelector('#sticky-scroll-fill');

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top 20%',
        end: 'bottom bottom',
        scrub: 1.2, // Generous damping prevents words from vanishing when scrolling fast
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!indicator) return;
          const p = self.progress;

          // 1. Update micro progress bar
          if (fillEl) {
            fillEl.style.width = `${Math.min(100, Math.max(0, p * 100))}%`;
          }

          // 2. Update step number dynamically
          let step = '01';
          if (p >= 0.62) {
            step = '03';
          } else if (p >= 0.31) {
            step = '02';
          }
          if (stepEl && stepEl.textContent !== step) {
            stepEl.textContent = step;
          }

          // 3. Adaptive theme contrast (turns navy when background becomes white)
          if (p >= 0.58) {
            indicator.classList.add('is--dark');
          } else {
            indicator.classList.remove('is--dark');
          }

          // 4. Smooth dissolve as section transitions into portfolio
          if (p > 0.94) {
            indicator.style.opacity = '0';
            indicator.style.transform = 'translateX(-50%) translateY(8px)';
          } else {
            indicator.style.opacity = '1';
            indicator.style.transform = 'translateX(-50%) translateY(0)';
          }
        },
      },
    });

    headings.forEach((heading, index) => {
      heading.setAttribute('aria-label', heading.textContent.trim());

      // Collect target words cleanly per element to preserve block hierarchies (main vs sub)
      let targets = [];
      const childSpans = heading.querySelectorAll('.sticky-title-main, .sticky-title-sub');

      if (typeof SplitText !== 'undefined') {
        if (childSpans.length > 0) {
          childSpans.forEach((span) => {
            const split = new SplitText(span, { type: 'words' });
            split.words.forEach((w) => {
              w.setAttribute('aria-hidden', 'true');
              targets.push(w);
            });
          });
        } else {
          const split = new SplitText(heading, { type: 'words' });
          split.words.forEach((w) => {
            w.setAttribute('aria-hidden', 'true');
            targets.push(w);
          });
        }
      } else {
        targets = Array.from(childSpans.length > 0 ? childSpans : [heading]);
      }

      gsap.set(heading, { visibility: 'visible' });
      gsap.set(targets, { autoAlpha: 0, y: 24 });

      const headingTl = gsap.timeline();

      // 1. Smooth Word-by-Word Reveal
      headingTl.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.035,
        ease: 'power2.out',
      });

      // 2. Generous Static Reading Hold (~70% of slide runway: 100% visible, completely stationary)
      const holdTime = (index === headings.length - 1) ? 2.2 : 1.6;
      headingTl.to({}, { duration: holdTime });

      // 3. Gentle Exit (all except the last heading which comfortably holds)
      if (index < headings.length - 1) {
        headingTl.to(targets, {
          autoAlpha: 0,
          y: -18,
          duration: 0.45,
          stagger: 0.02,
          ease: 'power2.in',
        });
      }

      if (index === 0) {
        masterTl.add(headingTl);
      } else {
        masterTl.add(headingTl, '-=0.15');
      }
    });
  });
}

// 8. Work Scroll-Triggered Auto-Playing Videos & Interactive Hover
function initHoverVideo() {
  const wraps = document.querySelectorAll('.work_image-wrap');
  if (!wraps.length) return;

  wraps.forEach(function(wrap) {
    const target = wrap.querySelector('.parallax-target');
    const img = target ? target.querySelector('.work_img') : null;
    const video = wrap.querySelector('video');
    if (!video) return;

    wrap.style.overflow = 'hidden';
    if (img) {
      img.style.transition = 'filter 0.5s ease';
    }
    video.style.pointerEvents = 'none';
    video.style.transition = 'opacity 0.5s ease, transform 0.4s ease';
    video.style.zIndex = '5';
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;

    // Hover interactive enhancement (smooth scale)
    wrap.addEventListener('mouseenter', function() {
      video.style.transform = 'scale(1.03)';
      if (video.paused) {
        const p = video.play();
        if (p) p.catch(function() {});
      }
    });

    wrap.addEventListener('mouseleave', function() {
      video.style.transform = 'scale(1)';
    });
  });

  // IntersectionObserver: automatically starts playing as you scroll into view
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        const wrap = entry.target;
        const video = wrap.querySelector('video');
        const img = wrap.querySelector('.work_img');
        if (!video) return;

        if (entry.isIntersecting) {
          // Card scrolled into view: reveal video and play
          video.style.opacity = '1';
          if (img) img.style.filter = 'blur(4px)';
          const playPromise = video.play();
          if (playPromise) playPromise.catch(function() {});
        } else {
          // Card scrolled out of view: pause to conserve memory & CPU
          video.pause();
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '80px 0px 80px 0px'
    });

    wraps.forEach(function(wrap) {
      videoObserver.observe(wrap);
    });
  } else {
    // Fallback for environments without IntersectionObserver
    wraps.forEach(function(wrap) {
      const video = wrap.querySelector('video');
      if (video) {
        video.style.opacity = '1';
        video.play().catch(function() {});
      }
    });
  }
}

// 9. What I Can Help With - Pinned Sticky Roadmap & Progress Experience
function initRoadmapSection() {
  const canvas = document.getElementById('roadmap-canvas');
  const pathBg = document.getElementById('roadmap-path-bg');
  const pathActive = document.getElementById('roadmap-path-active');
  const pathHead = document.getElementById('roadmap-path-head');
  const trackerText = document.getElementById('roadmap-tracker-text');
  const trackerFill = document.getElementById('roadmap-tracker-fill');
  if (!canvas || !pathBg || !pathActive) return;

  const items = Array.from(canvas.querySelectorAll('.roadmap_item:not(.roadmap_item--founder)'));
  const founderWrap = canvas.querySelector('.roadmap_founder-wrap');

  const stepLabels = [
    'Step 01 of 05 — Discover Your Vision',
    'Step 02 of 05 — Gather Your Story',
    'Step 03 of 05 — Design & Build',
    'Step 04 of 05 — Review & Refine',
    'Step 05 of 05 — Launch With Confidence',
    'Launch Ready — Direct 1-on-1 Studio Collaboration'
  ];

  let totalLength = 0;

  function updateRoadmapPath() {
    const canvasRect = canvas.getBoundingClientRect();
    const isMobile = window.innerWidth <= 991;
    const points = [];

    // Collect pin centers for all 5 cards
    items.forEach((item) => {
      const pin = item.querySelector('.roadmap_pin') || item;
      const rect = pin.getBoundingClientRect();
      points.push({
        x: rect.left + rect.width / 2 - canvasRect.left,
        y: rect.top + rect.height / 2 - canvasRect.top
      });
    });

    // Add founder avatar point
    if (founderWrap) {
      const avatar = founderWrap.querySelector('.roadmap_founder-avatar-wrap') || founderWrap;
      const fRect = avatar.getBoundingClientRect();
      points.push({
        x: fRect.left + fRect.width / 2 - canvasRect.left,
        y: fRect.top + fRect.height / 2 - canvasRect.top
      });
    }

    if (points.length < 2) return;

    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

    if (isMobile) {
      // Mobile Spine: Clean left rail connecting pins without intersecting card bodies
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const dy = p1.y - p0.y;

        if (i === points.length - 2) {
          // Last segment: curve gently into the founder partner avatar
          const cp1x = p0.x;
          const cp1y = p0.y + dy * 0.45;
          const cp2x = p1.x;
          const cp2y = p1.y - dy * 0.35;
          d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
        } else {
          // Micro-spline along the left timeline spine
          const sway = (i % 2 === 0 ? 3.5 : -3.5);
          const cp1x = p0.x + sway;
          const cp1y = p0.y + dy * 0.35;
          const cp2x = p1.x - sway;
          const cp2y = p1.y - dy * 0.35;
          d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
        }
      }
    } else {
      // Desktop: Elegant zig-zag cubic Bézier curve
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        
        const cp1x = p0.x + dx * 0.45;
        const cp1y = p0.y + dy * 0.08;
        const cp2x = p1.x - dx * 0.15;
        const cp2y = p1.y - dy * 0.55;

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
      }
    }

    pathBg.setAttribute('d', d);
    pathActive.setAttribute('d', d);

    totalLength = pathActive.getTotalLength();
    pathActive.style.strokeDasharray = `${totalLength} ${totalLength}`;
  }

  // Initial path calculation
  updateRoadmapPath();
  window.addEventListener('resize', () => {
    updateRoadmapPath();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });

  // Re-run after window load & fonts ready to ensure exact pin positions
  window.addEventListener('load', updateRoadmapPath);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateRoadmapPath);
  }

  // Card Tactile Physics
  items.forEach((item) => {
    const card = item.querySelector('.roadmap_card');
    if (!card) return;

    card.addEventListener('click', () => {
      // Delightful Tactile Wobble Physics
      if (typeof gsap !== 'undefined') {
        const dir = Math.random() > 0.5 ? 1 : -1;
        const defaultTilt = parseFloat(getComputedStyle(card).getPropertyValue('--card-tilt')) || 0;
        gsap.timeline()
          .to(card, { rotation: defaultTilt + dir * 5, duration: 0.08, ease: 'power1.out' })
          .to(card, { rotation: defaultTilt - dir * 3, duration: 0.08, ease: 'power1.inOut' })
          .to(card, { rotation: defaultTilt, duration: 0.8, ease: 'elastic.out(1.3, 0.35)' });
      }
    });
  });

  // GSAP ScrollTrigger for Scroll Progress Feel
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      trigger: canvas,
      start: 'top 75%',
      end: 'bottom 80%',
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        if (totalLength === 0) updateRoadmapPath();

        const offset = totalLength * (1 - progress);
        pathActive.style.strokeDashoffset = offset;

        // Position tracking head glow dot
        if (pathHead && totalLength > 0) {
          const currentLen = totalLength * progress;
          if (progress > 0.02) {
            const pt = pathActive.getPointAtLength(currentLen);
            pathHead.setAttribute('cx', pt.x.toFixed(1));
            pathHead.setAttribute('cy', pt.y.toFixed(1));
            pathHead.style.opacity = '1';
          } else {
            pathHead.style.opacity = '0';
          }
        }

        // Active state and tactile bounce per milestone
        const stepCount = items.length;
        let activeIdx = 0;
        items.forEach((item, idx) => {
          const threshold = (idx + 0.15) / (stepCount + 0.5);
          const card = item.querySelector('.roadmap_card');
          const pin = item.querySelector('.roadmap_pin');

          if (progress >= threshold) {
            activeIdx = idx;
            if (!item.classList.contains('is-active')) {
              item.classList.add('is-active');
              if (card && window.innerWidth > 991) {
                gsap.fromTo(card, { scale: 0.95 }, { scale: 1, duration: 0.45, ease: 'back.out(1.4)' });
              }
              if (pin) {
                gsap.fromTo(pin, { scale: 0.8 }, { scale: 1, duration: 0.45, ease: 'back.out(1.6)' });
              }
            }
          } else {
            item.classList.remove('is-active');
          }
        });

        if (progress > 0.92) activeIdx = 5;

        // Update Tracker UI
        if (trackerText && stepLabels[activeIdx]) {
          trackerText.textContent = stepLabels[activeIdx];
        }
        if (trackerFill) {
          trackerFill.style.width = `${Math.max(15, Math.min(100, (activeIdx + 1) * 20))}%`;
        }
      }
    });
  }
}

// 10. Shutter Scroll Transition
function initShutterScrollTransition() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const defaultRows = 6;
  const defaultMode = 'cover';
  const defaultScrollStart = { cover: 'bottom 60%', reveal: 'top bottom' };
  const defaultScrollEnd = { cover: 'bottom top', reveal: 'top center' };
  const defaultScrub = 2.3;
  const defaultShutterDuration = 0.1;
  const defaultStaggerAmount = 0.01;
  const panelClass = 'shutter-scroll-transition__panel';
  const rowClass = 'shutter-scroll-transition__row';

  const breakpoints = {
    mobile: '(max-width: 478px)',
    landscape: '(max-width: 767px)',
    tablet: '(max-width: 991px)',
  };

  function getMode(wrapper) {
    return wrapper.dataset.mode === 'reveal' ? 'reveal' : defaultMode;
  }

  function getRows(wrapper) {
    const base = parseInt(wrapper.dataset.rows, 10) || defaultRows;
    if (window.matchMedia(breakpoints.mobile).matches) {
      return parseInt(wrapper.dataset.rowsMobile, 10) || base;
    }
    if (window.matchMedia(breakpoints.landscape).matches) {
      return parseInt(wrapper.dataset.rowsLandscape, 10) || base;
    }
    if (window.matchMedia(breakpoints.tablet).matches) {
      return parseInt(wrapper.dataset.rowsTablet, 10) || base;
    }
    return base;
  }

  function buildRows(wrapper, rows) {
    let panel = wrapper.querySelector('[data-shutter-scroll-panel]');
    if (!panel) {
      panel = document.createElement('div');
      panel.classList.add(panelClass);
      panel.setAttribute('data-shutter-scroll-panel', '');
      const fragment = document.createDocumentFragment();
      for (let r = 0; r < rows; r++) {
        const row = document.createElement('div');
        row.classList.add(rowClass);
        row.setAttribute('data-shutter-scroll-row', '');
        fragment.appendChild(row);
      }
      panel.appendChild(fragment);
      wrapper.appendChild(panel);
    }
    return { panel };
  }

  function createAnimation(wrapper, rows, section, mode) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: wrapper.dataset.scrollStart || defaultScrollStart[mode],
        end: wrapper.dataset.scrollEnd || defaultScrollEnd[mode],
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      },
    });
    const fromScale = mode === 'cover' ? 0 : 1;
    const toScale = mode === 'cover' ? 1 : 0;
    const origin = mode === 'cover' ? 'bottom center' : 'top center';

    gsap.set(rows, {
      scaleY: fromScale,
      transformOrigin: origin,
    });

    tl.to(rows, {
      scaleY: toScale,
      duration: defaultShutterDuration,
      stagger: { each: defaultStaggerAmount, from: 'end' },
      ease: 'none',
    });
    return tl;
  }

  const wrappers = document.querySelectorAll('[data-shutter-scroll-transition]');
  wrappers.forEach((wrapper) => {
    const section = wrapper.closest('section') || wrapper.parentElement;
    const rows = getRows(wrapper);
    const mode = getMode(wrapper);
    const { panel } = buildRows(wrapper, rows);
    const rowList = Array.from(panel.children);
    createAnimation(wrapper, rowList, section, mode);
  });
}

// 11. Highlight Text on Scroll - Apple-Style Word Illuminations with High Readability
function initHighlightText() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof SplitText === 'undefined') return;
  const splitHeadingTargets = document.querySelectorAll('[data-highlight-text]');
  splitHeadingTargets.forEach((heading) => {
    const scrollStart = heading.getAttribute('data-highlight-scroll-start') || 'top 85%';
    const scrollEnd = heading.getAttribute('data-highlight-scroll-end') || 'bottom 45%';
    const fadedValue = parseFloat(heading.getAttribute('data-highlight-fade')) || 0.38;
    const staggerValue = parseFloat(heading.getAttribute('data-highlight-stagger')) || 0.03;

    new SplitText(heading, {
      type: 'words',
      autoSplit: true,
      aria: 'none',
      onSplit(self) {
        gsap.timeline({
          scrollTrigger: {
            scrub: 1.0, // Smooth inertial lag prevents strobing when scrolling fast
            trigger: heading,
            start: scrollStart,
            end: scrollEnd,
            fastScrollEnd: true,
          },
        }).fromTo(
          self.words,
          { autoAlpha: fadedValue },
          {
            autoAlpha: 1.0,
            stagger: staggerValue,
            ease: 'power1.inOut',
          }
        );
      },
    });
  });
}

// 12. Navbar Theme Switch on Scroll
function initCheckSectionThemeScroll() {
  let ticking = false;
  let currentTheme = null;
  const navBarHeight = document.querySelector('[data-nav-bar-height]');
  const themeObserverOffset = navBarHeight ? navBarHeight.offsetHeight / 2 : 50;
  const themeSections = document.querySelectorAll('[data-theme-section]');
  const themeNavElements = document.querySelectorAll('[data-theme-nav]');

  function updateElements(elements, attribute, value) {
    elements.forEach((el) => el.setAttribute(attribute, value));
  }

  function checkThemeSection() {
    for (const themeSection of themeSections) {
      const rect = themeSection.getBoundingClientRect();
      if (rect.top <= themeObserverOffset && rect.bottom >= themeObserverOffset) {
        const theme = themeSection.getAttribute('data-theme-section');
        if (theme !== currentTheme) {
          updateElements(themeNavElements, 'data-theme-nav', theme);
          currentTheme = theme;
        }
        break;
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(checkThemeSection);
    }
  }, { passive: true });
  checkThemeSection();
}

// 13. FAQ Accordion Toggle
function initFaqAccordion() {
  document.querySelectorAll('[data-click="faq"]').forEach(function(item) {
    item.addEventListener('click', function() {
      const isOpen = this.classList.contains('open');
      document.querySelectorAll('[data-click="faq"].open').forEach(function(openItem) {
        openItem.classList.remove('open');
        const answer = openItem.querySelector('.c-faq-a');
        const stripe = openItem.querySelector('.faq-stripe-1');
        const pText = openItem.querySelector('.faq-a-text');
        if (answer) answer.style.height = '0px';
        if (stripe) stripe.style.opacity = '1';
        if (pText) {
          pText.style.opacity = '0';
          pText.style.transform = 'translate3d(0px, 50%, 0px)';
        }
      });

      if (!isOpen) {
        this.classList.add('open');
        const answer = this.querySelector('.c-faq-a');
        const stripe = this.querySelector('.faq-stripe-1');
        const pText = this.querySelector('.faq-a-text');
        if (answer) {
          answer.style.height = answer.scrollHeight + 'px';
        }
        if (stripe) stripe.style.opacity = '0';
        if (pText) {
          pText.style.opacity = '1';
          pText.style.transform = 'translate3d(0px, 0px, 0px)';
          pText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }
      }
    });
  });
}

// 14. Footer Parallax & Back To Top
function initFooterParallax() {
  const inners = document.querySelectorAll('[data-footer-parallax-inner]');
  inners.forEach(inner => {
    inner.style.transform = 'none';
  });
  const darks = document.querySelectorAll('[data-footer-parallax-dark]');
  darks.forEach(dark => {
    dark.style.display = 'none';
  });
}

function initBackToTop() {
  const button = document.querySelector('[data-back-to-top="button"]') || document.querySelector('.backtotop-p');
  if (!button) return;
  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(0, { lerp: 0.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// 15. Nav Link & Button Animations
function initButtonHoverEffects() {
  if (typeof gsap === 'undefined' || typeof SplitText === 'undefined') return;
  document.querySelectorAll('.nav_link').forEach((link) => {
    const textOut = link.querySelector('[data-split-hover="out"]');
    const textIn = link.querySelector('[data-split-hover="in"]');
    if (!textOut || !textIn) return;
    let charsOut, charsIn, tl;
    function buildTimeline() {
      if (!charsOut || !charsIn) return;
      gsap.set(charsIn, { yPercent: 100 });
      tl = gsap.timeline({ paused: true });
      tl.to(charsOut, { yPercent: -100, duration: 0.4, stagger: 0.02, ease: 'expo.out' }, 0)
        .to(charsIn, { yPercent: 0, duration: 0.4, stagger: 0.02, ease: 'expo.out' }, 0);
    }
    SplitText.create(textOut, {
      type: 'chars',
      charsClass: 'letter',
      onSplit(instance) {
        charsOut = instance.chars;
        buildTimeline();
      },
    });
    SplitText.create(textIn, {
      type: 'chars',
      charsClass: 'letter',
      onSplit(instance) {
        charsIn = instance.chars;
        buildTimeline();
      },
    });
    link.addEventListener('mouseenter', () => tl && tl.play());
    link.addEventListener('mouseleave', () => tl && tl.reverse());
  });

  document.querySelectorAll('[data-button-043]').forEach((button) => {
    const textEl = button.querySelector('[data-split-wave]');
    if (!textEl) return;
    const distance = getComputedStyle(button).getPropertyValue('--button-043-text-duplicate-distance').trim() || '1.5em';
    let tl;
    SplitText.create(textEl, {
      type: 'chars',
      charsClass: 'letter',
      onSplit(instance) {
        tl = gsap.timeline({ paused: true });
        tl.to(instance.chars, {
          y: `-${distance}`,
          duration: 0.525,
          stagger: 0.02,
          ease: 'expo.out',
        });
      },
    });
    button.addEventListener('mouseenter', () => tl && tl.play());
    button.addEventListener('mouseleave', () => tl && tl.reverse());
  });
}

// 16. Award-Winning Smooth Capsule Progress Loader & Counter
function initLogoRevealLoader() {
  if (typeof gsap === 'undefined') return;
  const wrap = document.querySelector('[data-load-wrap]');
  if (!wrap) return;

  const container = wrap.querySelector('.loader__container');
  const bg = wrap.querySelector('.loader__bg');
  const countEl = document.getElementById('loader-count');
  const slugEl = document.getElementById('loader-slug');

  if (window.lenis) window.lenis.stop();

  gsap.set(wrap, { display: 'block' });

  // Smooth liquid progress count animation (0% -> 100%)
  const progressObj = { count: 0 };
  const loaderTimeline = gsap.timeline();

  loaderTimeline.to(progressObj, {
    count: 100,
    duration: 2.1,
    ease: 'power1.inOut',
    onUpdate: () => {
      const current = Math.floor(progressObj.count);
      if (countEl) countEl.textContent = current;
      if (slugEl) {
        slugEl.style.width = `${progressObj.count}%`;
      }
    }
  });

  // Brief pause at 100% to perceive completion
  loaderTimeline.to({}, { duration: 0.16 });

  // Elegant Curtain Lift Exit Transition
  loaderTimeline.to(container, {
    y: -35,
    opacity: 0,
    duration: 0.45,
    ease: 'power2.in'
  });

  loaderTimeline.to(bg, {
    yPercent: -101,
    duration: 0.82,
    ease: 'power3.inOut'
  }, '-=0.15');

  loaderTimeline.call(() => {
    document.dispatchEvent(new CustomEvent('loaderComplete'));
  }, [], '-=0.35');

  loaderTimeline.set(wrap, { display: 'none' });

  loaderTimeline.eventCallback('onComplete', () => {
    if (window.lenis) window.lenis.start();
  });

  document.addEventListener('loaderComplete', () => {
    // Hero heading lines reveal
    document.querySelectorAll('[data-split="hero"]').forEach((heading) => {
      gsap.set(heading, { autoAlpha: 1 });
      if (typeof SplitText !== 'undefined' && SplitText.create) {
        SplitText.create(heading, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: function (instance) {
            return gsap.from(instance.lines, {
              yPercent: 110,
              duration: 0.8,
              stagger: 0.08,
              ease: 'expo.out',
            });
          },
        });
      } else {
        gsap.from(heading, { autoAlpha: 0, y: 30, duration: 0.8, ease: 'expo.out' });
      }
    });

    const bottomFooterA = document.querySelector('.bottom_footer-a');
    if (bottomFooterA) {
      gsap.set(bottomFooterA, { autoAlpha: 1 });
      const textTarget = bottomFooterA.querySelector('.hero_world-text') || bottomFooterA;
      if (typeof SplitText !== 'undefined') {
        SplitText.create(textTarget, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          aria: 'none',
          onSplit(instance) {
            return gsap.from(instance.lines, {
              opacity: 0,
              y: '1em',
              duration: 0.5,
              ease: 'power2.inOut',
              stagger: 0.1
            });
          }
        });
      }
      const worldIcon = bottomFooterA.querySelector('.hero_world-icon');
      if (worldIcon) {
        gsap.from(worldIcon, { opacity: 0, scale: 0.6, duration: 0.55, ease: 'back.out(1.8)' });
      }
    }
    gsap.set('.footer_divider', { autoAlpha: 1 });
    gsap.from('.footer_divider', { width: '0%', duration: 1, ease: 'power2.inOut' });
    gsap.set('.logo_hero-wrapper', { autoAlpha: 1 });
    gsap.from('.logo_hero-wrapper', { opacity: 0, y: '4em', duration: 0.5, ease: 'power2.inOut' });
  });
}

// 17. Unicorn Studio & Fluid Fallback
function initHeroCanvas() {
  let initialized = false;
  try {
    if (typeof UnicornStudio !== 'undefined') {
      UnicornStudio.init()
        .then(() => { initialized = true; })
        .catch((err) => {
          console.warn('UnicornStudio fallback triggered:', err);
          createFluidGradientFallback();
        });
    } else {
      createFluidGradientFallback();
    }
  } catch (e) {
    createFluidGradientFallback();
  }

  setTimeout(() => {
    const canvas = document.querySelector('.unicorn_scene-wrap canvas');
    if (!canvas || canvas.width === 0) {
      createFluidGradientFallback();
    }
  }, 1000);
}

function createFluidGradientFallback() {
  const wrap = document.querySelector('.unicorn_scene-wrap');
  if (!wrap) return;
  let canvas = wrap.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    wrap.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = wrap.clientWidth || window.innerWidth;
    height = canvas.height = wrap.clientHeight || window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let t = 0;
  function draw() {
    t += 0.005;
    ctx.clearRect(0, 0, width, height);
    
    // Luminous Meta white/blue background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(0.5, '#f4f8fe');
    bgGrad.addColorStop(1, '#eef5fe');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Flowing luminous Meta blue & cyan pearls
    const cx1 = width * (0.35 + 0.15 * Math.sin(t));
    const cy1 = height * (0.45 + 0.12 * Math.cos(t * 1.2));
    const r1 = Math.min(width, height) * 0.55;
    const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
    g1.addColorStop(0, 'rgba(8, 102, 255, 0.14)');
    g1.addColorStop(0.6, 'rgba(0, 180, 255, 0.05)');
    g1.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = g1;
    ctx.beginPath();
    ctx.arc(cx1, cy1, r1, 0, Math.PI * 2);
    ctx.fill();

    const cx2 = width * (0.7 + 0.15 * Math.cos(t * 0.8));
    const cy2 = height * (0.6 + 0.15 * Math.sin(t * 0.9));
    const r2 = Math.min(width, height) * 0.6;
    const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
    g2.addColorStop(0, 'rgba(0, 210, 255, 0.12)');
    g2.addColorStop(0.5, 'rgba(8, 102, 255, 0.04)');
    g2.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(cx2, cy2, r2, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(draw);
  }
  draw();
}

// 18. Award-Winning Hero Lanyard ID Badge 3D Physics & Cinematic Intro
function initHeroIdCardAnimation() {
  const badgeWrap = document.querySelector('.hero_badge-wrap');
  const badge = document.querySelector('.hero_badge-focal');
  const card = document.querySelector('.hero_badge-card-container');
  const glow = document.querySelector('.hero_badge-glow');
  if (!badgeWrap || !badge) return;

  const targetCard = card || badge;
  let idleAnimation = null;
  let isHovered = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  // Staged Initial State (Suspended above the screen in 3D perspective)
  gsap.set(badge, {
    y: -window.innerHeight * 0.72,
    z: -100,
    rotationZ: -16,
    rotateX: 34,
    rotateY: -22,
    scale: 0.9,
    opacity: 0,
    transformOrigin: '50% 0%'
  });
  gsap.set(targetCard, {
    rotateX: 20,
    rotateY: -12,
    transformOrigin: '50% 0%'
  });
  if (glow) {
    gsap.set(glow, { scale: 0.35, opacity: 0 });
  }

  // Award-Winning Cinematic Entrance Drop & High-Tension Elastic Snap (Fast & Buttery Smooth)
  function playCinematicIntro() {
    const introTl = gsap.timeline({
      onComplete: () => {
        startIdlePhysics();
      }
    });

    // 1. High-Speed Aerodynamic Sky Plunge (~0.42s)
    introTl.to(badge, {
      y: 20,
      z: 15,
      rotationZ: 13,
      rotateX: -20,
      rotateY: 15,
      opacity: 1,
      scale: 1,
      duration: 0.42,
      ease: 'power2.in'
    }, 'drop');

    introTl.to(targetCard, {
      rotateX: -18,
      rotateY: 13,
      z: 35,
      duration: 0.42,
      ease: 'power2.in'
    }, 'drop');

    if (glow) {
      introTl.to(glow, {
        scale: 1.35,
        opacity: 0.85,
        duration: 0.42,
        ease: 'power2.in'
      }, 'drop');
    }

    // 2. High-Tension Lanyard Snap & Elastic Damped Pendulum Settle (~0.78s)
    introTl.to(badge, {
      y: 0,
      z: 0,
      rotationZ: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.78,
      ease: 'elastic.out(1.18, 0.42)'
    }, 'snap');

    introTl.to(targetCard, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      duration: 0.78,
      ease: 'elastic.out(1.18, 0.42)'
    }, 'snap');

    if (glow) {
      introTl.to(glow, {
        scale: 1,
        opacity: 0.65,
        duration: 0.78,
        ease: 'power2.out'
      }, 'snap');
    }
  }

  // Hook into loader completion so intro triggers as soon as hero is unveiled
  const loaderWrap = document.querySelector('[data-load-wrap]');
  if (loaderWrap && window.getComputedStyle(loaderWrap).display !== 'none') {
    document.addEventListener('loaderComplete', () => {
      setTimeout(playCinematicIntro, 40);
    }, { once: true });
  } else {
    setTimeout(playCinematicIntro, 80);
  }

  // Organic Ambient Physics: Multi-harmonic air current drift
  function startIdlePhysics() {
    if (typeof gsap === 'undefined' || isDragging) return;
    if (idleAnimation) idleAnimation.kill();

    idleAnimation = gsap.timeline({ repeat: -1 });
    idleAnimation
      .to(badge, { rotationZ: 2.2, rotateY: 2.8, rotateX: -1.6, y: 5, duration: 2.8, ease: 'sine.inOut' })
      .to(badge, { rotationZ: -1.8, rotateY: -2.4, rotateX: 1.8, y: -3, duration: 3.2, ease: 'sine.inOut' })
      .to(badge, { rotationZ: 1.4, rotateY: 1.6, rotateX: -1.2, y: 2.5, duration: 2.6, ease: 'sine.inOut' })
      .to(badge, { rotationZ: 0, rotateY: 0, rotateX: 0, y: 0, duration: 3.0, ease: 'sine.inOut' });
  }

  // 3D Magnetic Cursor Tilt & Lighting
  function onMouseMove(e) {
    if (isDragging || typeof gsap === 'undefined') return;
    if (!isHovered) return;

    const rect = targetCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);

    const clampedX = Math.max(-1, Math.min(1, dx));
    const clampedY = Math.max(-1, Math.min(1, dy));

    gsap.to(targetCard, {
      rotateY: clampedX * 22,
      rotateX: -clampedY * 18,
      rotateZ: clampedX * 5,
      z: 45,
      scale: 1.05,
      duration: 0.22,
      ease: 'power1.out',
      overwrite: 'auto'
    });

    if (glow) {
      gsap.to(glow, {
        x: -clampedX * 30,
        y: -clampedY * 20,
        scale: 1.15,
        opacity: 0.8,
        duration: 0.22,
        ease: 'power1.out',
        overwrite: 'auto'
      });
    }
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  badgeWrap.addEventListener('mouseenter', () => {
    isHovered = true;
    if (idleAnimation) idleAnimation.pause();
  });

  badgeWrap.addEventListener('mouseleave', () => {
    isHovered = false;
    if (isDragging) return;
    if (typeof gsap !== 'undefined') {
      gsap.to(targetCard, {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        z: 0,
        scale: 1,
        duration: 0.62,
        ease: 'elastic.out(1.1, 0.42)',
        overwrite: 'auto',
        onComplete: () => {
          startIdlePhysics();
        }
      });
      if (glow) {
        gsap.to(glow, { x: 0, y: 0, scale: 1, opacity: 0.65, duration: 0.62, overwrite: 'auto' });
      }
    }
  });

  // Tactile Interactive Tug & Flick Physics (Click & Drag to pull the badge!)
  function onDragStart(clientX, clientY) {
    if (typeof gsap === 'undefined') return;
    isDragging = true;
    dragStartX = clientX;
    dragStartY = clientY;
    if (idleAnimation) idleAnimation.pause();
    badge.style.cursor = 'grabbing';
  }

  function onDragMove(clientX, clientY) {
    if (!isDragging || typeof gsap === 'undefined') return;
    const dx = clientX - dragStartX;
    const dy = clientY - dragStartY;

    const pullX = Math.max(-120, Math.min(120, dx));
    const pullY = Math.max(-60, Math.min(140, dy));

    gsap.to(badge, {
      x: pullX * 0.75,
      y: pullY * 0.75,
      rotationZ: pullX * 0.18,
      rotateX: -pullY * 0.14,
      rotateY: pullX * 0.22,
      duration: 0.08,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  }

  function onDragEnd() {
    if (!isDragging || typeof gsap === 'undefined') return;
    isDragging = false;
    badge.style.cursor = 'grab';

    // Snappy elastic snap back with natural whip physics
    gsap.to(badge, {
      x: 0,
      y: 0,
      rotationZ: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.88,
      ease: 'elastic.out(1.18, 0.38)',
      overwrite: 'auto',
      onComplete: () => {
        if (!isHovered) startIdlePhysics();
      }
    });

    gsap.to(targetCard, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      duration: 0.88,
      ease: 'elastic.out(1.18, 0.38)',
      overwrite: 'auto'
    });
  }

  badge.addEventListener('mousedown', (e) => {
    e.preventDefault();
    onDragStart(e.clientX, e.clientY);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) onDragMove(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) onDragEnd();
  });

  // Touch support for mobile devices
  badge.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      onDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      onDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) onDragEnd();
  });
}

// 19. Slogan 3D Matte Logo Smooth Scroll Animation (No Hover Effect)
function initSloganShowcaseAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const sloganWrap = document.querySelector('.services_slogan-wrap');
  const stage = document.querySelector('.slogan_matte-logo-stage');
  const disc = document.querySelector('.slogan_matte-logo-disc');
  const glow = document.querySelector('.slogan_matte-logo-glow');
  if (!sloganWrap || !stage || !disc) return;

  // Use gsap.matchMedia for responsive desktop vs mobile scroll tuning
  const mm = gsap.matchMedia();

  // Desktop (>= 768px): Smooth vertical glide down the column + silky 3D rotation & light catch
  mm.add('(min-width: 768px)', () => {
    // 1. Stage travels smoothly down alongside the 3 paragraphs as the user scrolls
    gsap.fromTo(stage, 
      { y: -70 },
      {
        y: 110,
        ease: 'none',
        scrollTrigger: {
          trigger: sloganWrap,
          start: 'top 90%',
          end: 'bottom 15%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      }
    );

    // 2. Silky smooth 3D tilt and rolling dynamic on scroll
    gsap.fromTo(disc,
      { 
        rotateZ: -12, 
        rotateY: -14, 
        rotateX: 10,
        transformPerspective: 1200
      },
      {
        rotateZ: 12,
        rotateY: 14,
        rotateX: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sloganWrap,
          start: 'top 90%',
          end: 'bottom 15%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      }
    );

    // 3. Ambient glow shifts with directional light angle
    if (glow) {
      gsap.fromTo(glow,
        { x: 18, y: -12, opacity: 0.5 },
        {
          x: -18,
          y: 14,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: sloganWrap,
            start: 'top 90%',
            end: 'bottom 15%',
            scrub: 1.2,
            invalidateOnRefresh: true,
          }
        }
      );
    }
  });

  // Mobile (< 768px): Gentle vertical float & subtle 3D roll that doesn't obstruct text
  mm.add('(max-width: 767px)', () => {
    gsap.fromTo(stage,
      { y: -16 },
      {
        y: 24,
        ease: 'none',
        scrollTrigger: {
          trigger: sloganWrap,
          start: 'top 90%',
          end: 'bottom 30%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      }
    );

    gsap.fromTo(disc,
      { rotateZ: -6, rotateY: -8 },
      {
        rotateZ: 6,
        rotateY: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sloganWrap,
          start: 'top 90%',
          end: 'bottom 30%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      }
    );
  });
}

// 20. Main Initialization
document.addEventListener('DOMContentLoaded', () => {
  initLogoRevealLoader();
  initGlobalParallax();
  initDynamicTextCursor();
  initModalBasic();
  initContactModal();
  initInteractiveDotsGridBackground();
  initStickyTitleScroll();
  initHoverVideo();
  initRoadmapSection();
  initShutterScrollTransition();
  initHighlightText();
  initCheckSectionThemeScroll();
  initFaqAccordion();
  initFooterParallax();
  initBackToTop();
  initButtonHoverEffects();
  initHeroCanvas();
  initHeroIdCardAnimation();
  initSloganShowcaseAnimation();
});

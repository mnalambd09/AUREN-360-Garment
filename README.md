# AUREN — Full 3D Fashion Experience

## Run locally
1. Install Node.js LTS (18+ recommended).
2. Extract this folder.
3. Open this folder in VS Code.
4. Open Terminal → New Terminal.
5. Run `npm install`
6. Run `npm run dev`
7. Open the local URL printed by Vite (usually http://localhost:5173).

## Build for deployment
Run `npm run build`. Upload the generated `dist` folder to Netlify, or connect the repository to Netlify / Vercel.

## 3D notes
The hero uses a procedural Three.js fabric-like mesh with live vertex deformation, pointer response, lighting and a rotating orbit. It is an abstract digital fabric artwork, not a scanned garment or cloth-physics simulation. For realistic 360° apparel try-on/product rotation, add licensed GLB/GLTF garment assets.

## Performance
The scene uses a capped device pixel ratio and low-power WebGL preference. If the integrated GPU struggles, close other GPU-heavy tabs and use the latest Chrome/Edge graphics drivers.


## Real 3D garment viewer
The hero now loads `public/models/auren-oversized-tee.glb`, a standalone AUREN oversized T-shirt mesh created for this demo. Drag with the mouse to rotate it through 360 degrees; use the wheel or trackpad to zoom. The model is a stylized demo garment, not a scanned production sample or a cloth-physics simulation. Replace the GLB with a professionally modeled/scanned garment to show exact seams, fabric texture and product-specific details.

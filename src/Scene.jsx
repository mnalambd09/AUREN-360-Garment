import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function GarmentModel() {
  const { scene } = useGLTF('/models/auren-oversized-tee.glb');
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (obj.material) {
          obj.material = obj.material.clone();
          obj.material.side = THREE.DoubleSide;
          obj.material.roughness = 0.88;
        }
      }
    });
    return clone;
  }, [scene]);
  return <primitive object={model} position={[0, -0.02, 0]} rotation={[0, -0.28, 0]} />;
}

function OrbitAccent() {
  const ring = useRef();
  return <mesh ref={ring} rotation={[1.12, 0.12, -0.22]}>
    <torusGeometry args={[1.72, 0.008, 8, 160]} />
    <meshStandardMaterial color="#d5ff6a" metalness={0.72} roughness={0.28} />
  </mesh>;
}

function SceneContents() {
  return <>
    <ambientLight intensity={1.25} />
    <directionalLight position={[4, 5, 5]} intensity={2.1} />
    <pointLight position={[-3, 0, 3]} intensity={1.3} color="#d5ff6a" />
    <group>
      <GarmentModel />
      <OrbitAccent />
    </group>
    <ContactShadows position={[0, -1.45, 0]} opacity={0.34} scale={5} blur={2.5} far={3} />
    <Environment preset="studio" />
    <OrbitControls
      makeDefault enablePan={false} enableZoom={true}
      minDistance={3.3} maxDistance={6.5}
      minPolarAngle={Math.PI / 3.2} maxPolarAngle={Math.PI / 1.7}
      rotateSpeed={0.72} zoomSpeed={0.7} />
  </>;
}

export default function FashionScene({ compact = false }) {
  return <div className={compact ? 'scene-canvas scene-compact' : 'scene-canvas'}>
    <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0.05, 5.1], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      fallback={<div className="scene-fallback">AUREN / 3D GARMENT VIEW</div>}>
      <Suspense fallback={null}><SceneContents /></Suspense>
    </Canvas>
  </div>;
}

useGLTF.preload('/models/auren-oversized-tee.glb');

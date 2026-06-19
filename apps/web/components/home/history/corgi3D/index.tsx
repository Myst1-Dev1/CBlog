'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function CorgiModel() {
  const { scene } = useGLTF('/models/astro_corgi.glb'); 
  const modelRef = useRef<THREE.Group>(null);

  // Animação para fazer o Corgi flutuar suavemente (efeito espaço)
  useFrame((state) => {
    if (modelRef.current) {
      const t = state.clock.getElapsedTime();
      // Flutua para cima e para baixo
      modelRef.current.position.y = Math.sin(t * 1.5) * 0.15;
      // Uma leve inclinação lateral charmosa ao flutuar
      modelRef.current.rotation.z = Math.sin(t * 0.8) * 0.05;
    }
  });
  
  return (
    <Center>
      <group ref={modelRef} rotation={[0, Math.PI * -0.475, 0.2]}>
        <primitive object={scene} scale={2.5} />
      </group>
    </Center>
  );
}

export function Corgi3D() {
  return (
    <div className="w-full h-[500px] relative">
      <Suspense fallback={null}>
        <Canvas 
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0.5, 3.8], fov: 45 }}
          className="w-full h-full"
        >
          {/* Iluminação do ambiente */}
          <ambientLight intensity={1.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          {/* Luz direcional forte para ativar o efeito de brilho (Bloom) nas partes brancas/claras */}
          <directionalLight position={[3, 5, 3]} intensity={2.5} />

          <CorgiModel />

          {/* Opcional: Controles do mouse continuam funcionando */}
          <OrbitControls 
            enableZoom={true} 
            minDistance={1.5} 
            maxDistance={6}
            makeDefault 
          />

          {/* Processador de Efeitos: Adiciona o Brilho Espacial (Bloom) */}
          <EffectComposer>
            <Bloom 
              intensity={0.4}       // Força do brilho
              luminanceThreshold={0.2} // Quais partes brilham (valores menores fazem brilhar mais)
              luminanceSmoothing={0.9} // Suavidade do degradê do brilho
              height={300} 
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
}
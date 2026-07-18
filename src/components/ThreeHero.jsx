import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function Box(props) {
    const mesh = useRef();

    useFrame((state, delta) => {
        mesh.current.rotation.x += delta * 0.2;
        mesh.current.rotation.y += delta * 0.2;
    });

    return (
        <mesh
            {...props}
            ref={mesh}
        >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={props.color} roughness={0.1} metalness={0.8} opacity={0.6} transparent />
        </mesh>
    );
}

function FloatingShapes() {
    return (
        <>
            <Box position={[-4, 2, -5]} color="#a855f7" />
            <Box position={[4, -2, -4]} color="#3b82f6" />
            <Box position={[0, 4, -8]} color="#6366f1" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </>
    )
}

export default function ThreeHero() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <FloatingShapes />
            </Canvas>
        </div>
    );
}

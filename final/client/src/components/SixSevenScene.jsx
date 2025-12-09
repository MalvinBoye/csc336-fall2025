import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";


export default function SixSevenScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <FloatingSix />
      <FloatingSeven />
    </Canvas>
  );
}

function FloatingSix() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // bounce up/down
    ref.current.position.y = Math.sin(t * 1.5) * 1.2;
  });

  return (
    <Center position={[-3, 0, 0]}>
      <Text3D font="styles/helvetiker_regular.typeface.json" size={100} height={1}>
        6
        <meshStandardMaterial color="black" />
      </Text3D>
    </Center>
  );
}

function FloatingSeven() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // bounce opposite of the 6
    ref.current.position.y = -Math.sin(t * 1.5) * 1.2;
  });

  return (
    <Center position={[3, 0, 0]}>
      <Text3D font="/fonts/helvetiker_regular.typeface.json" size={2.8} height={0.4}>
        7
        <meshStandardMaterial color="black" />
      </Text3D>
    </Center>
  );
}

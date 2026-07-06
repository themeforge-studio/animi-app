import { useEffect, useRef, Suspense } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

type Props = {
  uri: string;
  width?: number;
  height?: number;
};

export default function CharacterViewer({ uri, width = 300, height = 400 }: Props) {
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, [uri]);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      45,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 3);
    camera.lookAt(0, 1, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 2, 1);
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({
      canvas: {
        width: gl.drawingBufferWidth,
        height: gl.drawingBufferHeight,
        style: {},
        addEventListener: () => {},
        removeEventListener: () => {},
        clientHeight: gl.drawingBufferHeight,
        getContext: () => gl,
      } as any,
      context: gl as any,
    });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x000000, 0);

    const loader = new GLTFLoader();
    loader.load(
      uri,
      (gltf: any) => {
        if (!mountedRef.current) return;
        const model = gltf.scene;
        model.position.set(0, -1, 0);
        scene.add(model);
      },
      undefined,
      (error: any) => console.log('Error cargando modelo:', error)
    );

    const animate = () => {
      if (!mountedRef.current) return;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <GLView
        style={{ width, height }}
        onContextCreate={onContextCreate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 20,
  },
});
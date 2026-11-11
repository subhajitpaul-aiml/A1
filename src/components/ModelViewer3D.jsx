import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Box, Play, Pause, Layers, Eye } from 'lucide-react';

export const ModelViewer3D = ({ initialModel = 'gear', height = '400px' }) => {
  const mountRef = useRef(null);
  const [modelType, setModelType] = useState(initialModel);
  const [color, setColor] = useState('#06b6d4'); // Cyan default
  const [isWireframe, setIsWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [info, setInfo] = useState({ triangles: 1240, heightMm: 45, volumeCm3: 28.4 });

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const currentMeshGroupRef = useRef(null);
  const isRotatingRef = useRef(isRotating);
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  isRotatingRef.current = isRotating;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x22d3ee, 1.8);
    dirLight1.position.set(8, 12, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf97316, 1.2);
    dirLight2.position.set(-8, -6, -5);
    scene.add(dirLight2);

    // 3D PRINT BED GRID
    const gridHelper = new THREE.GridHelper(12, 12, 0x06b6d4, 0x334155);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // MESH GROUP
    const group = new THREE.Group();
    scene.add(group);
    currentMeshGroupRef.current = group;

    // ANIMATION LOOP
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (isRotatingRef.current && currentMeshGroupRef.current && !isDraggingRef.current) {
        currentMeshGroupRef.current.rotation.y += 0.012;
      }
      renderer.render(scene, camera);
    };
    animate();

    // INTERACTION HANDLERS (Rotate by dragging)
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current || !currentMeshGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.current.x;
      const deltaY = e.clientY - prevMousePos.current.y;
      currentMeshGroupRef.current.rotation.y += deltaX * 0.01;
      currentMeshGroupRef.current.rotation.x += deltaY * 0.01;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('mousedown', onMouseDown);
      renderer.dispose();
    };
  }, []);

  // UPDATE MODEL GEOMETRY
  useEffect(() => {
    if (!currentMeshGroupRef.current) return;
    const group = currentMeshGroupRef.current;

    // Clear old children
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    }

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.35,
      metalness: 0.2,
      wireframe: isWireframe
    });

    if (modelType === 'gear') {
      // Create Gear Shape with teeth
      const gearGroup = new THREE.Group();
      const centerGeom = new THREE.CylinderGeometry(1.5, 1.5, 0.8, 32);
      const centerMesh = new THREE.Mesh(centerGeom, material);
      gearGroup.add(centerMesh);

      // Hollow center hole
      const holeGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.82, 16);
      const holeMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });
      const holeMesh = new THREE.Mesh(holeGeom, holeMat);
      gearGroup.add(holeMesh);

      // 8 Gear Teeth
      for (let i = 0; i < 8; i++) {
        const toothGeom = new THREE.BoxGeometry(0.6, 0.8, 0.8);
        const toothMesh = new THREE.Mesh(toothGeom, material);
        const angle = (i / 8) * Math.PI * 2;
        toothMesh.position.set(Math.cos(angle) * 1.6, 0, Math.sin(angle) * 1.6);
        toothMesh.rotation.y = -angle;
        gearGroup.add(toothMesh);
      }
      group.add(gearGroup);
      setInfo({ triangles: 1840, heightMm: 35, volumeCm3: 18.2 });
    } else if (modelType === 'rocket') {
      // Rocket Body + Cone + Fins
      const rocketGroup = new THREE.Group();
      const bodyGeom = new THREE.CylinderGeometry(0.8, 0.9, 2.8, 24);
      const bodyMesh = new THREE.Mesh(bodyGeom, material);
      bodyMesh.position.y = 0.4;
      rocketGroup.add(bodyMesh);

      const noseGeom = new THREE.ConeGeometry(0.8, 1.4, 24);
      const noseMesh = new THREE.Mesh(noseGeom, material);
      noseMesh.position.y = 2.45;
      rocketGroup.add(noseMesh);

      // Fins
      for (let i = 0; i < 3; i++) {
        const finGeom = new THREE.BoxGeometry(0.12, 1.2, 0.9);
        const finMesh = new THREE.Mesh(finGeom, material);
        const angle = (i / 3) * Math.PI * 2;
        finMesh.position.set(Math.cos(angle) * 1.0, -0.4, Math.sin(angle) * 1.0);
        finMesh.rotation.y = -angle;
        rocketGroup.add(finMesh);
      }
      group.add(rocketGroup);
      setInfo({ triangles: 2150, heightMm: 90, volumeCm3: 32.5 });
    } else if (modelType === 'van') {
      // Maker Van Prototype
      const vanGroup = new THREE.Group();
      const bodyGeom = new THREE.BoxGeometry(3.6, 1.6, 1.8);
      const bodyMesh = new THREE.Mesh(bodyGeom, material);
      vanGroup.add(bodyMesh);

      const cabGeom = new THREE.BoxGeometry(1.2, 1.2, 1.78);
      const cabMesh = new THREE.Mesh(cabGeom, material);
      cabMesh.position.set(1.6, -0.2, 0);
      vanGroup.add(cabMesh);

      // Wheels
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
      const wheelPositions = [
        [-1.2, -0.8, 0.95],
        [1.2, -0.8, 0.95],
        [-1.2, -0.8, -0.95],
        [1.2, -0.8, -0.95]
      ];
      wheelPositions.forEach(([x, y, z]) => {
        const wGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.25, 16);
        const wMesh = new THREE.Mesh(wGeom, wheelMat);
        wMesh.rotation.x = Math.PI / 2;
        wMesh.position.set(x, y, z);
        vanGroup.add(wMesh);
      });
      group.add(vanGroup);
      setInfo({ triangles: 2680, heightMm: 50, volumeCm3: 48.0 });
    } else {
      // Calibration Cube (XYZ)
      const cubeGeom = new THREE.BoxGeometry(2.2, 2.2, 2.2);
      const cubeMesh = new THREE.Mesh(cubeGeom, material);
      group.add(cubeMesh);
      setInfo({ triangles: 120, heightMm: 20, volumeCm3: 8.0 });
    }
  }, [modelType, color, isWireframe]);

  const filamentColors = [
    { name: 'Cyan PLA', hex: '#06b6d4' },
    { name: 'Amber Orange', hex: '#f97316' },
    { name: 'Laser Violet', hex: '#8b5cf6' },
    { name: 'Eco Emerald', hex: '#10b981' },
    { name: 'Titanium White', hex: '#e2e8f0' }
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-md">
      {/* Top HUD Bar */}
      <div className="absolute top-0 inset-x-0 p-3 sm:p-4 z-10 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Interactive CAD Viewport
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">• Drag to rotate 360°</span>
        </div>

        {/* Model Selector Pills */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-lg border border-slate-700/70 text-xs">
          {[
            { id: 'gear', label: 'Planetary Gear' },
            { id: 'van', label: 'MakerSpace Van' },
            { id: 'rocket', label: 'STEM Rocket' },
            { id: 'cube', label: 'XYZ Cube' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setModelType(m.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                modelType === m.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        style={{ height }}
        className="w-full cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Controls & Filament Palette */}
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-slate-950/90 to-transparent">
        {/* Filament Colors */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Filament:</span>
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-full border border-slate-700/60">
            {filamentColors.map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c.hex)}
                title={c.name}
                style={{ backgroundColor: c.hex }}
                className={`w-5 h-5 rounded-full transition-transform ${
                  color === c.hex ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'hover:scale-110 opacity-80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CAD Telemetry Info */}
        <div className="hidden md:flex items-center gap-3 text-xs text-slate-300 font-mono bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
          <span>Triangles: <strong className="text-cyan-300">{info.triangles}</strong></span>
          <span>•</span>
          <span>Height: <strong className="text-cyan-300">{info.heightMm} mm</strong></span>
          <span>•</span>
          <span>Volume: <strong className="text-cyan-300">{info.volumeCm3} cm³</strong></span>
        </div>

        {/* Viewport Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 border transition ${
              isWireframe
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle Wireframe Mesh"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Wireframe</span>
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 border transition ${
              isRotating
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title={isRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isRotating ? 'Pause' : 'Rotate'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};


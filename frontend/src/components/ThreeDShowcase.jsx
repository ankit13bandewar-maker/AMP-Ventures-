import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const MODELS = [
  { id: 'dish', label: '🍽️ 3D Gourmet Dish', industry: 'Restaurant & Cafe', color: 0xF59E0B, desc: 'Interactive 360° culinary showcase for restaurant menus' },
  { id: 'salon', label: '✂️ 3D Salon Crystal', industry: 'Salon & Luxury Spa', color: 0xEC4899, desc: 'Holographic aesthetics & stylist portfolio centerpiece' },
  { id: 'clinic', label: '🩺 3D Health Hologram', industry: 'Clinics & Healthcare', color: 0x06B6D4, desc: 'Interactive medical data & anatomical visualizer' },
  { id: 'retail', label: '🛍️ 3D Retail Pedestal', industry: 'Boutiques & Retail', color: 0x10B981, desc: 'Rotating luxury jewelry and designer apparel showcase' }
];

export default function ThreeDShowcase() {
  const mountRef = useRef(null);
  const [activeModel, setActiveModel] = useState('dish');
  const sceneRef = useRef(null);
  const mainMeshGroupRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 600;
    const height = 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.replaceChildren(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x6366F1, 2.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x06B6D4, 3, 10);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xF59E0B, 2.5, 10);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // 3. Floating Ambient Particles Field
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = (Math.random() - 0.5) * 6;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x818CF8,
      size: 0.04,
      transparent: true,
      opacity: 0.6
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // 4. Main Mesh Group
    const meshGroup = new THREE.Group();
    mainMeshGroupRef.current = meshGroup;
    scene.add(meshGroup);

    // Build Current Mesh
    buildMesh(activeModel, meshGroup);

    // 5. Mouse Orbit / Drag Handlers
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !mainMeshGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      mainMeshGroupRef.current.rotation.y += deltaX * 0.008;
      mainMeshGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch Support
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || !mainMeshGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      mainMeshGroupRef.current.rotation.y += deltaX * 0.008;
      mainMeshGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = () => { isDraggingRef.current = false; };

    domElem.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // 6. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-rotation when user is not actively dragging
      if (!isDraggingRef.current && meshGroup) {
        meshGroup.rotation.y += 0.008;
        meshGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      }

      particleField.rotation.y = elapsedTime * 0.03;
      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
    };
  }, [activeModel]);

  const buildMesh = (type, group) => {
    group.clear();

    if (type === 'dish') {
      // Restaurant 3D Plate & Layered Gourmet Geometry
      const plateGeo = new THREE.CylinderGeometry(1.6, 1.2, 0.15, 32);
      const plateMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.2, metalness: 0.8 });
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.y = -0.4;
      group.add(plate);

      // Centerpiece Dish Core (Glowing Torus & Sphere)
      const dishGeo = new THREE.TorusGeometry(0.7, 0.25, 16, 100);
      const dishMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.3, metalness: 0.6, wireframe: false });
      const dish = new THREE.Mesh(dishGeo, dishMat);
      dish.rotation.x = Math.PI / 2.5;
      group.add(dish);

      const garnishGeo = new THREE.IcosahedronGeometry(0.4, 0);
      const garnishMat = new THREE.MeshStandardMaterial({ color: 0x10B981, roughness: 0.2, metalness: 0.5 });
      const garnish = new THREE.Mesh(garnishGeo, garnishMat);
      garnish.position.y = 0.25;
      group.add(garnish);
    } 
    else if (type === 'salon') {
      // Salon Crystal Prism
      const prismGeo = new THREE.OctahedronGeometry(1.2, 0);
      const prismMat = new THREE.MeshPhysicalMaterial({
        color: 0xEC4899,
        roughness: 0.1,
        metalness: 0.2,
        transmission: 0.6,
        ior: 1.5,
        thickness: 0.5
      });
      const prism = new THREE.Mesh(prismGeo, prismMat);
      group.add(prism);

      // Orbiting Golden Ring
      const ringGeo = new THREE.TorusGeometry(1.7, 0.04, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xFCD34D, metalness: 0.9, roughness: 0.1 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      group.add(ring);
    } 
    else if (type === 'clinic') {
      // Clinical Hologram Sphere with Data Rings
      const sphereGeo = new THREE.IcosahedronGeometry(0.9, 2);
      const sphereMat = new THREE.MeshStandardMaterial({ color: 0x06B6D4, wireframe: true });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(sphere);

      const innerCoreGeo = new THREE.SphereGeometry(0.5, 32, 32);
      const innerCoreMat = new THREE.MeshStandardMaterial({ color: 0x38BDF8, roughness: 0.2, metalness: 0.8 });
      const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
      group.add(innerCore);

      const orbitGeo = new THREE.TorusGeometry(1.4, 0.03, 16, 64);
      const orbitMat = new THREE.MeshBasicMaterial({ color: 0x10B981 });
      const orbit = new THREE.Mesh(orbitGeo, orbitMat);
      orbit.rotation.y = Math.PI / 4;
      group.add(orbit);
    } 
    else if (type === 'retail') {
      // Retail Luxury Display Cube & Pedestal
      const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const boxMat = new THREE.MeshStandardMaterial({
        color: 0x6366F1,
        roughness: 0.2,
        metalness: 0.7,
        wireframe: false
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.rotation.set(0.6, 0.6, 0);
      group.add(box);

      const frameGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const frameMat = new THREE.MeshBasicMaterial({ color: 0x10B981, wireframe: true });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.rotation.set(0.6, 0.6, 0);
      group.add(frame);
    }
  };

  const currentMeta = MODELS.find(m => m.id === activeModel) || MODELS[0];

  return (
    <div className="three-d-showcase-wrapper">
      <div className="glass-card" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(99, 102, 241, 0.35)', background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(7,9,14,0.95) 100%)' }}>
        
        {/* Header Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', zIndex: 3, position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-amber">⚡ Tier 3 Technology Showcase</span>
              <span className="badge badge-emerald">60 FPS WebGL</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', color: '#fff' }}>Interactive 3D Web Experiences</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              {currentMeta.desc} • <em>Drag with mouse/touch to inspect in 360°</em>
            </p>
          </div>

          <Link to="/contact?tier=tier3" className="btn btn-primary btn-sm">
            Get Tier 3 3D Build →
          </Link>
        </div>

        {/* Model Preset Switcher Buttons */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem', zIndex: 3, position: 'relative' }}>
          {MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setActiveModel(model.id)}
              className={`filter-btn ${activeModel === model.id ? 'active' : ''}`}
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.9rem' }}
            >
              {model.label}
            </button>
          ))}
        </div>

        {/* 3D Canvas Mounting Viewport */}
        <div 
          ref={mountRef} 
          style={{ 
            width: '100%', 
            height: '400px', 
            cursor: 'grab', 
            borderRadius: 'var(--radius-md)', 
            background: 'radial-gradient(ellipse at center, rgba(30,41,59,0.5) 0%, rgba(10,14,23,0.8) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            position: 'relative'
          }}
          title="Click and drag to rotate 3D model"
        />

        {/* Bottom Hint */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <span>🔄 Auto-rotates when idle • Interactive mouse orbital physics</span>
          <span style={{ color: 'var(--primary-light)' }}>Active Preset: <strong>{currentMeta.industry}</strong></span>
        </div>
      </div>
    </div>
  );
}

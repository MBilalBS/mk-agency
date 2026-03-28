import * as THREE from 'three'
import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import '../styles/Badge.css'

extend({ MeshLineGeometry, MeshLineMaterial })

useGLTF.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')
useTexture.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg')

// Précharge tes textures recto / verso
useTexture.preload('/badgestyle/2.png')
useTexture.preload('/badgestyle/3.png')

const isMobile = window.innerWidth < 769

function RoundedPlane({ width, height, radius = 0.06, children, ...props }) {
  const geometry = useMemo(() => {
    const s = new THREE.Shape()
    const w = width / 2
    const h = height / 2
    const r = radius
    s.moveTo(-w + r, -h)
    s.lineTo(w - r, -h)
    s.quadraticCurveTo(w, -h, w, -h + r)
    s.lineTo(w, h - r)
    s.quadraticCurveTo(w, h, w - r, h)
    s.lineTo(-w + r, h)
    s.quadraticCurveTo(-w, h, -w, h - r)
    s.lineTo(-w, -h + r)
    s.quadraticCurveTo(-w, -h, -w + r, -h)

    const geo = new THREE.ShapeGeometry(s)
    const pos = geo.attributes.position
    const uvArray = new Float32Array(pos.count * 2)
    for (let i = 0; i < pos.count; i++) {
      uvArray[i * 2]     = (pos.getX(i) + w) / width
      uvArray[i * 2 + 1] = (pos.getY(i) + h) / height
    }
    geo.setAttribute('uv', new THREE.BufferAttribute(uvArray, 2))
    return geo
  }, [width, height, radius])

  return (
    <mesh {...props} geometry={geometry}>
      {children}
    </mesh>
  )
}

function TouchScrollPreventer() {
  const { gl, camera, raycaster, scene } = useThree()

  useEffect(() => {
    const canvas = gl.domElement

    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(new THREE.Vector2(x, y), camera)

      const meshes = []
      scene.traverse((obj) => {
        if (obj.isMesh) meshes.push(obj)
      })

      if (raycaster.intersectObjects(meshes).length > 0) {
        e.preventDefault()
      }
    }

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    return () => canvas.removeEventListener('touchstart', handleTouchStart)
  }, [gl, camera, raycaster, scene])

  return null
}

function Badge() {
  const { scrollYProgress } = useScroll()
  const badgeY = useTransform(scrollYProgress, [0, 0.08], ['0vh', '-130vh'])
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className="badge-canvas"
      onDragStart={(e) => e.preventDefault()}
      style={isMobile ? { y: badgeY } : undefined}
    >
      <Canvas
        camera={{ position: [0, 0, isMobile ? 17 : 13], fov: 25 }}
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
      >
        {isMobile && <TouchScrollPreventer />}

        <ambientLight intensity={Math.PI} />

        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band isMobile={isMobile} flipped={flipped} />
        </Physics>

        <Environment blur={0}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>

      <div
        className="badge-flip-toggle"
        onClick={() => setFlipped((f) => !f)}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="toggle">
          <div className={`toggle-thumb ${flipped ? 'right' : ''}`} />
        </div>
      </div>
    </motion.div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 10, isMobile = false, flipped = false }) {
  const band = useRef()
  const fixed = useRef()
  const j1 = useRef()
  const j2 = useRef()
  const j3 = useRef()
  const card = useRef()
  const cardGroup = useRef()

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2
  }

  const { nodes, materials } = useGLTF(
    'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb'
  )

  const texture = useTexture(
    'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg'
  )

  const frontBadgeTexture = useTexture('/badgestyle/2.png')
  const backBadgeTexture = useTexture('/badgestyle/3.png')

  const { width, height } = useThree((state) => state.size)

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      ])
  )

  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)

  useEffect(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping

    frontBadgeTexture.anisotropy = 16
    backBadgeTexture.anisotropy = 16

    frontBadgeTexture.flipY = false
    backBadgeTexture.flipY = false
  }, [texture, frontBadgeTexture, backBadgeTexture])

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))

      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())

      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      })
    }

    if (fixed.current) {
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        }

        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        )

        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        )
      })

      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())

      band.current.geometry.setPoints(curve.getPoints(32))

      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())

      card.current.setAngvel({
        x: ang.x,
        y: ang.y - rot.y * 0.25,
        z: ang.z
      })
    }

    if (cardGroup.current) {
      const target = flipped ? Math.PI : 0
      cardGroup.current.rotation.y = THREE.MathUtils.lerp(
        cardGroup.current.rotation.y,
        target,
        delta * 5
      )
    }
  })

  curve.curveType = 'chordal'

  return (
    <>
      <group position={[isMobile ? 0 : -4, isMobile ? 6 : 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId)
              drag(false)
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId)
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            }}
          >
            <group ref={cardGroup}>

              {/* Base card geometry */}
              <mesh geometry={nodes.card.geometry} material={materials.card} />

              {/* Recto — plane avec coins arrondis sur la face avant */}
              <RoundedPlane width={0.740} height={1.01} radius={0.06} position={[0, 0.525, 0.012]}>
                <meshPhysicalMaterial
                  side={THREE.FrontSide}
                  map={frontBadgeTexture}
                  map-anisotropy={16}
                  clearcoat={1}
                  clearcoatRoughness={0.15}
                  roughness={0.3}
                  metalness={0.5}
                />
              </RoundedPlane>

              {/* Verso — plane avec coins arrondis sur la face arrière */}
              <RoundedPlane width={0.740} height={1.01} radius={0.06} position={[0, 0.525, -0.012]} rotation={[0, Math.PI, 0]}>
                <meshPhysicalMaterial
                  side={THREE.FrontSide}
                  map={backBadgeTexture}
                  map-anisotropy={16}
                  clearcoat={1}
                  clearcoatRoughness={0.15}
                  roughness={0.3}
                  metalness={0.5}
                />
              </RoundedPlane>

              <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
              <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            </group>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

export default Badge
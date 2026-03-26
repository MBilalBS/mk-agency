// On importe THREE, la librairie 3D de base qui gère les maths, les vecteurs, les courbes, etc.
import * as THREE from 'three'

// Hooks React classiques :
// useEffect → exécuter du code quand une valeur change
// useRef → garder une référence directe vers un objet sans re-render
// useState → stocker un état qui peut changer
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Canvas → le composant qui crée la scène 3D (remplace <canvas> HTML)
// extend → permet d'ajouter des objets Three.js custom dans JSX
// useThree → hook pour accéder aux infos de la scène (taille, caméra, etc.)
// useFrame → hook qui s'exécute à chaque frame (60fps), c'est la boucle d'animation
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'

// useGLTF → charge un fichier 3D au format .glb/.gltf (le badge et sa pince)
// useTexture → charge une image comme texture (le tissu du cordon)
// Environment → gère l'éclairage ambiant de toute la scène
// Lightformer → une source de lumière en forme de surface (comme un panneau LED)
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'

// BallCollider → collider en forme de sphère pour la physique
// CuboidCollider → collider en forme de boîte pour la physique
// Physics → le composant qui active le moteur physique sur tous ses enfants
// RigidBody → rend un objet soumis à la physique (gravité, collisions, etc.)
// useRopeJoint → crée une liaison "corde" entre deux RigidBody (ils restent connectés)
// useSphericalJoint → crée une liaison rotule entre deux RigidBody (pivot dans tous les sens)
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'

// MeshLineGeometry → géométrie spéciale pour dessiner des lignes avec épaisseur en 3D
// MeshLineMaterial → le matériau qui va avec, permet de texturer la ligne (le cordon)
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

// Le fichier CSS qui définit la taille et position du badge-canvas
import '../styles/Badge.css'


// On enregistre MeshLineGeometry et MeshLineMaterial dans le système JSX de R3F
// Sans ça, on ne pourrait pas écrire <meshLineGeometry /> ou <meshLineMaterial /> en JSX
extend({ MeshLineGeometry, MeshLineMaterial })

// On précharge le fichier 3D du badge AVANT que le composant soit monté
// Comme ça, quand le composant s'affiche, le modèle est déjà en mémoire → pas de freeze
useGLTF.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')

// Même chose pour la texture du cordon, on la précharge en avance
useTexture.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg')


const isMobile = window.innerWidth < 769

// Bloque le scroll tactile uniquement quand le doigt touche le badge (pas les zones transparentes)
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
      scene.traverse((obj) => { if (obj.isMesh) meshes.push(obj) })

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

  return (
    <motion.div className='badge-canvas' onDragStart={e => e.preventDefault()} style={isMobile ? { y: badgeY } : undefined}>
        <Canvas camera={{ position: [0, 0, isMobile ? 17 : 13], fov: 25 }} gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}>

          {isMobile && <TouchScrollPreventer />}

          <ambientLight intensity={Math.PI} />

          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60} >
            <Band isMobile={isMobile} />
          </Physics>

          {/* Environment sans "background" → éclairage ambiant uniquement, fond transparent */}
          <Environment blur={0}>

            {/* Un panneau de lumière blanche en bas devant (position Z positif = devant) */}
            {/* intensity={2} → force de la lumière */}
            {/* rotation → incliné à 60° sur l'axe Z (Math.PI / 3 = 60°) */}
            {/* scale → très large (100) et très fin (0.1) = bande horizontale de lumière */}
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />

            {/* Panneau de lumière à gauche, légèrement en bas */}
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />

            {/* Panneau de lumière à droite, légèrement en haut */}
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />

            {/* Panneau de lumière très puissant (10) très à gauche et loin */}
            {/* rotation Y = Math.PI/2 → tourné de 90° pour pointer vers la scène */}
            {/* scale → très grand (100x10) = grosse source de lumière latérale */}
            <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />

          </Environment>

        </Canvas>
    </motion.div>
  )
}


// maxSpeed et minSpeed contrôlent la vitesse de lissage (lerp) du cordon
function Band({ maxSpeed = 50, minSpeed = 10, isMobile = false }) {

  // useRef crée des "pointeurs" vers les objets physiques
  // band → le mesh du cordon
  // fixed → le point fixe en haut (accroché au plafond, ne bouge pas)
  // j1, j2, j3 → les 3 segments intermédiaires de la corde (joints)
  // card → le badge lui-même
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef()

  // Vecteurs THREE réutilisables pour les calculs (évite de créer de nouveaux objets à chaque frame)
  // vec → vecteur général (position de la souris en 3D)
  // ang → vélocité angulaire (rotation) du badge
  // rot → rotation actuelle du badge
  // dir → direction (vecteur normalisé pour le raycasting)
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3()

  // Propriétés communes à tous les segments physiques du cordon
  // type: 'dynamic' → soumis à la physique (gravité, forces)
  // canSleep: true → le moteur physique peut "endormir" l'objet s'il ne bouge plus (optimisation)
  // colliders: false → pas de collider automatique, on les définit manuellement
  // angularDamping: 2 → résistance à la rotation (comme la friction dans l'air)
  // linearDamping: 2 → résistance au déplacement (ralentit naturellement)
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }

  // Charge le modèle 3D du badge
  // nodes → les meshes du fichier (card, clip, clamp)
  // materials → les matériaux associés (base, metal)
  const { nodes, materials } = useGLTF('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')

  // Charge la texture image du cordon (le tissu tressé)
  const texture = useTexture('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg')

  // Récupère la largeur et hauteur du Canvas (en pixels) pour la resolution du cordon
  const { width, height } = useThree((state) => state.size)

  // Crée la courbe Catmull-Rom qui définit la forme du cordon
  // CatmullRomCurve3 → courbe 3D qui passe "naturellement" par des points de contrôle
  // On initialise avec 4 vecteurs vides (ils seront mis à jour à chaque frame)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))

  // dragged → soit false (pas de drag), soit un Vector3 (offset entre pointeur et carte)
  const [dragged, drag] = useState(false)

  // hovered → true si la souris est sur le badge, false sinon
  const [hovered, hover] = useState(false)

  // Crée la liaison corde entre fixed et j1 (les 2 points restent à distance 1 l'un de l'autre)
  // [[0,0,0], [0,0,0], 1] → ancre locale sur chaque corps, distance max = 1
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  // Liaison corde entre j1 et j2
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  // Liaison corde entre j2 et j3
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  // Liaison rotule entre j3 et le badge (card)
  // [0, 1.45, 0] → le point d'ancrage sur le badge est décalé de 1.45 vers le haut (en haut du badge)
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  // Quand hovered change : on change le curseur de la souris
  useEffect(() => {
    if (hovered) {
      // Si on survole : curseur "grab" (main ouverte) ou "grabbing" (main fermée si on drag)
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      // La fonction de retour (cleanup) remet le curseur normal quand on quitte le badge
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged]) // Se déclenche quand hovered ou dragged change

  // useFrame s'exécute à chaque frame (60 fois/sec)
  // state → infos sur la scène (pointer, camera, etc.)
  // delta → temps écoulé depuis la dernière frame (en secondes)
  useFrame((state, delta) => {

    // Si on est en train de drag le badge
    if (dragged) {
      // Convertit la position 2D de la souris (pointer.x/y entre -1 et 1) en position 3D dans la scène
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      // Calcule la direction depuis la caméra vers ce point 3D
      dir.copy(vec).sub(state.camera.position).normalize()
      // Projette ce point à la bonne profondeur (distance = longueur de la position caméra)
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      // Réveille tous les corps physiques (ils peuvent être endormis par canSleep)
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      // Déplace le badge vers la position de la souris, en soustrayant l'offset du drag
      // setNextKinematicTranslation → déplace un body kinématique vers une position précise
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }

    // Si le point fixe existe (la scène est prête)
    if (fixed.current) {

      // Pour j1 et j2 : on lisse (lerp) leur position pour éviter le jitter (tremblement)
      ;[j1, j2].forEach((ref) => {
        // Si le vecteur "lerped" n'existe pas encore sur ce ref, on le crée à la position actuelle
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        // Calcule la distance entre la position lissée et la position réelle physique
        // Math.max(0.1, Math.min(1, ...)) → clamp entre 0.1 et 1 (évite les valeurs extrêmes)
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        // Lerp = interpolation linéaire : déplace "lerped" vers la vraie position progressivement
        // Plus la distance est grande, plus le lerp est rapide (vitesse adaptative)
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })

      // Met à jour les 4 points de contrôle de la courbe Catmull-Rom avec les positions actuelles
      curve.points[0].copy(j3.current.translation())    // bas du cordon (près du badge)
      curve.points[1].copy(j2.current.lerped)           // 2ème segment (lissé)
      curve.points[2].copy(j1.current.lerped)           // 1er segment (lissé)
      curve.points[3].copy(fixed.current.translation()) // haut du cordon (point fixe)

      // Recalcule les points du mesh du cordon en suivant la courbe (32 subdivisions = lisse)
      band.current.geometry.setPoints(curve.getPoints(32))

      // Récupère la vélocité angulaire actuelle du badge
      ang.copy(card.current.angvel())
      // Récupère la rotation actuelle du badge
      rot.copy(card.current.rotation())
      // Corrige la rotation Y : réduit la rotation sur l'axe Y de 25% à chaque frame
      // Effet : le badge se "redresse" naturellement face à la caméra
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  // 'chordal' → type de paramétrage de la courbe, donne un mouvement plus naturel que 'uniform'
  curve.curveType = 'chordal'

  // RepeatWrapping → la texture se répète dans les 2 directions (S = horizontal, T = vertical)
  // Sans ça, la texture s'étirerait au lieu de se répéter le long du cordon
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      {/* Groupe positionné à Y=4 (en haut de la scène) → c'est le point d'accroche du cordon */}
      <group position={[isMobile ? 0 : -4, isMobile ? 6 : 4, 0]}>

        {/* Le point fixe : type="fixed" → ne bouge jamais, ancré dans l'espace */}
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        {/* Premier segment du cordon, décalé de 0.5 sur X */}
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          {/* BallCollider → collider sphérique de rayon 0.1 autour du joint */}
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Deuxième segment, décalé de 1 sur X */}
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Troisième segment, décalé de 1.5 sur X */}
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Le badge lui-même, décalé de 2 sur X au départ */}
        {/* type → kinematicPosition quand on drag (on contrôle sa position manuellement), dynamic sinon */}
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>

          {/* Collider boîte autour du badge : 0.8 large, 1.125 haut, 0.01 d'épaisseur (c'est plat) */}
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          {/* Groupe qui contient les meshes visuels du badge */}
          {/* scale={2.25} → agrandi de 2.25x par rapport à la taille du fichier GLB */}
          {/* position → décalé vers le bas (-1.2 Y) et légèrement vers l'arrière (-0.05 Z) */}
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            // Quand la souris entre sur le badge → hover = true
            onPointerOver={() => hover(true)}
            // Quand la souris quitte le badge → hover = false
            onPointerOut={() => hover(false)}
            // Quand on relâche le clic → libère le pointer capture et arrête le drag
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            // Quand on clique : capture le pointeur (pour garder le drag même hors du mesh)
            // et calcule l'offset entre le point cliqué et le centre du badge
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>

            {/* Le mesh principal de la carte, avec un matériau physique réaliste */}
            <mesh geometry={nodes.card.geometry}>
              {/* meshPhysicalMaterial → matériau avancé avec reflets, vernis, métal */}
              {/* map → texture de base de la carte */}
              {/* map-anisotropy={16} → améliore la netteté de la texture vue en biais */}
              {/* clearcoat={1} → vernis brillant au-dessus (comme une carte plastifiée) */}
              {/* clearcoatRoughness={0.15} → le vernis est presque lisse */}
              {/* roughness={0.3} → surface légèrement rugueuse sous le vernis */}
              {/* metalness={0.5} → mi-métal mi-plastique */}
              <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
            </mesh>

            {/* Le clip métallique en haut du badge, avec son matériau métal légèrement poli */}
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />

            {/* La pince/agrafe du badge, avec le même matériau métal */}
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />

          </group>
        </RigidBody>
      </group>

      {/* Le mesh du cordon (la corde/lanyard) */}
      {/* ref={band} → pour mettre à jour sa géométrie à chaque frame dans useFrame */}
      <mesh ref={band}>
        {/* La géométrie spéciale MeshLine (ligne avec épaisseur réelle en 3D) */}
        <meshLineGeometry />
        {/* Le matériau de la ligne */}
        {/* color="white" → couleur de base blanche */}
        {/* depthTest={false} → la ligne s'affiche toujours par-dessus tout (pas cachée par d'autres objets) */}
        {/* resolution → donne la taille du canvas pour calculer l'épaisseur en pixels */}
        {/* useMap → active l'utilisation de la texture */}
        {/* map={texture} → applique la texture du tissu tressé */}
        {/* repeat={[-3, 1]} → répète la texture 3x sur la longueur (-3 = inversée), 1x sur la largeur */}
        {/* lineWidth={1} → épaisseur de la ligne */}
        <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-3, 1]} lineWidth={1} />
      </mesh>
    </>
  )
}

// On exporte Badge comme composant par défaut pour pouvoir l'importer ailleurs
export default Badge
import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap, { random } from 'gsap'


// detect target found
// const exampleTarget = document.querySelector('#example-target');
// exampleTarget.addEventListener("targetFound", event => {
//     alert("1-found");
/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
scene.background = null

/**
* Lights
*/
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.7
scene.add(ambientLight)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambientLight')

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(2024, 2024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)

debugObject.envMapIntensity = 5
gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials)

debugObject.frontRoughness = 0.1
gui.add(debugObject, 'frontRoughness').min(0).max(1).step(0.0001).onChange(updateAllMaterials)

debugObject.frontMetalness = 0
gui.add(debugObject, 'frontMetalness').min(0).max(1).step(0.0001).onChange(updateAllMaterials)
debugObject.sideMetalness = 0
gui.add(debugObject, 'sideMetalness').min(0).max(1).step(0.0001).onChange(updateAllMaterials)


window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -1
camera.position.y = -0.5
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const updateAllMaterials = () => {
    scene.traverse((child) => {
        console.log(child.material)

        if (child.material) {

            child.material.forEach(el => {
                // el.envMapIntensity = debugObject.envMapIntensity
                el.needsUpdate = true
                el.roughness = debugObject.elRoughness

            })
            child.material[0].roughness = debugObject.frontRoughness
            child.material[0].metalness = debugObject.frontMetalness
        }
    })
}

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000, 0);
// renderer.physicallyCorrectLights = true
// renderer.outputEncoding = THREE.sRGBEncoding
// renderer.toneMapping = THREE.ReinhardToneMapping
// renderer.toneMappingExposure = 3 //exposition


// gui.add(renderer, 'toneMapping', {
//     No: THREE.NoToneMapping,
//     Linear: THREE.LinearToneMapping,
//     Reinhard: THREE.ReinhardToneMapping,
//     Cineon: THREE.CineonToneMapping,
//     ACESFilmic: THREE.ACESFilmicToneMapping
// })
//     .onFinishChange(() => {
//         renderer.toneMapping = Number(renderer.toneMapping)
//         updateAllMaterials()
//     })
// gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)
/**
 * Fonts
 */



var fontLoader = new THREE.FontLoader();

fontLoader.load(
    './fonts/cypher-A.json',
    (font) => {
        fontLoader.load(
            './fonts/cypher-A.json',
            (font) => {
                // text
                let sentence = "LlEeRrEeEeLmSw@xEeCeRyIzTuDpAaNpSjLlEeVbIdRhTDUaEeLk".split(' ').join('').split('');
                sentence.forEach((letter, index) => {
                    let geometry = new THREE.TextBufferGeometry(
                        letter,
                        {
                            font: font,
                            size: 0.3,
                            height: 0.1,
                        }
                    )
                    geometry.center()

                    // Material
                    // const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
                    // const material = new THREE.MeshStandardMaterial()
                    const material = [
                        new THREE.MeshStandardMaterial({ color: 0xffffff, }),
                        new THREE.MeshStandardMaterial({ color: 0x000000, })
                    ]
                    const text = new THREE.Mesh(geometry, material)
                    text.position.x = (index - 25) * 0.18;
                    scene.add(text)
                    directionalLight.position.set(0.25, 3, - 2.25)
                    gui.add(text.position, 'x').min(0).max(1).step(0.001).name('posX')


                    /**
                           * Animate
                           */
                    gsap.to(text.scale, { duration: 3, delay: 1, z: 3 * Math.random(7), yoyo: true, repeat: -1, })

                })//end foreach

                const background = new THREE.MeshStandardMaterial({
                    color: 0x000000
                })

                const plane = new THREE.Mesh(
                    new THREE.PlaneBufferGeometry(10, 0.7),
                    background
                )
                plane.rotation.y = 0
                plane.position.x = 0
                plane.position.z = -0.01
                scene.add(plane)
            })
    })

/**
 * Animate
 */


const animate = () => {
    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

animate()
// });

// // etect target lost
// exampleTarget.addEventListener("targetLost", event => {
//     alert("target lost");
// });

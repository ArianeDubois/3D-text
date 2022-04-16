import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap, { random } from 'gsap'


// detect target found
const exampleTarget = document.querySelector('#example-target');
exampleTarget.addEventListener("targetFound", event => {
    alert("target found");



    /**
     * Base
     */
    // Debug
    const gui = new dat.GUI()

    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()
    scene.background = 'transparent'

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader()
    const matcapTexture = textureLoader.load('textures/matcaps/3.png')

    /**
     * Sizes
     */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

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
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
                                size: 0.5,
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
});

// etect target lost
exampleTarget.addEventListener("targetLost", event => {
    alert("target lost");
});

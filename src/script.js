import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap, { random } from 'gsap'

// detect target found
const target = document.querySelectorAll('.target').forEach(el => {
    el.addEventListener("targetFound", event => {
        if (el.classList.contains('example-target')) {
            alert("1-found");
        }
        if (el.classList.contains('example-target-2')) {
            alert("2-found");
        }
        if (el.classList.contains('example-target-3')) {
            alert("3-found");
        }
        if (el.classList.contains('example-target-4')) {
            alert("4-found");
        }

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

        gui.add(camera.position, 'x').min(-10).max(10).step(0.001).name('posX')
        gui.add(camera.position, 'y').min(-10).max(10).step(0.001).name('posY')
        gui.add(camera.position, 'z').min(-10).max(10).step(0.001).name('posZ')

        console.log(document.querySelector('#example-target'));// Controls
        // const controls = new OrbitControls(camera, canvas)
        // controls.enableDamping = true

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
                        const group = new THREE.Group();

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

                            const material = [
                                new THREE.MeshStandardMaterial({ color: 0xffffff, }),
                                new THREE.MeshStandardMaterial({ color: 0x000000, })
                            ]

                            const text = new THREE.Mesh(geometry, material)
                            text.position.x = (index - 25) * 0.18;
                            group.add(text);

                            directionalLight.position.set(0.25, 3, - 2.25)

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
                        group.add(plane);

                        scene.add(group);
                        gui.add(group.position, 'z').min(-5).max(5).step(0.001).name('z')
                        gui.add(group.position, 'y').min(-5).max(5).step(0.001).name('y')
                        gui.add(group.position, 'x').min(-5).max(5).step(0.001).name('x')
                        gui.add(group.rotation, 'z').min(-5).max(5).step(0.001).name('rz')
                        gui.add(group.rotation, 'y').min(-5).max(5).step(0.001).name('ry')
                        gui.add(group.rotation, 'x').min(-5).max(5).step(0.001).name('rx')
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
    })
});
// const exampleTarget = document.querySelector('#example-target');
// exampleTarget.addEventListener("targetFound", event => {
//     alert("1-found");

// });

// // etect target lost
// exampleTarget.addEventListener("targetLost", event => {
//     alert("target lost");
// });

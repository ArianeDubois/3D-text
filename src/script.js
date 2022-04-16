import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap, { random } from 'gsap'

// detect target found
const target = document.querySelectorAll('.target').forEach(el => {
    console.log(el)
    console.log(el.classList.contains('example-target'))
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

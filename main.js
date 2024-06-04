import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

// // //Scene
// a scene where objects will act
const scene = new THREE.Scene();


// // //Create a sphere

// 3 is the radius of the sphere, 64, 64 (this number makes sphere smooth)are the segments of sphere (width and height segments)
const geometry = new THREE.SphereGeometry(3, 64, 64)  
// here geometry is the just the shape

// and material is how it looks like
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
  roughness: 0.5,
})
// mesh is the combination of geometry and material
const mesh = new THREE.Mesh(geometry, material)
// add mesh to scene
scene.add(mesh)


// // // Sizes
const Sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


// // // Lights
// don't u think we need lights to the scene to spotlight the sphere, bc sphere is the lead of our show today
const light = new THREE.PointLight(0xffffff, 100, 100) // here middle values is the intensity of the light
light.position.set(0, 10, 10)
// light.intensity(102)
scene.add(light)


// // // Camera

// camera is the view of the scene
const camera = new THREE.PerspectiveCamera(45, Sizes.width/Sizes.height , 0.1, 100) // 0.1,100 new clipping point and far clipping point (like zoom)
// here 45 is the field of view like a degrees of vision of camera (focal lenght)
// above 50degree may cause distortion
// 800/600 is the aspect ratio for the camera
camera.position.z = 20 // change the position of the camera to see the sphere(like whithout this the camera and sphere are at same postion and we can't see it)
scene.add(camera)
// added camera to the scene  


// // // Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(Sizes.width, Sizes.height)
renderer.setPixelRatio(3)
renderer.render(scene, camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

// resize
window.addEventListener('resize', ()=>{
  // update the sizes
  Sizes.width = window.innerWidth
  Sizes.height = window.innerHeight
  // update the camera
  camera.updateProjectionMatrix()
  camera.aspect = Sizes.width/Sizes.height
  renderer.setSize(Sizes.width, Sizes.height)
})

const loop = () => {
  // light.rotation.x = 0.2
  // mesh.position.x += 0.1 // this will add animation to the sphere
  controls.update() // this will make the scrolling update
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)

}
loop()


// Timeline magicc
const tl = gsap.timeline({defaults: {duration: 1}}) 
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav',{y:'-100%'},{y:'0%'})
tl.fromTo('.title',{opacity:0},{opacity:1})


// Mouse Animation color
let mouseDown = false
let rgb = [];
window.addEventListener('mousedown',()=>(mouseDown = true))
window.addEventListener('mouseup',()=>(mouseDown = false))

window.addEventListener('mousemove', (e)=>{
  if( mouseDown ){
    rgb = [
      Math.round((e.pageX / Sizes.width) * 255 ),
      Math.round((e.pageY / Sizes.height) * 255 ),
      150
    ]
    // lets animate
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`) // we passing it like new THREE.color(`rgb(0,100,150)`)
    gsap.to(mesh.material.color, {
      r: newColor.r, 
      g: newColor.g, 
      b: newColor.b
    })
  }
})
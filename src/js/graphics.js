const renderer=new THREE.WebGLRenderer({
	antialias: true,
	canvas: rendererEle,
	alpha: true,
})

const setupRenderer=()=>{
	renderer.setSize(rendererEle.offsetWidth,rendererEle.offsetWidth/aspectRatio)
	renderer.setPixelRatio(window.devicePixelRatio)
}
setupRenderer()

const scene=new THREE.Scene()
const camera=new THREE.PerspectiveCamera()
camera.fov=fovY
camera.aspect=aspectRatio
camera.updateProjectionMatrix()

camera.position.set(meshX/2,meshY/2,-camZ)
camera.up.set(0,-1,0)

// const controls=new THREE.OrbitControls(camera,rendererEle)
// controls.target.set(meshX/2,meshY/2,0)

camera.lookAt(meshX/2,meshY/2,0)

const vertices=new Float32Array([
	0,0,0, // Bottom left
	1,0,0, // Bottom right
	0,1,0, // Top left
	1,1,0, // Top Right
])
const uvs=new Float32Array([
	0,0, // Bottom left
	1,0, // Bottom right
	0,1, // Top left
	1,1, // Top Right
])
const faces=[
	3,1,0, // Lower Triangle
	0,2,3, // Upper Triangle
]
const offsets=new Float32Array(meshX*meshY*2)
{
	let x,y,temp=0
	for(y=0;y<meshY;++y){
		for(x=0;x<meshX;++x){
			offsets[temp++]=x
			offsets[temp++]=y
		}
	}
}

const geometry=new THREE.InstancedBufferGeometry()
geometry.addAttribute('position',new THREE.Float32BufferAttribute(vertices,3))
geometry.addAttribute('uv',new THREE.Float32BufferAttribute(uvs,2))
geometry.setIndex(faces)

geometry.addAttribute('aOffset',new THREE.InstancedBufferAttribute(offsets,2))
geometry.maxInstancedCount=meshX*meshY

const textureLoader=new THREE.TextureLoader()
const material=new THREE.ShaderMaterial({
	uniforms: {
		uImg1: { value: textureLoader.load('imgs/Lime-2560x1600.png') },
		uImg2: { value: textureLoader.load('imgs/Oceana-2560x1600.png') },

		uPhase: { value: 0 },
		uMeshSize: { value: new THREE.Vector2(meshX,meshY) },
		uMeshSizeMax: { value: meshMax },
		uMul: { value: mul },
	},
	vertexShader: httpGetText(document.getElementById('vertexShader').src),
	fragmentShader: httpGetText(document.getElementById('pixelShader').src),
	side: THREE.DoubleSide,
})
// material.wireframe=true
const planes=new THREE.Mesh(geometry,material)
scene.add(planes)

let p=0
let then=new Date().getTime()
let forward=true
let playTransition=true
const graphicsUpdate=()=>{
	let now=new Date().getTime()
	let delta=transitionSpeed*(now-then)/10000
	then=now

	if(p>1) forward=false
	if(p<0) forward=true

	if(playTransition){
		if(forward) p+=delta
		else p-=delta
	}

	let q=Math.sin((Math.PI/2)*p)
	material.uniforms.uPhase.value=(q*q)*mul
	renderer.render(scene,camera)
}

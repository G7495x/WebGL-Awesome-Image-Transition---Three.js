window.onresize=()=>{ setupRenderer() }

const animate=()=>{
	graphicsUpdate()
	requestAnimationFrame(animate)
}
animate()

// Prevent pinch zoom for website
document.documentElement.addEventListener('touchstart',(event)=>{
		if(event.touches.length>1) event.preventDefault()
},false)

{
	let startX,pOrg
	rendererEle.onmousedown=function(e){
		startX=e.clientX
		pOrg=p
		this.onmousemove=mousemove
		playTransition=false
	}
	rendererEle.onmouseup=function(e){
		this.onmousemove=null
		playTransition=true
	}
	rendererEle.ontouchstart=(e)=>{
		startX=e.touches[0].clientX
		pOrg=p
		playTransition=false
	}
	rendererEle.ontouchend=()=>{ playTransition=true }

	const mousemove=(e)=>{
		let deltaX=(e.clientX-startX)/500
		setP(deltaX)
	}
	rendererEle.ontouchmove=(e)=>{
		let deltaX=(e.touches[0].clientX-startX)/500
		setP(deltaX)
	}
	const setP=(deltaX)=>{
		p=clamp(0,1,pOrg+interactionSensitivity*deltaX)
	}
}

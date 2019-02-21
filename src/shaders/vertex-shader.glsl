const float PI2=6.283185307179586;
const float PI=3.141592653589793;
const float PI_2=1.5707963267948966;

attribute vec2 aOffset;

uniform float uPhase;
uniform vec2 uMeshSize;
uniform float uMeshSizeMax;
uniform float uMul;

varying vec2 vTexCoord;
varying float p;

void main(){
	vec4 pos=vec4(position,1.);
	p=-(aOffset.x+aOffset.y)/(uMeshSizeMax*2.);
	p=clamp(p+2.*uPhase,0.,1.);

	float sinP90=sin(PI_2*p);
	float sin2P90=sinP90*sinP90;
	float sinP180=sin(PI*p);

	if(p<=.5) vTexCoord.xy=aOffset.xy+pos.xy;
	else vTexCoord.xy=aOffset.xy+pos.yx;
	vTexCoord.xy/=uMeshSize;
	vTexCoord.y=1.-vTexCoord.y;

	if(
		position.x==0.&&position.y!=0.||
		position.y==0.&&position.x!=0.
	){
		// Rotation
		pos.xy=mix(pos.xy,pos.yx,sin2P90);
		pos.z=sinP180;
		if(position.x!=0.) pos.z=-pos.z;

		// Arrow head
		if(p<=.5) pos.xy+=.8*sinP180;
		else pos.xy-=.8*sinP180;
	}
	float q=p;
	if(q>=.5) q=1.-q;
	pos.z-=uMeshSizeMax/2.*q*q;

	pos.xy+=aOffset;
	gl_Position=projectionMatrix*(viewMatrix*pos);
}

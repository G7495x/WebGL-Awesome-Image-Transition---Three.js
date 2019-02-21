uniform sampler2D uImg1;
uniform sampler2D uImg2;

varying vec2 vTexCoord;
varying float p;

void main(){
	// if(gl_FrontFacing)
	if(p<=.5) gl_FragColor=texture2D(uImg1,vTexCoord);
	else gl_FragColor=texture2D(uImg2,vTexCoord);
}

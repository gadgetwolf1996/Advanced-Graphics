varying vec3 fPosition;
varying vec3 fNormal;

void main(){
	vec3 light = vec3(0,1,0);

	float lambert = dot(normalize(fNormal), normalize(light));

	vec3 ambient = vec3(0,0,1) * 0.5;

	gl_FragColor = vec4(ambient + lambert, 1.0);
}
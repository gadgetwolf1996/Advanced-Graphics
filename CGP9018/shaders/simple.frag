varying vec3 fPosition;
varying vec3 fNormal;

void main(){
	vec3 light = vec3(0,1,0);

	vec3 color = vec3(0.5,0.3,0);

	float DiffuseIntensity = 0.5;
	vec3 diffuse = color * dot(light, fNormal) * DiffuseIntensity;

	vec3 viewDir = normalize(-fPosition);

	vec3 reflectDir = normalize(reflect(fNormal, light));

	float alpha = 25.0;

	vec3 specular = vec3(1) * pow(max(0.0, dot(viewDir, reflectDir)), alpha) * 1.0;

	vec3 lambert = dot(normalize(fNormal), normalize(light)) * color;

	vec3 ambient = color * 0.9;

	gl_FragColor = vec4(ambient + ((lambert + diffuse)* 0.5) +specular, 1.0);
}
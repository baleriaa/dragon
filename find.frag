#version 330 compatibility

uniform float aspectRatio;
uniform float offsetX;
uniform float offsetY;
uniform float zoom;
uniform float vLightIntensity;
uniform int maxIterations;

in vec2 vST;

out vec4 fragColor;

void main() {
    // Adjust the mapping of texture coordinates to complex plane as needed
    vec2 c = (vST - 0.5) * 2.0 * vec2(aspectRatio, 1.0) * zoom + vec2(offsetX, offsetY);
    vec2 z = vec2(0.0, 0.0);
    int i;
    // Declare a variable to store the length of z for smooth coloring
float zn;
for (i = 0; i < maxIterations && dot(z, z) < 4.0; ++i) {
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    zn = dot(z, z); // Update zn with the squared length of z
}

// Implementing smooth coloring
float smoothColor = i + 1 - log(log(sqrt(zn))) / log(2.0);
float t = smoothColor / float(maxIterations);
vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(1.0, 0.5, 0.0), t);


    fragColor = vec4(color, 1.0) * vLightIntensity;
}
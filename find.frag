#version 330 compatibility

uniform float aspectRatio;
uniform vec2 offset;
uniform float zoom;
uniform float vLightIntensity;

in vec2 vST;
// in float vLightIntensity;

out vec4 fragColor;

void main() {
    // Adjust the mapping of texture coordinates to complex plane as needed
    vec2 c = (vST - 0.5) * 2.0 * vec2(aspectRatio, 1.0) * zoom + offset;
    vec2 z = vec2(0.0, 0.0);
    int maxIterations = 100;
    int i;
    for (i = 0; i < maxIterations && dot(z, z) < 4.0; ++i) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    }
    
    // Simple grayscale based on the iteration count
    float t = float(i) / float(maxIterations);
    vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(1.0, 0.5, 0.0), t);

    fragColor = vec4(color, 1.0) * vLightIntensity;
}

import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

// Definindo o tamanho da câmera de acordo com o tamanho da tela

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Adicionando Luz a cena

const pointLight = new THREE.PointLight();
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight();
scene.add(pointLight, ambientLight);

// Renderizando diversas estrelas na cena

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("outerSpace.jpg");
scene.background = spaceTexture;

const bernardoTexture = new THREE.TextureLoader().load("pink-hair.jpg");

const bernardo = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: bernardoTexture }),
);

scene.add(bernardo);

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
    }),
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

bernardo.position.z = -5;
bernardo.position.x = 2;

function moveCamera() {
    const userCamera = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    bernardo.rotation.y += 0.01;
    bernardo.rotation.z += 0.01;

    camera.position.z = userCamera * -0.01;
    camera.position.x = userCamera * -0.0002;
    camera.rotation.y = userCamera * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame(animate);

    moon.rotation.x += 0.005;

    renderer.render(scene, camera);
}

animate();

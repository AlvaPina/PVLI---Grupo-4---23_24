import MeleeComponent from './MeleeComponent';
import RangedComponent from './RangedComponent';
import FlyingComponent from './FlyingComponent';

export function initProblemasMatematicos(enemy) {
    enemy.health = 100;
    enemy.speed = 100;
    enemy.detectionRange = 200;
    enemy.patrolRange = { start: enemy.x - 100, end: enemy.x + 100 };
    enemy.direction = 1;
    enemy.distanciaVision = 10;

    enemy.components.MeleeComponent = new MeleeComponent(enemy.scene, enemy);
}

export function initPuton(enemy) {
    enemy.health = 150;
    enemy.speed = 80;
    enemy.detectionRange = 300;
    enemy.shootDelay = 2000;
    enemy.lastShot = 0;
    enemy.distanciaVision = 10;

    enemy.components.RangedComponent = new RangedComponent(enemy.scene, enemy);
}

export function initSombra(enemy) {
    enemy.health = 120;
    enemy.speed = 120;
    enemy.detectionRange = 250;
    enemy.flyRange = { minY: enemy.y - 50, maxY: enemy.y + 50 };
    enemy.direction = -1;
    enemy.distanciaVision = 15;

    enemy.components.RangedComponent = new MeleeComponent(enemy.scene, enemy);
    enemy.components.FlyComponent = new FlyingComponent(enemy.scene, enemy);
}

export function initDefault(enemy) {
    enemy.health = 50;
    enemy.speed = 50;
}

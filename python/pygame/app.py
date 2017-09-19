#! /usr/bin/env python

import pygame
import random
import sys
from datetime import datetime

world_width, world_height = 1000, 1000
max_speed = 1000
max_acceleration = 5000

class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector2D(self.x - other.x, self.y - other.y)

    def __mul__(self, factor):
        return Vector2D(self.x * factor, self.y * factor)

    def norm(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

    def normalized(self):
        return self * (1 / self.norm())

    def __str__(self):
        return "({}, {})".format(self.x, self.y)

    
class Boid:
    def __init__(self, initial_position):
        self.position = initial_position
        self.velocity = Vector2D(0, 0)

    def update(self, dt):
        self.position += self.velocity * dt

    def accelerate(self, acceleration, dt):
        self.velocity = self.velocity + acceleration * dt

        speed = self.velocity.norm()
        
        if speed > max_speed:
            self.velocity = self.velocity * (max_speed / speed)
        
        
    def attract(self, pos, dt, factor):
        acceleration = (pos - self.position).normalized() * 5000 * factor
        self.accelerate(acceleration, dt)


    def bounce(self):
        if self.position.x < 0:
            self.position.x = -self.position.x
            self.velocity.x = -self.velocity.x
        elif self.position.x > world_width:
            self.position.x = 2 * world_width - self.position.x
            self.velocity.x = -self.velocity.x

        if self.position.y < 0:
            self.position.y = -self.position.y
            self.velocity.y = -self.velocity.y
        elif self.position.y > world_height:
            self.position.y = 2 * world_height - self.position.y
            self.velocity.y = -self.velocity.y
        


screen = pygame.display.set_mode((world_width, world_height))
running = 1
last_tick = datetime.now()
boids = [ Boid( Vector2D(random.randint(0, world_width), random.randint(0, world_height)) ) for _ in range(0, 50) ]
factor = 1

while running:
    event = pygame.event.poll()
    if event.type == pygame.QUIT:
        running = 0
    elif event.type == pygame.KEYDOWN:
        if event.key == pygame.K_q:
            max_speed *= 1.1
            print("Increasing speed to {}".format(max_speed), flush=True)
        elif event.key == pygame.K_a:
            max_speed /= 1.1
            print("Decreasing speed to {}".format(max_speed), flush=True)
        elif event.key == pygame.K_SPACE:
            factor = -factor
            print("Inverting force")

    screen.fill((0, 0, 0))

    now = datetime.now()
    delta = (now - last_tick).total_seconds()
    last_tick = now

    x, y = pygame.mouse.get_pos()
    attraction = Vector2D(x, y)

    
    for boid in boids:
        boid.attract(attraction, delta, factor)
        boid.update(delta)
        boid.bounce()
        pygame.draw.circle(screen, (255, 0, 0), (int(boid.position.x), int(boid.position.y)), 1)

    pygame.display.flip()

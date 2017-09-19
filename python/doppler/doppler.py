import wave
import sys
from math import sin, cos


speed_of_sound = 300


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

    def distance(self, other):
        dx = self.x - other.x
        dy = self.y - other.y
        return (dx ** 2 + dy ** 2) ** 0.5


def position(t):
    x = 100 * cos(2 * 3.1415 * t / 10)
    y = 100 * sin(2 * 3.1415 * t / 10)

    # x = 100 - 5 * t
    # y = 1
    return Point(x, y)

def interpolate(p1, p2, t):
    t1, x1 = p1
    t2, x2 = p2

    t = (t - t1) / (t2 - t1)
    return x1 + (x2 - x1) * t


def interpolate_samples(timed_samples):
    result = []
    last_t, last_x = 0, 0
    t = 0

    for next_t, next_x in timed_samples:
        while t < next_t:
            x = interpolate( (last_t, last_x), (next_t, next_x), t )
            result.append(int(x))
            t += 1/44100

        last_t, last_x = next_t, next_x

    return result


input_file, output_file = sys.argv

with wave.open(input_file, 'rb') as file:
    params = file.getparams()

    if params.nchannels != 1 or params.sampwidth != 1 or params.framerate != 44100:
        sys.exit('wav file should be mono 8 bit 44.1kHz')

    nframes = file.getnframes()
    samples = file.readframes(file.getnframes())

    left_channel = []
    right_channel = []
    for i in range(0, len(samples)):
        t = i / params.framerate
        distance = position(t).distance( Point(1,0) )
        delay = distance / speed_of_sound
        loudness = max(0, min(1, 1 / (distance / 50) ** 2))
        left_channel.append((t + delay, samples[i] * loudness))

        distance = position(t).distance( Point(-1,0) )
        delay = distance / speed_of_sound
        loudness = max(0, min(1, 1 / (distance / 50) ** 2))
        right_channel.append((t + delay, samples[i] * loudness))

    left = interpolate_samples(left_channel)
    right = interpolate_samples(right_channel)

    result = [ channel[i] for i in range(0, min(len(left), len(right))) for channel in [left, right] ]

    with wave.open(output_file, 'wb') as out:
        out.setparams( (2, 1, 44100, len(result), 'NONE', 'not compressed') )
        out.writeframes( bytes([ result[i] for i in range(0, len(result)) ]) )


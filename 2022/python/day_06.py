with open('../inputs/aoc_22_day_06_input.txt', 'r') as f:
    data = f.read().split('\n')[0]


def aoc_22_day_06_part_1(data):
    for i in range(0, len(data)):
        if len(set(data[i:i+4])) == 4:
            return i+4


def aoc_22_day_06_part_2(data):
    for i in range(0, len(data)):
        if len(set(data[i:i+14])) == 14:
            return i+14


print(aoc_22_day_06_part_1(data))
print(aoc_22_day_06_part_2(data))

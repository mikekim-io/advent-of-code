with open('aoc_22_day_03_input.txt', 'r') as f:
    rucksacks = [line.strip('\n') for line in f.readlines()]


def calculate_priority_score(char):
    return ord(char) - 96 if char.islower() else ord(char) - 38


def aoc_22_day_03_part_1(rucksacks):
    total_score = 0
    for rucksack in rucksacks:
        half = len(rucksack) // 2
        front, back = rucksack[:half], rucksack[half:]
        front_set, back_set = set(front),  set(back)
        char = list(front_set.intersection(back_set))[0]
        total_score += calculate_priority_score(char)
    return total_score


def aoc_22_day_03_part_2(rucksacks):
    total_score = 0
    for i in range(0, len(rucksacks), 3):
        a, b, c = rucksacks[i], rucksacks[i+1], rucksacks[i+2]
        a_set, b_set, c_set = set(a), set(b), set(c)
        char = list(a_set.intersection(b_set.intersection(c_set)))[0]
        total_score += calculate_priority_score(char)
    return total_score


print(aoc_22_day_03_part_1(rucksacks))
print(aoc_22_day_03_part_2(rucksacks))

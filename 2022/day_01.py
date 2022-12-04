with open('aoc_22_day_01_input.txt', 'r') as f:
    # groups of calories will be split by \n\n
    raw_lines = f.read().strip().split('\n\n')
    raw_calories = [list(map(int, line.split('\n'))) for line in raw_lines]
    calories = [sum(calories) for calories in raw_calories]


def aoc_22_day_01_part_1(calories):
    return max(calories)


def aoc_22_day_01_part_2(calories):
    return sum(sorted(calories)[-3:])


print(aoc_22_day_01_part_1(calories))
print(aoc_22_day_01_part_2(calories))

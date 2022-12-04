import re

with open('aoc_22_day_04_input.txt', 'r') as f:
    pairs = []
    for line in f.readlines():
        pairs.append([int(i) for i in re.findall(r'\d+', line.strip())])


def aoc_22_day_04_part_1(pairs):
    overlap_count = 0
    for a_min, a_max, b_min, b_max in pairs:
        # find where one pair's range fits in the other pair's range
        if (a_min <= b_min and a_max >= b_max) or (b_min <= a_min and b_max >= a_max):
            overlap_count += 1
    return overlap_count


def aoc_22_day_04_part_2(pairs):
    overlap_count = 0
    for a_min, a_max, b_min, b_max in pairs:
        # find where there is any overlap between either pair's ranges
        if (a_min <= b_min <= a_max) or (a_min <= b_max <= a_max) or (b_min <= a_min <= b_max) or (b_min <= a_max <= b_max):
            overlap_count += 1
    return overlap_count


print(aoc_22_day_04_part_1(pairs))
print(aoc_22_day_04_part_2(pairs))

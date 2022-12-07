from collections import defaultdict

with open('aoc_22_day_07_input.txt', 'r') as f:
    commands = [line.split(' ') for line in f.read().split('\n')]
    sizes = defaultdict(int)
    cd = []

    for c in commands:
        match c:
            case ['$', 'cd', '..']:
                cd.pop()
            case ['$', 'cd', dir]:
                cd.append(dir)
            case [size, filename]:
                if size.isdigit():
                    # start at i=1 for key joining; i = 0 returns empty array key
                    for i in range(1, len(cd)+1):
                        key = '/'.join(cd[:i])
                        sizes[key] += int(size)
                else:
                    pass


def aoc_22_day_07_part_1(sizes):
    return (sum(dir for dir in sizes.values() if dir < 100000))


def aoc_22_day_07_part_2(sizes):
    total_diskspace, needed_unused_space, diskspace_used = 70000000, 30000000, sizes['/']
    return min(dir for dir in sizes.values() if total_diskspace - diskspace_used + dir >= needed_unused_space)


print(aoc_22_day_07_part_1(sizes))
print(aoc_22_day_07_part_2(sizes))

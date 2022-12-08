with open('../inputs/aoc_22_day_08_input.txt', 'r') as f:
    grid = [list(line) for line in f.read().split('\n')]


def aoc_22_day_07_part_1(grid):
    # create visibility matrix (0/1)
    matrix = calculate_visibility_matrix(grid)

    return sum(map(sum, matrix))


def calculate_visibility_matrix(grid):
    matrix = [[0 for j in range(len(grid[0]))]
              for i in range(len(grid))]

    for y in range(len(grid)):
        curr_max = 0
        for x in range(len(grid[y])):
            if x == 0:
                matrix[y][x] = 1
                curr_max = grid[y][0]
            curr_max = calculate_matrix_and_max(matrix, grid, x, y, curr_max)

        curr_max = 0
        for x in reversed(range(len(grid))):
            if x == len(grid[y])-1:
                matrix[y][x] = 1
                curr_max = grid[y][x]
            curr_max = calculate_matrix_and_max(matrix, grid, x, y, curr_max)

    for x in range(len(grid[0])):
        curr_max = 0
        for y in range(len(grid)):
            if y == 0:
                matrix[y][x] = 1
                curr_max = grid[y][x]
            curr_max = calculate_matrix_and_max(matrix, grid, x, y, curr_max)

        curr_max = 0
        for y in reversed(range(len(grid))):
            if y == len(grid)-1:
                matrix[y][x] = 1
                curr_max = grid[y][x]
            curr_max = calculate_matrix_and_max(matrix, grid, x, y, curr_max)

    return matrix


def calculate_matrix_and_max(matrix, grid, x, y, curr_max):
    if grid[y][x] > curr_max:
        matrix[y][x] = 1
        return grid[y][x]
    return curr_max


def aoc_22_day_07_part_2(grid):
    scenic_score = 0

    for y in range(len(grid)):
        for x in range(len(grid[y])):
            if y == 0 or y == len(grid)-1 or x == 0 or x == len(grid[y])-1:
                pass
            current_scenic_score = calculate_scenic_score(grid, x, y)
            scenic_score = max(scenic_score, current_scenic_score)

    return scenic_score


def calculate_scenic_score(grid, x, y):
    left, right, top, bottom = 0, 0, 0, 0
    p_l, p_r = x-1, x+1
    p_t, p_b = y-1, y+1

    while (p_l >= 0):
        if grid[y][x] > grid[y][p_l]:
            left += 1
            p_l -= 1
        elif grid[y][x] <= grid[y][p_l]:
            left += 1
            break

    while (p_r <= len(grid[x])-1):
        if grid[y][x] > grid[y][p_r]:
            right += 1
            p_r += 1
        elif grid[y][x] <= grid[y][p_r]:
            right += 1
            break

    while (p_t >= 0):
        if grid[y][x] > grid[p_t][x]:
            top += 1
            p_t -= 1
        elif grid[y][x] <= grid[p_t][x]:
            top += 1
            break

    while (p_b <= len(grid)-1):
        if grid[y][x] > grid[p_b][x]:
            bottom += 1
            p_b += 1
        elif grid[y][x] <= grid[p_b][x]:
            bottom += 1
            break

    return left * right * top * bottom


print(aoc_22_day_07_part_1(grid))
print(aoc_22_day_07_part_2(grid))

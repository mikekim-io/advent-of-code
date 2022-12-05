import re

with open('aoc_22_day_05_input.txt', 'r') as f:
    moves = []
    stacks, stack_indices = {}, {}
    stack, moves_txt = f.read().split('\n\n')
    stack_lines = stack.split('\n')
    # parse move list
    for move in moves_txt.split('\n'):
        moves.append([int(i) for i in re.findall(r'\d+', move.strip())])

    # parse stack / iterate in reverse to start from bottom of stack
    for i in range(len(stack_lines)-1, -1, -1):
        for j, v in enumerate(stack_lines[i]):
            if i == len(stack_lines)-1 and re.match(r'\w', v):
                stacks[int(v)] = ''
                # store index where we found the value
                # all crates that belong to this stack should share the same index
                stack_indices[j] = int(v)
            elif i <= len(stack_lines)-1 and re.match(r'\w', v):
                stacks[stack_indices[j]] = stacks[stack_indices[j]] + v


def aoc_22_day_05_part_1(stacks):
    result_stacks = dict(stacks)
    for qty, frm, to in moves:
        result_stacks[to] = result_stacks[to] + result_stacks[frm][-qty:][::-1]
        result_stacks[frm] = result_stacks[frm][:-qty]
    last_crates = ''.join([result_stacks[key][-1] for key in result_stacks])
    return last_crates


def aoc_22_day_05_part_2(stacks):
    result_stacks = dict(stacks)
    for qty, frm, to in moves:
        result_stacks[to] = result_stacks[to] + result_stacks[frm][-qty:]
        result_stacks[frm] = result_stacks[frm][:-qty]
    last_crates = ''.join([result_stacks[key][-1] for key in result_stacks])
    return last_crates


print(aoc_22_day_05_part_1(stacks))
print(aoc_22_day_05_part_2(stacks))

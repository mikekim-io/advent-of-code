with open('aoc_22_day_02_input.txt', 'r') as f:
    rounds = []
    for line in f.readlines():
        rounds.append(line.strip('\n').split(' '))


def calculate_round_score_part_1(a, b):
    round_score = 0
    # a = opponents move, b = players move
    a_r, a_p, a_s = 'A', 'B', 'C'
    b_r, b_p, b_s = 'X', 'Y', 'Z'
    move_score = {
        'X': 1,
        'Y': 2,
        'Z': 3
    }
    if (a == a_r and b == b_p) or (a == a_p and b == b_s) or (a == a_s and b == b_r):
        # win
        round_score += 6 + move_score[b]
    elif (a == a_r and b == b_r) or (a == a_p and b == b_p) or (a == a_s and b == b_s):
        # draw
        round_score += 3 + move_score[b]
    else:
        # lose
        round_score += move_score[b]
    return round_score


def calculate_round_score_part_2(a, b):
    round_score = 0
    # a = oppoents move, b = round result
    a_r, a_p, a_s = 'A', 'B', 'C'
    lose, draw, win = 'X', 'Y', 'Z'
    rock, paper, scissor = 1, 2, 3

    if (b == win):
        round_score += 6
    elif (b == draw):
        round_score += 3

    if (a == a_r and b == draw) or (a == a_p and b == lose) or (a == a_s and b == win):
        # b plays rock
        round_score += rock
    elif (a == a_p and b == draw) or (a == a_s and b == lose) or (a == a_r and b == win):
        # b plays paper
        round_score += paper
    else:
        # b plays scissor
        round_score += scissor
    return round_score


def aoc_22_day_02_part_1(rounds):
    total_score = 0
    for a, b in rounds:
        total_score += calculate_round_score_part_1(a, b)
    return total_score


def aoc_22_day_02_part_2(rounds):
    total_score = 0
    for a, b in rounds:
        total_score += calculate_round_score_part_2(a, b)
    return total_score


print(aoc_22_day_02_part_1(rounds))
print(aoc_22_day_02_part_2(rounds))

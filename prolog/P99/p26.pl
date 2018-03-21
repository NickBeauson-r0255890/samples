combinations(0, _, []).
combinations(N, [_|Xs], R) :-
    N > 0,
    combinations(N, Xs, R).
combinations(N, [X|Xs], [X|R]) :-
    N > 0,
    M is N - 1,
    combinations(M, Xs, R).

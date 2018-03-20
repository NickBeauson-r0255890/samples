split([], _, [], []).
split(Xs, 0, [], Xs).
split([X|Xs], N, [X|L], R) :-
    N > 0,
    M is N - 1,
    split(Xs, M, L, R).

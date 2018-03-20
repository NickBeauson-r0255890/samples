rle_aux([], X, 1, [X]).
rle_aux([], X, N, [[N, X]]) :-
    N > 1.
rle_aux([X|Xs], X, N, R) :-
    M is N + 1,
    rle_aux(Xs, X, M, R).
rle_aux([X|Xs], Y, 1, [Y|R]) :-
    X \= Y,
    rle_aux(Xs, X, 1, R).
rle_aux([X|Xs], Y, N, [[N, Y]|R]) :-
    N > 1,
    X \= Y,
    rle_aux(Xs, X, 1, R).

rle([], []).
rle([X|Xs], Ys) :-
    rle_aux(Xs, X, 1, Ys).

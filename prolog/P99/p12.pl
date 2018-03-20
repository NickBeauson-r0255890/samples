repeat(0, _, X/X).
repeat(N, X, [X|R]/T) :-
    N > 0,
    M is N - 1,
    repeat(M, X, R/T).

unrle_aux([], T/T).
unrle_aux([[N, X]|Xs], R/T) :-
    repeat(N, X, R/T2),
    unrle_aux(Xs, T2/T).
unrle_aux([X|Xs], [X|R]/T) :-
    X \= [_, _],
    unrle_aux(Xs, R/T).

unrle(Xs, Ys) :-
    unrle_aux(Xs, Ys/[]).

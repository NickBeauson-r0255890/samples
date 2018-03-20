repeat(0, _, R/R).
repeat(N, X, [X|R]/T) :-
    N > 0,
    M is N - 1,
    repeat(M, X, R/T).

dupli([], _, []).
dupli([X|Xs], N, R) :-
    repeat(N, X, R/T),
    dupli(Xs, N, T).

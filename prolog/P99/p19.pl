take(_, 0, T/T).
take([X|Xs], N, [X|R]/T) :-
    N > 0,
    M is N - 1,
    take(Xs, M, R/T).

drop([], _, T/T).
drop([_|Xs], N, R/T) :-
    N > 0,
    M is N - 1,
    drop(Xs, M, R/T).
drop([X|Xs], 0, [X|R]/T) :-
    drop(Xs, 0, R/T).

rotate(Xs, N, R) :-
    drop(Xs, N, R/T),
    take(Xs, N, T/[]).

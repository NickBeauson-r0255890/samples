drop([], _, _, []).
drop([_|Xs], 1, N, R) :-
    drop(Xs, N, N, R).
drop([X|Xs], I, N, [X|R]) :-
    I > 1,
    J is I-1,
    drop(Xs, J, N, R).

drop(Xs, N, R) :-
    drop(Xs, N, N, R).

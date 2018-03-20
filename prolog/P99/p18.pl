take([], _, []).
take(_, 0, []).
take([X|Xs], N, [X|R]) :-
    N > 0,
    M is N - 1,
    take(Xs, M, R).

slice([], _, _, []).
slice([_|Xs], I, J, R) :-
    I > 1,
    I2 is I - 1,
    J2 is J - 1,
    slice(Xs, I2, J2, R).
slice(Xs, 1, N, R) :-
    take(Xs, N, R).

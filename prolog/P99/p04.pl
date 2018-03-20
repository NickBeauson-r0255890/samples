size([], 0).
size([_|Xs], N) :-
    size(Xs, M),
    N is M + 1.

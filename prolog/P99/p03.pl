element_at(X, [X|_], 1).
element_at(X, [_|Xs], I) :-
    I > 1,
    J is I - 1,
    element_at(X, Xs, J).

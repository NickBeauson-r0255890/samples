remove_at(X, [X|Xs], 1, Xs).
remove_at(Y, [X|Xs], I, [X|R]) :-
    I > 1,
    J is I - 1,
    remove_at(Y, Xs, J, R).

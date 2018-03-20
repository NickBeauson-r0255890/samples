last(X, [X]).
last(X, [_|Xs]) :- last(X, Xs).

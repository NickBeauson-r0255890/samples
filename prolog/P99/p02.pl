penultimate(X, [X, _]).
penultimate(X, [_|Xs]) :- penultimate(X, Xs).

flatten_aux([], R, R).
flatten_aux([X|Xs], R, T) :-
    (   
    	[_|_] = X ->	flatten_aux(X, R, T2),
    					flatten_aux(Xs, T2, T)
    ;
        R = [X|R2],
    	flatten_aux(Xs, R2, T)
    ).

flatten(Xs, Ys) :-
    flatten_aux(Xs, Ys, []).

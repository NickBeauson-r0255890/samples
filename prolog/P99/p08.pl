uniq([], []).
uniq([X|Xs], Ys) :-
   	uniq(Xs, Zs),
    (  
    	Zs = [X|_] -> Ys = Zs
    ;   
    	Ys = [X|Zs]
    ).

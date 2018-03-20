split([X|Xs], [X|L], R) :-
    split(Xs, L, R).
split([X,Y|Ys], [X], [Y|Ys]).

ast([X], X, X).
ast(Xs, Ast, Val) :-
    split(Xs, L, R),
    ast(L, LAst, LVal),
    ast(R, RAst, RVal),
    (   
    	Ast = LAst + RAst,
        Val is LVal + RVal
    ;   
    	Ast = LAst - RAst,
        Val is LVal - RVal
    ;   
    	Ast = LAst * RAst,
        Val is LVal * RVal
    ;   
    	Ast = LAst / RAst,
        Val is LVal / RVal
    ).

solve(Xs, LAst, RAst) :-
    split(Xs, L, R),
    ast(L, LAst, LVal),
    ast(R, RAst, RVal),
    LVal is RVal.

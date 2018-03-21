increment(X, [leaf(X):N | Fs], [leaf(X):M | Fs]) :-
    M is N + 1.
increment(X, [leaf(Y):N | Fs], [leaf(Y):N | R]) :-
    X \= Y,
    increment(X, Fs, R).
increment(X, [], [leaf(X):1]).

frequencies([], Acc, Acc).
frequencies([X|Xs], Acc, R) :-
    increment(X, Acc, Acc2),
    frequencies(Xs, Acc2, R).

frequencies(Xs, R) :-
    frequencies(Xs, [], R).

split([], [], []).
split([X|Xs], [X|L], R) :-
    split(Xs, R, L).

merge([], Ys, Ys).
merge(Xs, [], Xs).
merge([X:XN | Xs], [Y:YN | Ys], [X:XN | R]) :-
    XN < YN,
    merge(Xs, [Y:YN | Ys], R).
merge([X:XN | Xs], [Y:YN | Ys], [Y:YN | R]) :-
    XN >= YN,
    merge([X:XN | Xs], Ys, R).

fsort([], []).
fsort([X], [X]).
fsort([X,Y|Xs], Result) :-
    split([X,Y|Xs], L, R),
    fsort(L, LS),
    fsort(R, RS),
    merge(LS, RS, Result).

tree([X:NX], X:NX).
tree([X:NX, Y:NY|Rest], R) :-
    Sum is NX + NY,
    Xs = [branch(X:NX, Y:NY):Sum | Rest],
    fsort(Xs, Ys),
    tree(Ys, R).

code(leaf(X):_, X, []).
code(branch(L, _):_, X, [0|Result]) :-
    code(L, X, Result).
code(branch(_, R):_, X, [1|Result]) :-
    code(R, X, Result).

codes(Input, Codes) :-
    frequencies(Input, Freqs),
    tree(Freqs, Tree),
    findall(Char:Code, code(Tree, Char, Code), Codes).

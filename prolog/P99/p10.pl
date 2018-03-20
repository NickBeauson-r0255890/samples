take([], _, [], []).
take([X|Xs], X, [X|Taken], Rest) :-
    take(Xs, X, Taken, Rest).
take([X|Xs], Y, [], [X|Xs]) :-
    X \= Y.

pack([], []).
pack([X|Xs], [Taken|R2]) :-
    take([X|Xs], X, Taken, Rest),
    pack(Rest, R2).

size([], 0).
size([_|Xs], N) :-
    size(Xs, M),
    N is M + 1.

counts([], []).
counts([[X|Xs]|Ys], [[N, X] | R]) :-
       size([X|Xs], N),
       counts(Ys, R).

rle(Xs, Ys) :-
    pack(Xs, Packs),
    counts(Packs, Ys).


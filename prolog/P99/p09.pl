take([], _, [], []).
take([X|Xs], X, [X|Taken], Rest) :-
    take(Xs, X, Taken, Rest).
take([X|Xs], Y, [], [X|Xs]) :-
    X \= Y.

pack([], []).
pack([X|Xs], [Taken|R2]) :-
    take([X|Xs], X, Taken, Rest),
    pack(Rest, R2).

reverse_aux([], R, R).
reverse_aux([X|Xs], Tail, R) :-
    reverse_aux(Xs, [X|Tail], R).

reverse(X, Y) :-
    reverse_aux(X, [], Y).

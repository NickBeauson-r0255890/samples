range(A, B, []) :-
    A > B.
range(A, B, [A|R]) :-
    A =< B,
    A2 is A + 1,
    range(A2, B, R).

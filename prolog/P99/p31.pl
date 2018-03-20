range(A, B, A) :-
    A < B.
range(A, B, X) :-
    A < B,
    A2 is A + 1,
    range(A2, B, X).

is_composite(N) :-
    range(2, N, K),
    0 is N mod K,
    !.

is_prime(N) :- N > 1, \+ is_composite(N).

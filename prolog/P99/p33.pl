gcd(X, 0, X).
gcd(X, Y, G) :-
    Y > 0,
    R is X mod Y,
    gcd(Y, R, G).

coprime(X, Y) :-
    gcd(X, Y, 1).

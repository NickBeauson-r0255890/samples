gcd(X, 0, X).
gcd(X, Y, G) :-
    Y > 0,
    R is X mod Y,
    gcd(Y, R, G).

coprime(X, Y) :-
    gcd(X, Y, 1).

phi(N, K, Acc, R) :-
    (
    	N = 1         ->    R = 1
    ;   
    	N = K         ->  	Acc = R
    ;
    	coprime(K, N) ->  	K2 is K + 1,
        					Acc2 is Acc + 1,
        					phi(N, K2, Acc2, R)
    ;
    	K2 is K + 1,
    	phi(N, K2, Acc, R)
    ).

phi(N, R) :-
    phi(N, 1, 0, R).

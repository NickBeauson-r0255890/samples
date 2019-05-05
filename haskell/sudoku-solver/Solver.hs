module Main where

import qualified Data.Map as Map
import Data.List
import Data.Maybe
import Data.Function(on)
    
newtype Position = Position (Int, Int) deriving Eq

instance Show Position where
    show (Position (x, y)) = show (x, y)


sameGroup :: Position -> Position -> Bool
-----------------------------------------
sameGroup (Position (x, y)) (Position (x', y')) = sameRow || sameCol || sameSqr
    where
      sameRow = y == y'
      sameCol = x == x'
      sameSqr = (x `div` 3 == x' `div` 3) && (y `div` 3 == y' `div` 3)


solve :: [(Position, [Int])] -> [(Position, Int)]
-------------------------------------------------
solve = head . aux [] . sort
    where
      sort = sortBy (compare `on` length)

      aux acc []              = return acc
      aux acc ((p, dom) : xs) = do v <- dom
                                   aux ((p, v) : acc) (sort $ map (prune p v) xs)

      prune p v (p', dom)
          | sameGroup p p'    = (p', delete v dom)
          | otherwise         = (p', dom)


parse :: [String] -> [(Position, [Int])]
----------------------------------------
parse = concatMap (uncurry parseRow) . zip [0..]
    where
      parseRow :: Int -> String -> [(Position, [Int])]
      parseRow y = map (uncurry $ parseCell y) . zip [0..]

      parseCell :: Int -> Int -> Char -> (Position, [Int])
      parseCell y x c = (Position (x, y), parseChar c)

      parseChar :: Char -> [Int]
      parseChar '.' = [1..9]
      parseChar n   = [read [n]]


formatSolution :: [(Position, Int)] -> String
---------------------------------------------
formatSolution ps = concat [ concat [ show . fromJust $ lookup (Position (x, y)) ps | x <- [0..8] ] ++ "\n"
                           | y <- [0..8] ]

                      
main :: IO ()
-------------
main = do ss <- (parse . lines) `fmap` getContents
          let solution = solve ss
          putStrLn $ formatSolution solution

                  

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemsControl2D
{
    public class Position
    {
        public Position(int x, int y)
        {
            this.X = x;
            this.Y = y;
        }

        public int X { get; }

        public int Y { get; }
    }

    public class Grid<T>
    {
        private readonly T[,] _items;

        public Grid(int width, int height, Func<Position, T> initializer)
        {
            this._items = new T[width, height];

            for ( var x = 0; x != width; ++x )
            {
                for (var y = 0; y != height; ++y)
                {
                    var position = new Position(x, y);
                    this._items[x, y] = initializer(position);
                }
            }
        }

        public int Width => _items.GetLength(0);

        public int Height => _items.GetLength(1);

        public T this[Position position] => _items[position.X, position.Y];

        public IEnumerable<Row<T>> Rows => Enumerable.Range(0, Height).Select(y => new Row<T>(this, y));
    }

    public class Row<T>
    {
        private readonly Grid<T> _parent;

        private readonly int _rowIndex;

        public Row(Grid<T> parent, int rowIndex)
        {
            this._parent = parent;
            this._rowIndex = rowIndex;
        }

        public IEnumerable<T> Items => Enumerable.Range(0, _parent.Width).Select(x => _parent[new Position(x, _rowIndex)]);
    }
}

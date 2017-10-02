using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ItemsControl
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            // Set ItemsControl's ItemsSource property
            this.peopleView.ItemsSource = People;
        }

        public IEnumerable<Person> People
        {
            get
            {
                yield return new Person() { Name = "John", Age = 19, IsMale=true };
                yield return new Person() { Name = "Ann", Age = 18, IsMale = false };
                yield return new Person() { Name = "Chris", Age = 21, IsMale = true };
            }
        }
    }

    public class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public bool IsMale { get; set; }
    }
}

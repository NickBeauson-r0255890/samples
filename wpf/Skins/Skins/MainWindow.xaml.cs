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

namespace Skins
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void SetRed(object sender, RoutedEventArgs e)
        {
            SetSkin("red");
        }

        private void SetGreen(object sender, RoutedEventArgs e)
        {
            SetSkin("green");
        }

        private void SetBlue(object sender, RoutedEventArgs e)
        {
            SetSkin("blue");
        }

        private void SetSkin(string name)
        {
            var resourceDictionary = new ResourceDictionary();
            var uri = $"Skins/{name}.xaml";
            resourceDictionary.MergedDictionaries.Add((ResourceDictionary)Application.LoadComponent(new Uri(uri, UriKind.Relative)));
            Application.Current.Resources = resourceDictionary;
        }
    }
}

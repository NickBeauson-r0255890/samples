using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
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
using System.Windows.Threading;

namespace Chronometer
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window, INotifyPropertyChanged
    {
        private TimeSpan accumulatedTime;

        private DateTime lastTick;

        private DispatcherTimer timer;

        public MainWindow()
        {
            InitializeComponent();

            this.DataContext = this;
            lastTick = DateTime.Now;
            timer = new DispatcherTimer(TimeSpan.FromMilliseconds(10), DispatcherPriority.Background, OnTimerTick, this.Dispatcher);
            timer.IsEnabled = false;
            this.Toggle = new EasyCommand(() => IsRunning = !IsRunning);
        }

        public TimeSpan Time
        {
            get
            {
                return accumulatedTime;
            }
            set
            {
                accumulatedTime = value;

                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Time)));
            }
        }

        public bool IsRunning
        {
            get
            {
                return timer.IsEnabled;
            }
            set
            {
                timer.IsEnabled = value;

                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(IsRunning)));
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        private void OnTimerTick(object sender, EventArgs args)
        {
            var now = DateTime.Now;
            Time += now - lastTick;
            lastTick = now;
        }

        public ICommand Toggle { get; }
    }
}

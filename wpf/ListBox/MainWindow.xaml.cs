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

namespace ListBox
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            var classroom = new ClassroomViewModel();
            classroom.Students.Add( new StudentViewModel { Name = "John", Id = "r1234567", IsMale = true } );
            classroom.Students.Add( new StudentViewModel { Name = "Gabriel", Id = "r1234568", IsMale = true } );
            classroom.Students.Add( new StudentViewModel { Name = "Sophie", Id = "r7654321", IsMale = false} );

            this.DataContext = classroom;
        }
    }

    /// <summary>
    /// Top level view model.
    /// </summary>
    public class ClassroomViewModel
    {
        public ClassroomViewModel()
        {
            this.Students = new List<StudentViewModel>();
            this.HandleStudent = new ActionCommand( PerformHandleStudent );
        }

        /// <summary>
        /// Students in classroom.
        /// </summary>
        public List<StudentViewModel> Students { get; }

        /// <summary>
        /// ListBox.SelectedItem is bound to this property.
        /// This property will automatically be set
        /// to be student selected in the ListBox.
        /// </summary>
        public StudentViewModel SelectedStudent { get; set; }

        /// <summary>
        /// Some command that is supposed to do something to the selected student.
        /// </summary>
        public ICommand HandleStudent { get; }

        private void PerformHandleStudent()
        {
            if ( SelectedStudent != null )
            {
                MessageBox.Show( $"{SelectedStudent.Name} has been handled" );
            }
            else
            {
                MessageBox.Show( "Selected a student first" );
            }
        }
    }

    /// <summary>
    /// Student VM. Normally it should fetch its data from the domain.
    /// </summary>
    public class StudentViewModel
    {
        public string Name { get; set; }
        
        public string Id { get; set; }

        public bool IsMale { get; set; }
    }

    /// <summary>
    /// Reusable command.
    /// </summary>
    public class ActionCommand : ICommand
    {
        private readonly Action action;

        public ActionCommand(Action action)
        {
            this.action = action;
        }

        public event EventHandler CanExecuteChanged { add { } remove { } }

        public bool CanExecute( object parameter )
        {
            return true;
        }

        public void Execute( object parameter )
        {
            action();
        }
    }
}

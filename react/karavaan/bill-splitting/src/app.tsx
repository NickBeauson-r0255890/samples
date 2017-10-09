import * as React from 'react';
import {render} from 'react-dom';
import './app.css';



class App extends React.Component<any, any>
{
    constructor(props : any)
    {
        super(props);
    }

    render()
    {
        return <p>Hello world!</p>;
    }
}

render(<App />, document.getElementById('app'));

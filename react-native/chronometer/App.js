import React from 'react';
import { StyleSheet, View, Button, Text, TouchableHighlight } from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import invariant from 'invariant'


export default class App extends React.Component {
    constructor(props)
    {
        super(props);

        // Set initial state. First initialization is done by assigning directly to this.state, don't use setState here (because at this point, the component has yet to be mounted)
        this.state = {accumulatedTime: 0};
    }

    setState(state)
    {
        super.setState(state);

        console.log(`Set state to ${JSON.stringify(state)}`);
    }
    
    render()
    {
        // Pick new button title
        const startPauseTitle = this.isRunning() ? "Pause" : "Start";
        
        // Format time
        const formattedAccumulatedTime = this.formatAccumulatedTime();

        return (
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.time}>{formattedAccumulatedTime}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableHighlight style={styles.button} onPress={() => this.onToggleStartStop()}>
                            <Text style={styles.buttonLabel}>{startPauseTitle}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button} onPress={() => this.onReset()}>
                            <Text style={styles.buttonLabel}>Reset</Text>
                        </TouchableHighlight>
                    </View> 
                </View>
        );
    }

    formatAccumulatedTime()
    {
        const timeInMilliseconds = this.state.accumulatedTime;
        
        // Compute milliseconds
        const milliseconds = Math.floor(timeInMilliseconds % 1000);
        const totalTimeInSeconds = Math.floor(timeInMilliseconds / 1000);

        // Compute seconds
        const seconds = Math.floor(totalTimeInSeconds % 60);
        const totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);

        // Compute minutes
        const minutes = Math.floor(totalTimeInMinutes % 60);
        const totalTimeInHours = Math.floor(totalTimeInMinutes / 60);

        // Compute hours
        const hours = totalTimeInHours;

        // Format values
        const hoursString = this.padWithZeros(hours.toString(), 2);
        const minutesString = this.padWithZeros(minutes.toString(), 2);
        const secondsString = this.padWithZeros(seconds.toString(), 2);
        const millisecondsString = this.padWithZeros(milliseconds.toString(), 3);

        return `${hoursString}:${minutesString}:${secondsString}.${millisecondsString}`;
    }

    padWithZeros(string, length)
    {
        return ("0".repeat(length) + string).slice(-length);
    }

    onReset()
    {
        this.onStop();
        this.setState( { accumulatedTime: 0 } );
    }

    isRunning()
    {
        const result = this.state.timerId;

        return result;
    }

    onToggleStartStop()
    {
        if ( this.isRunning() )
        {
            this.onStop();
        }
        else
        {
            this.onStart();
        }
    }

    onStart()
    {
        // Start timer and keep its id
        const timerId = this.setInterval(this.onTick, 50);

        // Get timestamp
        const lastTick = this.now();
        
        // Update state
        this.setState({ timerId, lastTick });
    }

    onStop()
    {
        // Stop timer ticks from arriving
        this.clearInterval(this.state.timerId);
        
        // Update timerId
        const state = { timerId: undefined };

        // Update state
        this.setState(state);

        // Collect time between now and last tick
        this.collectTime();
    }

    now()
    {
        return new Date().getTime();
    }

    collectTime()
    {
        // Compute time elapsed between last tick and now
        const now = this.now();
        const lastTick = this.state.lastTick;
        const elapsed = now - lastTick;
        const accumulatedTime = this.state.accumulatedTime + elapsed;

        // Update state
        this.setState({ accumulatedTime, lastTick: now });
    }

    onTick()
    {
        this.collectTime();
    }
}

reactMixin(App.prototype, TimerMixin);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'space-around',
    },
    textContainer: {
        flex: 10,
        backgroundColor: '#AAF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    button: {
        flex: 1,
        backgroundColor: '#AAA',
        margin: 5,
        justifyContent: 'center'
    },
    buttonLabel: {
        textAlign: 'center',
        fontSize: 20
    },
    time: {
        textAlign: 'center',
        fontSize: 50,
    },
});

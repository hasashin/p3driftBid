import {
  Box,
  Button,
  Header,
  Text,
} from "grommet";
import { Moon, Sun } from "grommet-icons";
import React from "react";
import { P3Operation } from "./p3utils";

function P3Header(props) {
    return (
        <Header background="brand" gridArea={ props.gridArea } pad="medium" round="small">
            <Text size="large">P3driftBid</Text>
            <Button
                a11yTitle={props.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                icon={props.dark ? <Moon /> : <Sun />}
                onClick={() => props.setDark(!props.dark)}
                tip={{
                    content: (
                    <Box
                        pad="small"
                        round="small"
                        background={props.dark ? "dark-1" : "light-3"}
                    >
                        {props.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </Box>
                    ),
                    plain: true,
                }}
                />
        </Header>
    );
}

class P3Counter extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            lastActionDate: props.lastActionDate,
            currentTime: new Date(),
            P3Operation: props.P3Operation,
            carName: props.carName
        };
      }

    tick() {
        this.setState(state => ({
            currentTime: new Date(),
            lastActionDate: state.lastActionDate,
            P3Operation: state.P3Operation
          }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        let timeDiff = (this.state.currentTime.getTime() - this.state.lastActionDate.getTime())/1000
        let years = Math.floor(timeDiff/31536000);
        let days = Math.floor((timeDiff-(years*31536000))/86400);
        let hours = Math.floor((timeDiff-(years*31536000)-(days*86400))/3600);
        let mins = Math.floor((timeDiff-(years*31536000)-(days*86400)-(hours*3600))/60);
        let secs = Math.floor(timeDiff-(years*31536000)-(days*86400)-(hours*3600)-(mins*60));

        return (
            <Box align="center" margin="medium">
                <Box margin="small">
                    <Text size="xlarge">{this.state.carName} jest { this.state.P3Operation === P3Operation.Working ? " sprawny " : this.state.P3Operation === P3Operation.Broken ? " zepsuty " : " undefined " } już</Text>
                </Box>
                <Box margin="small">
                    <Text size="xxlarge">
                        { years ? years : ""}
                            { years === 0 ? "" : years === 1 ? " rok " : years%10 >=2 && years%10 <=4 && (years > 15 || years < 10) ? " lata " : " lat " }
                        { days ? days : years ? days : "" } 
                            { days === 0 && years === 0 ? "" : days === 1 ? " dzień " : " dni " } 
                        { hours ? hours : days || years ? hours : "" } 
                            { hours === 0 && days === 0 && years === 0 ? "" : hours === 1 ? " godzinę " : hours%10 >=2 && hours%10 <=4 && (hours > 15 || hours < 10) ? " godziny " : " godzin " } 
                        { mins } 
                            { mins === 1 ? " minutę " : mins%10 >=2 && mins%10 <=4 && (mins > 15 || mins < 10) ? " minuty " : " minut " }  
                        { secs } 
                            { secs === 1 ? " sekundę " : secs%10 >=2 && secs%10 <=4 && (secs > 15 || secs < 10) ? " sekundy " : " sekund " }  
                    </Text>
                </Box>
            </Box>
        );
    }
}

export {
    P3Header,
    P3Counter,
}
import React, {useState} from "react";
import {
  Button,
  Grommet,
  grommet,
  Page,
  PageContent,
  PageHeader,
  Grid,
  Sidebar,
  Text,
  List,
} from "grommet";
import { deepMerge } from "grommet/utils";
import { P3Counter, P3Header } from "./p3/p3components";
import { P3Operation } from "./p3/p3utils";

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: "Lato",
      size: "18px",
      height: "20px",
    },
  },
});

let state = {
  P3DriftOperation: P3Operation.Broken,
  P3lastActionDate: new Date("2023-02-08 03:00:00"),
  P5SaabOperation: P3Operation.Broken,
  P5lastActionDate: new Date("2024-03-02 00:00:00"),
  E72Operation: P3Operation.Working,
  E72lastActionDate: new Date("2024-03-02 00:00:00"),
  P0WMNMWOperation: P3Operation.Working,
  P0WMNMWlastActionDate: new Date("2024-03-02 00:00:00"),
  loggedIn: false,
  user: {
    fullName: "Dominik Hażak"
  },
  showSidebar: false
}


function App() {
  const [dark, setDark] = useState(true);
  return (
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      <Page align="center">
        <Grid
          rows={['xsmall', '30vh']}
          columns={['small','xxlarge', 'small']}
          areas={[
            { name: 'header', start: [1, 0], end: [1, 0] },
            { name: 'main', start: [1, 1], end: [1, 1] },
            { name: 'side', start: [2, 0], end: [2, 1] },
          ]}
          
        >
          <P3Header gridArea='header' dark={ dark } setDark={ setDark }/>
          <PageContent gridArea='main'>
            <PageHeader
                title="P3 DRIFT status app"
                subtitle="Zobacz jak długo auta jeżdżą lub nie."
                // actions={ state.loggedIn ?
                //   <Button label={ state.user.fullName } primary /> :
                //   <Button label="Zaloguj się" primary />
                // }
              />
            <P3Counter lastActionDate={ state.P3lastActionDate } P3Operation={ state.P3DriftOperation } carName="P3Drift"/>
            <P3Counter lastActionDate={ state.P5lastActionDate } P3Operation={ state.P5SaabOperation } carName="P5Saab"/>
            <P3Counter lastActionDate={ state.E72lastActionDate } P3Operation={ state.E72Operation } carName="E72"/>
            <P3Counter lastActionDate={ state.P0WMNMWlastActionDate } P3Operation={ state.P0WMNMWOperation } carName="P0WMNMW"/>

          </PageContent>
          { state.showSidebar ? (
            <Sidebar 
            gridArea="side"
            align="center"
            round="small"
            header={
              <Text>Aktualne zakłady</Text>
            }
            footer={ state.loggedIn ?
              <Button label="Dodaj zakład"/> :
              <Button disabled label="Dodaj zakład"/>
            }
          >
            <List
              primaryKey="name"
              secondaryKey="percent"
              data={[
                { name: 'Alan', percent: 20 },
                { name: 'Bryan', percent: 30 },
                { name: 'Chris', percent: 40 },
                { name: 'Eric', percent: 80 },
              ]}
            />
          </Sidebar>
          ):
          (<div></div>)
          }
          
        </Grid>
      </Page>
    </Grommet>
  );
}

export default App;

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
  P3Operation: P3Operation.Broken,
  lastActionDate: new Date("2023-02-08 03:00:00"),
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
                title="P3 DRIFT bidder app"
                subtitle="Załóż się jak długo P3 DRIFT będzie jeżdzić"
                actions={ state.loggedIn ?
                  <Button label={ state.user.fullName } primary /> :
                  <Button label="Zaloguj się" primary />
                }
              />
            <P3Counter lastActionDate={ state.lastActionDate } P3Operation={ state.P3Operation }/>
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

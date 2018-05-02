import React from "react";
import { Paper, Tabs } from "material-ui";
import { Tab } from "material-ui/Tabs";

export default ({foodtypes, category, onSelect}) => {
  const index = category
    ? foodtypes.findIndex(group => group === category) + 1
    : 0

const onIndexSelect = (e, index) =>
  onSelect(index === 0 ? '' : foodtypes[index -1])

  <Paper>
    <Tabs
    value={index}
    onChange ={onIndexSelect}
    indicatorColor="primary"
    textColor="primary"
    centered
    >
      <Tab label= "All" />
      {foodtypes.map(group =>
        <Tab key = {group} label = {group} />
      )}
    </Tabs>
  </Paper>
}

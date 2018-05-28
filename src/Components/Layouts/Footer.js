import React from "react";
import { Paper, Tabs } from "material-ui";
import { Tab } from "material-ui/Tabs";

export default ({foodtypes}) => (
    <Paper>
        <Tabs value={0} 
            indicatorColor="primary" 
            textColor="primary" 
            centered
            >
                <Tab label= "All" />
                    {foodtypes.map(group =>
                        <Tab label = {group} />
                    )} 
        </Tabs>
    </Paper>
);

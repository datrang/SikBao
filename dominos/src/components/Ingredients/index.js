import React, {Fragment } from 'react';
import { Grid, Paper, Typography, List } from 'material-ui';
import {ListItem, ListItemText} from 'material-ui/List'
import LeftPane from './LeftPane'
import RightPane from './RightPane'



const styles = {
  Paper: { 
    padding: 20, 
    marginTop: 10, 
    marginBottom: 10, 
    height:500, 
    overflowY:'auto'
    }
};

export default ({ ingredients }) =>
  <Grid container>
    <Grid item sm>
      <Paper style={styles.Paper} >
        {ingredients.map(([group, ingredients]) =>
          <Fragment>
            <Typography
              variant="headline"
              style={{ textTransform: 'capitalize' }}
            >
              {group}
            </Typography>
            <List component="ul">
              {ingredients.map(({ title }) =>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              )}
            </List>
          </Fragment>
        )}
      </Paper>
    </Grid>
    <Grid item sm>
      <Paper style={styles.Paper} >
        <Typography
          variant="display1"
        >
          Welcome my dude!
        </Typography>
        <Typography
          variant="subheading"
          style={{ marginTop: 20 }}
        >
          Please input your ingredients on the left panel
        </Typography>
      </Paper>
    </Grid>
  </Grid>



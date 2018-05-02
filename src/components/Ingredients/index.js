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

export default ({
  ingredients,
  category,
  onSelect,
  ingredient:{id, title = "Welcome my dude!", description="Please input your ingredients on the left panel"} }) =>
  <Grid container>
    <Grid item sm>
      <Paper style={styles.Paper} >
        {ingredients.map(([group, ingredients]) =>
          !category || category === group
            ? <Fragment key ={group}>
                <Typography
                  variant="headline"
                  style={{ textTransform: 'capitalize' }}
                >
                  {group}
                </Typography>
                <List component="ul">
                  {ingredients.map(({ id, title }) =>
                    <ListItem
                    key= {id}
                    onClick= {() => onSelect(id)}
                    button>
                      <ListItemText
                      primary={title}
                      />
                    </ListItem>
                  )}
                </List>
              </Fragment>
            : null
        )}
      </Paper>
    </Grid>
    <Grid item sm>
      <Paper style={styles.Paper} >
        <Typography
          variant="display1"
        >
          {title}
        </Typography>
        <Typography
          variant="subheading"
          style={{ marginTop: 20 }}
        >
          {description}
        </Typography>
      </Paper>
    </Grid>
  </Grid>

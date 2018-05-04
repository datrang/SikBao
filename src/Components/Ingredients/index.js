import React, {Fragment } from 'react';
import { Grid, Paper, Typography, List } from 'material-ui';
import {ListItem, ListItemText} from 'material-ui/List'
import LeftPane from './LeftPane'
import RightPane from './RightPane'
import Button from "material-ui/Button"



const styles = {
  Paper: { 
    padding: 20, 
    marginTop: 10, 
    marginBottom: 10, 
    height:500, 
    overflowY:'auto'
    }
};

export default ({ ingredients, foods }) =>
  <Grid container>
    <Grid item sm>
            <Paper style={styles.Paper} >
                {ingredients.map(([group, ingredients]) =>
                    <Fragment>
                        <Button>
                        <Typography 
              variant="headline"
                            style={{ textTransform: 'capitalize' }}
                        >{group}
                        </Typography>
                            </Button>
            <List component="ul">
                            {ingredients.map(({ id }) =>
                                <ListItem button>
                                    <ListItemText primary={id} id={id} />
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
        <ul>
                    {foods.map((foods) => <li>{foods}</li>)}
                        </ul>
      </Paper>
    </Grid>
  </Grid>



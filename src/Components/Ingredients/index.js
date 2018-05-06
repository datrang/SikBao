import React, {Fragment } from 'react';
import { Grid, Paper, Typography, List } from 'material-ui';
import { ListItem, ListItemText } from 'material-ui/List';
import Button from "material-ui/Button";
import Checkbox from 'material-ui/Checkbox';


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
    onSelect,
    foods
    }) =>
  <Grid container>
    <Grid item sm>
            <Paper style={styles.Paper} >
                {ingredients.map(([group, ingredients]) =>
                    <Fragment>
                        <Button>
                        <Typography 
              variant="headline"
                            style={{ textTransform: 'capitalize', textTransform: 'bold' }}
                        >{group}
                        </Typography>
                            </Button>
            <List component="ul">
                            {ingredients.map(({ id, name }) =>
                                <ListItem button>
                                    <ListItemText
                                        primary={name}
                                        onClick={() => onSelect(id)} />
                                </ListItem>
                            )}
            </List>
          </Fragment>
        )}
      </Paper>
    </Grid>
    <Grid item sm>
            <Paper style={styles.Paper} >
                {foods ?
                    <Typography
                        variant="display1"
                    >
                        Ingredients Selected:
                </Typography>
                :
                    <Typography
                        variant="display1"
                    >
                        Welcome my dude!
                </Typography>
                    }
      </Paper>
    </Grid>
  </Grid>



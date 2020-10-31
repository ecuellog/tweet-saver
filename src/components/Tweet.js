import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  userContainer: {
    display: 'flex'
  },
  username: {
    margin: '0 0 0 5px'
  },
  tweet: {
    textAlign: 'left'
  }
});

function Tweet(props) {
  const classes = useStyles();

  return (
    <Draggable
      draggableId={props.tweet.id}
      index={props.index}
    >
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          variant="outlined"
          className={props.className}
        >
          <CardContent>
            <div className={classes.userContainer}>
              <Typography gutterBottom>
                {props.tweet.author.name}
              </Typography>
              <Typography className={classes.username} color="textSecondary" gutterBottom>
                @{props.tweet.author.username}
              </Typography>
            </div>
            <p className={classes.tweet}>{props.tweet.text}</p>
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}

export default Tweet;
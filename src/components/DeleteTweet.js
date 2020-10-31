import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  deleteDrop: {
    border: 'solid 1px #0000001f',
    borderRadius: '10px',
    marginBottom: '20px',
    backgroundImage: 'url(garbage.png)',
    backgroundSize: 'cover'
  },
  deleteDropText: {
    margin: 'auto',
    padding: '50px'
  },
});

function DeleteTweet(props) {
  const classes = useStyles();

  return (
    <div className={classes.deleteDrop} ref={props.innerRef}>
      <h5 className={classes.deleteDropText}>Drag saved here to delete</h5>
    </div>
  )
}

export default DeleteTweet;
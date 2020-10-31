import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tweet from './Tweet';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'ghostwhite',
    borderRadius: '10px',
    overflowY: 'scroll',
    padding: '0 10px'
  },
  tweet: {
    margin: '10px 0'
  }
});

function TweetList(props) {
  const classes = useStyles();

  return (
    <div ref={props.innerRef} className={props.className + ' ' + classes.root}>
      {props.tweets.map((tweet, index) => (
        <Tweet
          className={classes.tweet}
          key={tweet.id}
          tweet={tweet}
          index={index}
        ></Tweet>
      ))}
      {props.placeholder}
    </div>
  )
}

export default TweetList;
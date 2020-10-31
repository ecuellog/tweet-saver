import './App.css';
import TwitterService from './services/TwitterService';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TweetList from './components/TweetList';
import { makeStyles } from '@material-ui/core/styles';
import keyBy from 'lodash/keyBy';
import Tweet from './components/Tweet';
import DeleteTweet from './components/DeleteTweet';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Card, Container, Divider } from '@material-ui/core';

const useStyles = makeStyles({
  searchContainer: {
    display: 'flex',
    marginBottom: '8px'
  },
  searchInput: {
    flexGrow: '1',
    marginLeft: '15px'
  },
  titleBreak: {
    marginBottom: '15px',
    borderTop: 'solid 1px #0000001f'
  },
  tweetSaverContainer: {
    height: 'calc(100vh - 100px)'
  },
  tweetListContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  tweetList: {
    flexGrow: 1
  },
  middleGridContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

function App() {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState('');
  const [tweets, setTweets] = useState([]);
  const [savedTweets, setSavedTweets] = useState([]);

  useEffect(() => {
    let savedInLocal = localStorage.getItem('tweets');

    if(savedInLocal) setSavedTweets(JSON.parse(savedInLocal));
  }, [])

  useEffect(() => {
    localStorage.setItem('tweets', JSON.stringify(savedTweets));
  }, [savedTweets])

  function onSubmitSearch(e) {
    e.preventDefault();
    TwitterService.search(searchInput)
      .then((res) => {
        console.log(res);
        setSearchInput('');

        // Populate author for each tweet
        let searchTweets = [];
        if(res.data.data) {
          let users = keyBy(res.data.includes.users, (obj) => obj.id);
          searchTweets = res.data.data.map((tweet) => (
            {
              ...tweet,
              author: users[tweet.author_id]
            }
          ))
        }

        setTweets(searchTweets);
        console.log(searchTweets);
      })
  }

  function onDragEnd(result) {
    const { destination, source, draggableId} = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId ||
      destination.droppableId === 'searched'
    ) return;

    // Tweet being deleted
    if(
      destination.droppableId === 'delete' &&
      source.droppableId === 'saved'
    ) {
      let newSaved = [...savedTweets];
      newSaved.splice(source.index, 1);
      setSavedTweets(newSaved);
      return;
    }

    // Saving a tweet
    let tweetToSave = [...tweets].splice(source.index, 1);
    let newSaved = [...savedTweets];
    newSaved.splice(destination.index, 0, tweetToSave[0]);
    setSavedTweets(newSaved);
  }

  return (
    <div className="App">
      <Container maxWidth="lg">
        <h2> Tweet Saver </h2>
        <hr className={classes.titleBreak} />
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <Grid container spacing={3} className={classes.tweetSaverContainer}>
            <Grid item xs={5} className={classes.tweetListContainer}>
              <form onSubmit={(e) => onSubmitSearch(e)}>
                <Card className={classes.searchContainer} variant="outlined">
                  <InputBase
                    placeholder="Search Tweets"
                    inputProps={{ 'aria-label': 'search tweets' }}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className={classes.searchInput}
                  />
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Card>
              </form>
              <Droppable droppableId="searched">
                {(provided) => (
                  <TweetList 
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                    placeholder={provided.placeholder}
                    tweets={tweets}
                    className={classes.tweetList}
                  ></TweetList>
                )}
              </Droppable>
            </Grid>
            <Grid xs={2} className={classes.middleGridContainer}>
              <Droppable droppableId="delete">
                {(provided) => (
                  <DeleteTweet
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                    placeholder={provided.placeholder}
                  ></DeleteTweet>
                )}
              </Droppable>
              <div>
                <h4>Drag tweets to save</h4>
                --&gt;
              </div>
            </Grid>
            <Grid item xs={5} className={classes.tweetListContainer}>
              <h5>Saved Tweets</h5>
              <Droppable droppableId="saved">
                {(provided) => (
                  <TweetList
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                    placeholder={provided.placeholder}
                    tweets={savedTweets}
                    className={classes.tweetList}
                  ></TweetList>
                )}
              </Droppable>
            </Grid>
          </Grid>
        </DragDropContext>
      </Container>

    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap/'
import '../lamp.css'
import { Lamp } from '../Components/lamp'


export const Home = ({changeBackground, light, color}) => {

    const [ position, setPosition ] = useState(0);
    const [ delay, setDelay] = useState(1000)
    const [ lyrics, setLyrics ] = useState(['hi']);
    useEffect(() => {
        if(position === lyrics.length){ // checks to see if the race is completed if so resets the states to original
            setDelay(null)
            setNewRace(false)
            setStartRace(false)
            setRaceCompleted(true)
        }
    },[position, lyrics])
    const [ wordCount, setWordCount] = useState(0);
    const [ startRace, setStartRace ] = useState(false);
    const [ timer, setTimer ] = useState(0);
    useInterval(() => {
        if(startRace){ // sets a timer when the user selects a song
            setTimer(timer + 1);
        };
    }, delay);
    const [ newRace, setNewRace ] = useState(false);
    const [ input, setInput ] = useState('');
    const [ artist, setArtist ] = useState('');
    const [ track, setTrack ] = useState('');
    const [ raceCompleted, setRaceCompleted] = useState(false);
    const [ error, setError] = useState(false)
    const [ word, setWord ] = useState(0)
    const [ typedArr, setTypedArr ] = useState([])
    const typingInput = useRef(null)

    const handleInput = (e) => {
        setInput(e.target.value);
        let currentWord = lyrics[position].split(' ')[word]
        if (input === currentWord) { // checks to see if users input matches the word at lyrics[position] first line word
            document.getElementsByClassName('word-2-type')[0].className = 'good' // if it matches we change previous word to 'good' to run animation
            window.scrollTo(0, document.body.scrollHeight); // I scroll down and move the position to the next word and adjust wpm
            setWord(word + 1);
            setTypedArr([...typedArr, currentWord])
            setWordCount(wordCount + 1);
            setInput('');
        };
    };

    if (word === lyrics[position]?.split(' ').length) { // if user gets to the end of the line, then i reset 'good' to 'word-2-type' and give user next line
        Array.from(document.getElementsByClassName('good')).forEach(span => span.className = 'word-2-type')
        setPosition(position + 1);
        setTypedArr([...typedArr, '( ._.)']) // add's in face, so that i know where to break ( for a new line )
        setWord(0);
    };

    const renderLines = () => { // takes the typed array, and render them to the page
        return typedArr.map(word => {
            if (word === '( ._.)') return <br></br> // if there's a face then I break to the next line. couldn't figure out a better way to do this other than a conditional
            return <span className='slide-in-word'>{word}</span>
        })
    }
    


    const handleChange = (e) => { // takes in users choice of song and artist
        e.target.name === 'artist' ? setArtist(e.target.value) : setTrack(e.target.value);
    }

    const handleSubmit = (e) => { // fetches what the user selects to type
        e.preventDefault()
        fetch(`https://api.lyrics.ovh/v1/${artist}/${track}`)
        .then(resp => resp.json())
        .then(data => {
            if(data.lyrics === ""){ // if api returns nothing render an error
                setError(true)
                return
            };
            const splitLyrics = data.lyrics.split(/\r?\n/).map(line => line.trim()).filter(line => line !== ""); // clean up the lyrics so they are presentable
            setLyrics(splitLyrics);
            setNewRace(false);
            setStartRace(true);
            setDelay(1000); // the race begins
            setError(false)
            typingInput.current.focus()
        })
    }

    const getPoem = () => {
        fetch('https://www.poemist.com/api/v1/randompoems')
        .then(resp => resp.json())
        .then(data => {
            const splitLines = data[0].content.split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");
            setLyrics (splitLines)
            setNewRace(false);
            setStartRace(true);
            setDelay(1000); // the race begins
            setError(false)
            typingInput.current.focus()
        })
    }


    const reset = () => { // resets all of the hooks for a new race
        setPosition(0);
        setWordCount(0);
        setTimer(0);
        setInput('');
        setArtist('');
        setTrack('');
        setNewRace(false);
        setLyrics(['hi']);
        setStartRace(false);
        setRaceCompleted(false);
        setTypedArr([])
    }


    let wpm = Math.round((wordCount / timer) * 60) || "";
    
    return(
        <>
        <Lamp changeBackground={changeBackground} light={light}/>
        <div className='prev-words'>{renderLines()}</div>
            { startRace ?
            <>
            <div style={{height: '200px'}}></div>
            <div className='input-container'>
                <div className='words-to-type'>{ lyrics[position] ? lyrics[position].split(' ').map(word => <span className='word-2-type'>{word}</span>) : null}</div>
                <div className='words-to-show'>{ lyrics[position] ? lyrics[position + 1] : null} </div>
                <Form className='typing-input'>
                    <Form.Control ref={typingInput} style={{width:'700px', marginLeft: '-116px', fontSize: '2rem', fontWeight: '600' }} size='lg' type='text' onChange={handleInput} value={input}/>
                </Form>
            </div>
                <div className='wpm-corner'>{wpm}</div>
            </>
                : newRace ?
                <div className='race-btns'> 
                <Form className='song-form' onSubmit={handleSubmit}>
                    <Form.Control size='lg' onChange={handleChange} placeholder="Artist" type='text' value={artist} name='artist'/>
                    <Form.Control size='lg' onChange={handleChange} placeholder="Track" type='text' value={track} name='track'/>
                    <Button style={color} variant='dark' size='lg' type='submit'>Start</Button>
                    { error ? <div className='error'>Oops, I either don't know this song, or this song doesn't exist. Please try again.</div> : null } 
                </Form>
                <Button className='poem-btn' style={color} size='lg' variant='dark' onClick={getPoem}>Get Random Poem</Button> 
                </div>
                    : raceCompleted ?
                    <div className='final-words'>Nice, you just wrote out the song {track} by {artist} in {wpm} words per minute!<br></br> <Button size='lg' variant='dark' style={color} onClick={reset}>reset</Button></div>
                        : <div className='race-btn'><Button style={color} size='lg' variant='dark' onClick={() => setNewRace(true)}>Start a new Race</Button>
                        {/* <Button style={color} size='lg' variant='dark'>Tutorial</Button> */}
                        </div>
            }
        </>
    )
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
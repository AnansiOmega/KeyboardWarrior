import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap/'
import '../lamp.css'
import { Lamp } from '../Components/lamp'


export const Home = ({changeBackground, light, color}) => {

    const [ position, setPosition ] = useState(0);
    const [ delay, setDelay] = useState(1000)
    const [ lyrics, setLyrics ] = useState(['hi']);
    useEffect(() => {
        if(position === lyrics.length){
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
        if(startRace){
            setTimer(timer + 1);
        };
    }, delay);
    const [ newRace, setNewRace ] = useState(false);
    const [ input, setInput ] = useState('');
    const [ artist, setArtist ] = useState('');
    const [ track, setTrack ] = useState('');
    const [ raceCompleted, setRaceCompleted] = useState(false);
    const [ error, setError] = useState(false)
    

    const handleInput = (e) => {
        setInput(e.target.value);
        if( input ===  lyrics[position] ){
            setWordCount((prev) => prev += lyrics[position].split(' ').length);
            setPosition(position + 1);
            setInput('');
        };
    }

    const handleChange = (e) => {
        e.target.name === 'artist' ? setArtist(e.target.value) : setTrack(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://api.lyrics.ovh/v1/${artist}/${track}`)
        .then(resp => resp.json())
        .then(data => {
            if(data.lyrics === ""){
                setError(true)
                return
            };
            const splitLyrics = data.lyrics.split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");
            setLyrics(splitLyrics);
            setNewRace(false);
            setStartRace(true);
            setDelay(1000);
            setError(false)
        })
    }

    const reset = () => {
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
    }

    const renderLines = () => {
        let typedArray = []
        lyrics.map((line, i) => {
            if(position > i){
                return typedArray.push(line)
            }
        })

    return typedArray.map((line,i) => {
        let name = i % 2 === 0 ? 'typed-line-right' : 'typed-line-left'
        return <div className={name}>{line}</div>
    })
    }
    

    let wpm = Math.round((wordCount / timer) * 60) || "";
    return(
        <>
        <Lamp changeBackground={changeBackground} light={light}/>
        <div className='prev-words'>{renderLines()}</div>
            { startRace ?
            <>
                <div className='words-to-type'>{lyrics[position]}</div>
                <Form className='typing-input'>
                    <Form.Control style={{width:'700px', marginLeft: '-116px'}} size='lg' type='text' onChange={handleInput} value={input}/>
                </Form>
                <div className='wpm'>{wpm}</div>
                <div className='wpm-corner'>{wpm}</div>
            </>
                : newRace ?
                <Form className='song-form' onSubmit={handleSubmit}>
                    <Form.Control size='lg' onChange={handleChange} placeholder="Artist" type='text' value={artist} name='artist'/>
                    <Form.Control size='lg' onChange={handleChange} placeholder="Track" type='text' value={track} name='track'/>
                    <Button style={color} variant='dark' size='lg' type='submit'>Start</Button>
                    { error ? <div className='error'>Oops, I either don't know this song, or this song doesn't exist. Please try again.</div> : null } 
                </Form>
                    : raceCompleted ?
                    <div className='final-words'> Nice, you just wrote out the song {track} by {artist} in {wpm} words per minute!<br></br> <Button size='lg' variant='dark' style={color} onClick={reset}>reset</Button></div>
                        : <div className='race-btn'><Button style={color} size='lg' variant='dark' onClick={() => setNewRace(true)}>Start a new Race</Button></div>
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
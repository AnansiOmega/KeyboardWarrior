import React, { useState, useEffect, useRef } from 'react';

export const Home = () => {
    
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
    

    const handleInput = (e) => {
        setInput(e.target.value);
        if( input === lyrics[position] ){
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
                return
            };
            const splitLyrics = data.lyrics.split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");
            setLyrics(splitLyrics);
            setNewRace(false);
            setStartRace(true);
            setDelay(1000);
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

    // const renderLines = () => {
    //     lyrics.map((line, i) => {
    //         if(position < i){
    //             return <div>{line}</div>
    //         }
    //     })
    // }
    // renderLines()

    let wpm = Math.round((wordCount / timer) * 60) || "";
    return(
        <>
            <div>{wpm}</div>
            { startRace ?
                <form>
                    {/* {renderLines()} */}
                    <div>{lyrics[position]}</div>
                    <input type='text' onChange={handleInput} value={input}></input>
                </form>
                : newRace ?
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} placeholder="Artist" type='text' value={artist} name='artist'></input>
                        <input onChange={handleChange} placeholder="Track" type='text' value={track} name='track'></input>
                        <input type='submit'></input>
                    </form>
                    : raceCompleted ?
                    <div> Nice, you just wrote out the song {track} by {artist} in {wpm} words per minute! <button onClick={reset}>reset</button></div>
                        : <button onClick={() => setNewRace(true)}>Start a new Race</button> 
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
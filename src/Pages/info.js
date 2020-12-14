import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap/'


export const Info = ({color}) => {
    return (
        <>
        <div className='info'>
            <h2>How to play</h2>
            <p>The idea of the game is quite simple, All you need to do is input an Artist and a Track.
                If it exists (or if I have it) you will begin your race! Once you finished typing a line
                just hit 'space' and then the next line will appear. Boom done ezpz. Also, those number popping
                up on the bottom of the screen in the lightbulb are your Words Per Minute. So type fast! And remember
                this isn't about having fun. It's about getting good. ;)
            </p>
        </div>
        <div className='page-btn'>
            <Link to='/home'>
            <Button style={color} size='lg' variant='dark'>Next page</Button>
            </Link>
        </div>
        <p className='questions'>Comments, concerns, compliments, criticisms, or any word that starts with 'C' can Tweet me <a href='https://twitter.com/IgnasButautas'>here.</a> Also, if you're lovin' that light you can check out Hornebom's creation <a href='https://codepen.io/Hornebom/pen/clDsr'>here</a></p>
        </>
    )

}


import React, { useState, useEffect } from 'react'


export const Lamp = ({changeBackground, light}) => {

    let bulb = {
        background:'rgb(255, 255, 255, 1)',
        boxShadow:'4px 4px 20px rgba(255,255,255, .8)',
        content:'',
        top:'5rem',
        left:"-1.5rem",
        width:'3.9rem',
        height:'3.9rem',
        borderRadius:'50%',
        border:'.2rem solid rgba(255,255,255,0.05)',
        position: 'absolute',
    }

    return(
        <div id="lamp" onChange={changeBackground}>
                <input type="radio" name="switch" value="on" />
                <input type="radio" name="switch" value="off" />
                <label htmlFor="switch" className="entypo-lamp"></label>
                <div className="lamp">
                    {light ? <div style={bulb}></div> : null }
                    <div className="gonna-give-light"></div>
                </div>
            </div>
    )
}
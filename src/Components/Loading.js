import React, { Component } from 'react'
import loading from '../loadingGif.gif';

export default class Loading extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={loading} alt='Loading spinning' height="50px" width="50px"></img>
            </div>
        )
    }
}

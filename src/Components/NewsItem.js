import React, { Component } from 'react'

export class NewsItem extends Component {
   
    render() {
        let { title, description, imgUrl, newsUrl } = this.props;
        return (
            <div>
                <div className="card">
                    <img src={!imgUrl ? "https://timesofindia.indiatimes.com/thumb/msid-98398859,width-1200,height-900,resizemode-4/98398859.jpg" : imgUrl} className="card-img-top" alt="network issue" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" className="btn btn-dark" rel="noreferrer">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
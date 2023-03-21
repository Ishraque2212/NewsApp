import React, { Component } from 'react';
import Loading from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super();
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: false
        };
    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=15f68744529340028ecac6618d84cb9e&page=${this.state.page}&pageSize=6`;
        const data = await fetch(url);
        this.props.setProgress(30)
        const parsedData = await data.json();
        this.props.setProgress(70)
        this.setState(
            {
                articles: parsedData.articles,
                totalResults: parsedData.totalResults
            }
        );
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews();
    }


    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=15f68744529340028ecac6618d84cb9e&page=${this.state.page}&pageSize=6`;
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState(
            {
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            }
        );
    }



    // handlePrevClick = async () => {
    //     this.updateNews();
    //     this.setState({
    //         page: this.state.page - 1,
    //     });
    // };

    // handleNextClick = async () => {
    //     if (this.state.page + 1 > Math.ceil(this.state.totalResults / 6)) {

    //     }
    //     else {
    //         this.updateNews();
    //         this.setState({
    //             page: this.state.page + 1,
    //         });
    //     }

    // }


    render() {
        return (
            <div>
                <div className='container my-3'>
                    <h2>Top Headlines</h2>
                    {this.state.loading && <Loading />}

                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length < this.state.totalResults}
                        loader={<Loading />}
                    >
                        <div className='container'>
                            <div className='row'>
                                {
                                    this.state.articles.map((element) => {
                                        return <div className='col-md-4 my-4' key={element.url}>
                                            <NewsItem title={element.title ? element.title.slice(0, 100) : ""}
                                                description={element.description ? element.description.slice(0, 100) : ""}
                                                innerHeight={500} width={500}
                                                imgUrl={element.urlToImage}
                                                newsUrl={element.url} />
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </InfiniteScroll>


                    {/* Buttons */}
                    {/* <div className="container d-flex justify-content-between">
                        <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 12)} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                    </div> */}

                </div>
            </div>
        )
    }
};


export default News;






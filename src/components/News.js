import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            articles:[],
            loading:false,
            page:1,
            pageSize:this.props.pageSize,
            setProgress:this.props.setProgress
        }
        document.title = `News-WebApp ${this.props.category}`
    }
    async componentDidMount(){
        this.state.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8508444b11544677a35d1080bf06d618&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        this.setState({loading:true })
        this.state.setProgress(30)
        let data = await fetch(url);
        // this.state.setProgress(50)
        let parseData = await data.json()
        this.state.setProgress(60)
        this.setState({loading:false })
        this.props.setProgress(100)
        this.setState({
            articles:parseData.articles,
            totalResults:parseData.totalResults
        })
    }
    fetchMoreData = async ()=>{
        this.setState({page:this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8508444b11544677a35d1080bf06d618&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        // this.setState({loading:true })
        let data = await fetch(url);
        let parseData = await data.json()
        // this.setState({loading:false })
        this.setState({
            articles:this.state.articles.concat(parseData.articles),
            totalResults:parseData.totalResults
        })
    }
    
  render() {
    return (
      <div className='my-5 pt-5'>
        <h2 style={{textTransform:"capitalize"}} className='text-center'>News-WebApp - Top {this.props.category} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.articles.length > this.state.totalResults ?"":<Spinner/>}
        >
        <div className="container">
        <div className="row">
            {this.state.articles.map((element)=>{
                return (
                    <div key={element.url} className="col-md-4 my-2 col-sm-2">
                        <NewsItem title={element.title?element.title.slice(0,40):""} author={element.author?element.author:"unknown"} date={element.publishedAt} source={element.source.name} description={element.description?element.description.slice(0,85):""} imageUrl={element.urlToImage?element.urlToImage:"https://cdn.24.co.za/files/Cms/General/d/3076/80ef6c8e43fc47879552e325c87828c6.jpg"} newsUrl={element.url}/>
                    </div>
                )
            })}
        </div>
        </div>
        </InfiniteScroll>
        
      </div>
    )
  }
}

News.defaultProps = {
    country:"in",
    pageSize:8,
    category:"general"
  }
  
News.propTypes = {
    country:PropTypes.string
  }
export default News

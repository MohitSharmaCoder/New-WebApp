import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
    let {title, description, imageUrl, newsUrl,author,date,source} = this.props
    return (
      <div>
        <div className="card" style={{width:"100%"}}>
        <img src={imageUrl} className="card-img-top" alt="..." style={{height:"200px",objectFit:"cover"}}/>
        <div className="card-body">
        <span class=" start-50 translate-middle badge rounded-pill bg-danger" style={{top:'10px',position:"absolute"}}>
          {source}
        </span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text"><small class="text-body-secondary">By {author} on {(new Date(date)).toLocaleString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-danger" rel="noreferrer" target='_blank'>Read More</a>
        </div>
</div>
      </div>
    )
  }
}

export default NewsItem

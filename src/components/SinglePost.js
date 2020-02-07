import React from 'react'
import { Link } from 'react-router-dom'

import Content from '../components/Content'
import './SinglePost.css'

export default ({ fields, nextPostURL, prevPostURL }) => {
  const { title, date, body, categories = [] } = fields
  return (
    <article className="SinglePost section light">
      <div className="container skinny">
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
            {!!categories.length &&
              categories.map(obj => (
                <span key={obj.category} className="SinglePost--Meta--Category">
                  {obj.category}
                </span>
              ))}
            {date && (
              <span className="SinglePost--Meta--Date">
                {date}
              </span>
            )}
          </div>

          {title && <h1 className="SinglePost--Title">{title}</h1>}

          <div className="SinglePost--InnerContent">
            <Content source={body} />
          </div>

          <div className="SinglePost--Pagination">
            {prevPostURL && (
              <Link
                className="SinglePost--Pagination--Link prev"
                to={prevPostURL}
              >
                Previous Post
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={nextPostURL}
              >
                Next Post
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

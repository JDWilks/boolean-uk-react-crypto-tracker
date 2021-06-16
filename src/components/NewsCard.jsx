import { useState } from "react";

function NewsLink({ url }) {
  return (
    <a href={url} target="_blank">
      {url}
    </a>
  );
}

export default function NewsCard({ newsItem: { description } }) {
  return (
    <li>
      <article className="newsfeed__card">
        <p>
          {description
            .split(/(https?:\/\/.*\b\/?)/g)
            .map((match, index) =>
              /https?/.test(match) ? (
                <NewsLink key={index} url={match} />
              ) : (
                match
              )
            )}
        </p>
      </article>
    </li>
  );
}

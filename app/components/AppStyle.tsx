import * as React from 'react';

export const AppStyle = () => (
  <style>
    {`
      body {
        margin: 0;
        font-family: Verdana, Geneva, sans-serif;
      }

      .layout {
        background-color: whitesmoke;
      }

      Header {
        background-color: #ff6600;
        padding: 0.3em 1.5em;
      }

      Header a {
        color: #000;
        text-decoration: none;
        font-size: 14px;
      }

      @media (min-width: 751px) {
        .layout {
          min-width: 750px;
          width: 80%;
          margin: 0 auto;
        }
      }

      .menu-active {
        font-weight: bold;
      }

      ol.item-list {
        list-style-type: none;
        padding: 0 1em;
      }

      ol.item-list li {
        color: #60554f;
        font-size: 14px;
      }

      .list-item-row {
        margin-top: 0.5em;
        display: flex;
        align-items: flex-start;
      }

      .list-item-index {
        flex: 0 0 30px;
        font-size: 20px;
        text-align: right;
      }

      .list-item-spacer {
        flex: 0 0 10px;
      }

      a.list-item-title, a.item-title {
        color: #222;
        text-decoration: none;
        font-size: 14px;
      }

      .list-item-domain {
        margin-left: 0.5em;
        font-size: 12px;
      }

      .list-item-meta a, .list-item-domain a {
        color: #60554f;
        text-decoration: none;
      }

      .list-item-meta a:hover, .list-item-domain a:hover, .item-meta a:hover, .comment-meta a:hover {
        text-decoration: underline;
      }

      .list-item-meta {
        color: #60554f;
        font-size: 12px;
        margin: 5px 0;
      }

      .pagination {
        display: flex;
        justify-content: space-between;
        padding: 1em;
        border-top: 1px dotted black;
      }

      .pagination a, .pagination span.page {
        flex: 1;
      }

      .pagination span {
        text-align: center;
      }

      .pagination span.disabled {
        color: #999;
      }

      a.next {
        text-align: right;
      }

      .pagination a {
        color: #222;
        text-decoration: none;
        margin-bottom: 1em;
      }

      .profile {
        padding: 1.5em;
        color: #60554f;
        font-size: 14px;
      }

      .item-page {
        margin: 1.5em;
      }

      .item-title {
        font-size: 12px;
      }

      .item-title-text {
        margin-top: 0.5em;
        color: #222;
        font-size: 12px;
      }

      .comment-container {
        font-size: 12px;
        color: #222;
      }

      .comment-meta {
        margin-top: 1em;                
      }

      .comment-meta a {
        color: #60554f;
        text-decoration: none;
        font-size: 11px;
      }

      .comment {
        margin-top: 0.5em;
      }

      .comment a {
        color: #222;
      }

      .comment a, .comment pre {
        word-wrap: break-word;
        white-space: pre-wrap;
      }

      div[class^="cc-"] {
        margin-left: 12em;
      }

      .cc-0 {
        margin-left: 0em;
      }

      .cc-1 {
        margin-left: 2em;
      }

      .cc-2 {
        margin-left: 4em;
      }

      .cc-3 {
        margin-left: 6em;
      }

      .cc-4 {
        margin-left: 8em;
      }

      .cc-5 {
        margin-left: 10em;
      }

      .continue-thread {
        color: brown;
        font-style: italic;
      }

    `}
  </style>
)

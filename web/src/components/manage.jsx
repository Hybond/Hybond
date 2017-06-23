import React from 'react';

import config from '../config.js';

const site_url = config.site_url;

class Manage extends React.Component {
  render () {
    return (
      <div className='container manage'>
        <ProjectList />
      </div>
    );
  }
}

function ProjectList() {
  function Project() {
    return (
      <li>
        <div className='manage-list-left'>
          <a className='proj-name' href={site_url + '/codemoe/hybond/'}>Hybond</a>
          <span className='description'>A Magical Bond for Hybrid Developer</span>
        </div>
        <div className='manage-list-right'>
          <button className='manage-list-edit'><i className='material-icons'>edit</i></button>
          <button className='manage-list-delete'><i className='material-icons'>delete</i></button>
        </div>
        <div className='clearfix'></div>
      </li>
    );
  }

  return (
    <ul className='manage-list'>
      <Project />
      <Project />
      <Project />
      <Project />
      <p className='manage-page'>
        <button className='manage-page-btn'><i className='material-icons'>arrow_back</i></button>
        <span className='manage-page-num-current'><b>1</b></span><span className='manage-page-num-all'><b>5</b></span>
        <button className='manage-page-btn'><i className='material-icons'>arrow_forward</i></button>
      </p>
    </ul>
  );
}

export default Manage;

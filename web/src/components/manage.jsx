import React from 'react';

import config from '../config.js';

const site_url = config.site_url;

class Manage extends React.Component {
  render () {
    return (
      <div className='container manage'>
        <ul className='manage-list'>
          <Project />
          <Project />
          <Project />
          <Project />
        </ul>
        <p className='manage-page'>
          <div>
            <button className='manage-page-btn'><i className='material-icons'>arrow_back</i></button>
            <span className='manage-page-num'>1 <i>/</i> 5</span>
            <button className='manage-page-btn'><i className='material-icons'>arrow_forward</i></button>
          </div>
        </p>
      </div>
    );
  }
}

class Project extends React.Component {
  constructor () {
    super();
    this.toggleAlert = this.toggleAlert.bind(this);
    this.state = {
      isAlert: false,
    };
  }

  toggleAlert () {
    this.setState({isAlert: !this.state.isAlert});
  }

  render () {
    return (
      <li>
        <div className='manage-list-left'>
          <a className='proj-name' href={site_url + '/codemoe/hybond/'}>Hybond</a>
          <span className='description'>A Magical Bond for Hybrid Developer</span>
        </div>
        <div className='manage-list-right'>
          <button className='manage-list-edit'><i className='material-icons'>edit</i></button>
          <button className='manage-list-delete' onClick={this.toggleAlert}><i className='material-icons'>delete</i></button>
        </div>
        <div className='clearfix'></div>
        <ManageAlert isAlert={this.state.isAlert} toggleAlert={this.toggleAlert} />
      </li>
    );
  }
}

class ManageAlert extends React.Component {
  constructor () {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
      className: '',
    };
  }

  handleChange (event) {
    this.setState({value: event.target.value});
    if (event.target.value != '') {
      this.setState({className: 'have-content'});
    } else {
      this.setState({className: ''});
    }
  }

  render () {
    let tagClass = this.props.isAlert ? ' show' : '';
    return (
      <div className={'manage-alert' + tagClass}>
        <header>
          <h3><i className='material-icons'>warning</i> 危险操作</h3>
          <p className='description'>
            您确定要删除项目 <span className='proj-name'>Hybond</span> 吗？这一操作不可逆，请谨慎操作。<br />
            如果您确定要这么做，请输入项目名称（<span className='proj-name'>Hybond</span>）：
          </p>
          <button onClick={this.props.toggleAlert}><i className='material-icons'>close</i></button>
        </header>
        <div className='manage-alert-input'><input type='text' className={this.state.className} onChange={this.handleChange} value={this.state.value} /><span className='manage-alert-alt'>项目名称</span></div><br />
        <button onClick={this.props.toggleAlert}>取消</button><button className='manage-alert-delete'>永久删除</button>
        <div className='clearfix'></div>
      </div>
    );
  }
}

export default Manage;

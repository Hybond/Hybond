import React from 'react';

// The site's url
const site_url = 'http://hybond.code.moe'

class Base extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <MainPart />
        <Footer />
      </div>
    );
  }
}

function Header () {
  return (
    <header className='g'>
      <div className="container">
        <div className='top-row'>
          <a href={site_url}><div className='logo'></div></a>
          <HeaderUser></HeaderUser>
        </div>
      </div>
    </header>
  );
}

class HeaderUser extends React.Component {
  constructor () {
    super();
    this.state = {
      logState: false,
      avatar: null,
      nickname: null
    }
  }

  render () {
    return (
      <div className='float-right'>
        <a className='top-add' href='javascript: alert("todo!")'>+</a>
        <div className='user-info' onClick={() => this.setState({logState: !this.state.logState})}>{
          this.state.logState ? '已登录' : '未登录（点击测试切换状态）'
        }</div>
      </div>
    );
  }
}

class MainPart extends React.Component {
  render () {
    return (
      <main className='container c-wp'>
        <div className="container">
          <h1>test</h1>
        </div>
      </main>
    );
  }
}

function Footer() {
  return (
    <footer>
      Designed and built with all the love in China by @Dimpurr, @Dring and @rozc.<br />
      本项目源码受 <a href='https://github.com/Hybond/Hybond/blob/master/LICENSE'>MIT</a> 开源协议保护，文档受 <a href='https://creativecommons.org/licenses/by/3.0/'>CC BY 3.0</a> 开源协议保护。
    </footer>
  );
}

export default Base;

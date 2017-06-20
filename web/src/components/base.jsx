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
  constructor () {
    super();
    this.state = {
      title: '技术选型向导', // TODO: change this.
      isFlowChart: true
    };
  }

  render () {
    return (
      <main className='container c-wp'>
        <div className="container">
          <h1 className='big'>{this.state.title}</h1>
        </div>
        {this.state.isFlowChart ? <FlowChart /> : null}
      </main>
    );
  }
}

function Footer () {
  return (
    <footer className='container g'>
      <p><a href='https://github.com/Hybond/Hybond' target='_blank'>Github</a> · <a href={site_url + '/about'}>关于</a></p>
      Designed and built with all the love in China by @Dimpurr, @Dring and @rozc.<br />
      本项目源码受 <a href='https://github.com/Hybond/Hybond/blob/master/LICENSE' target='_blank'>MIT</a> 开源协议保护，文档受 <a href='https://creativecommons.org/licenses/by/3.0/' target='_blank'>CC BY 3.0</a> 开源协议保护。
    </footer>
  );
}

// ------ Flow chart ------ //

class FlowChart extends React.Component {
  componentDidMount () {
    var mySwiper = new Swiper ('.swiper-container', {
    loop: false,
    freeMode: true,
    mousewheelControl: true,
    pagination: '.swiper-pagination',
    paginationType: 'progress',
    slidesPerView: 'auto'
  })
  }

  render () {
    return (
      <div className='flow-chart swiper-container'>
        <div className='flow-chart-container swiper-wrapper'>
          <FlowSection name='后端语言' values={['Python', 'Node.js', 'PHP']} colors={['#8e24aa', '#8e24aa', '#8e24aa']} />
          <FlowSection name='前端库' values={['Vue.js', 'React', 'Foo']} colors={['#8e24aa', '#8e24aa', '#8e24aa']} />
          <FlowSection name='自动化' values={['Webpack', 'Goo']} colors={['#8e24aa', '#8e24aa', '#8e24aa']} />
          <FlowSection name='IDE 和生产' values={['Atom', 'Sublime Text', 'Windows 记事本', 'Vim', 'Emacs']} colors={['#8e24aa', '#8e24aa', '#8e24aa']} />
        </div>
        <div className="swiper-pagination"></div>
      </div>
    );
  }
}

function FlowSection (props) {
  let values = props.values.slice(), colors = props.colors.slice();
  function buildTags(){
    var tags = [];
    for(let i = 0; i < values.length; i++){
      tags.push(<Tags value={values[i]} color={colors[i]} />);
    }
    return tags;
  }
  function Tags (props) {
    return (<button className='flow-chart-tag'><div className='flow-chart-color' style={{backgroundColor: props.color}}></div>{props.value}</button>);
  }
  return (
    <section className='swiper-slide'>
      <span className='flow-chart-title'>{props.name}</span>
      {buildTags()}
    </section>
  );
}



// ------ Flow chart End ------ //

export default Base;

import React from 'react';
import Introduction from './introduction.jsx';
import Manage from './manage.jsx';
import Guide from './guide.jsx';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles, createStyleSheet, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';

import '../js/swiper.js';

import config from '../config.js';

// Just for development
// TODO: Delete and rewrite the config after development.
let devConfig = {
  flowChart: true,
  isBanner: false,
  defaultType: 'Guide',
}

// The site's url
const site_url = config.site_url;

class Base extends React.Component {
  constructor () {
    super();

    this.toIndex = this.toIndex.bind(this);
    this.toManage = this.toManage.bind(this);
    this.toGuide = this.toGuide.bind(this);
    this.toIntroduction = this.toIntroduction.bind(this);
    this.handleCloseError = this.handleCloseError.bind(this);


    // TODO: 删除测试功能
    let bannerType = '';
    if (location.search == '?error') {
      bannerType = 'error';
    }

    this.state = {
      isFlowChart: devConfig.flowChart,
      pageType: devConfig.defaultType, // The type of the page. Value = Introduction || Manage || Guide
      bannerType: bannerType,
    };
  }

  toManage () {
    this.setState({
      isFlowChart: false,
      pageType: 'Manage',
      bannerType: '',
    });
    history.pushState(null,'','?manage');
  }

  toGuide () {
    this.setState({
      isFlowChart: true,
      pageType: 'Guide',
      bannerType: '',
    });
    history.pushState(null,'','?guide');
  }

  toIndex () {
    this.setState({
      isFlowChart: true,
      pageType: 'Guide',
      bannerType: 'index',
    });
    history.pushState(null,'','?index');
  }

  toIntroduction () {
    this.setState({
      isFlowChart: true,
      pageType: 'Introduction',
      bannerType: '',
    });
    history.pushState(null,'','?introduction');
  }

  handleCloseError () {
    this.setState({
      bannerType: '',
    });
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Header
            bannerType={this.state.bannerType}
            toIndex={this.toIndex}
            toManage={this.toManage}
            toGuide={this.toGuide}
            handleCloseError={this.handleCloseError}
          />
          <MainPart isFlowChart={this.state.isFlowChart} pageType={this.state.pageType} toIntroduction={this.toIntroduction} />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

class Header extends React.Component {
  constructor (props) {
    super(props);
    this.toIndex = this.toIndex.bind(this);
  }

  toIndex (event) {
    this.props.toIndex();
    event.preventDefault();
  }

  render () {
    let bannerClass = this.props.bannerType ? ' banner' : '', bannerSection;
    if (this.props.bannerType == 'index') {
      bannerSection = (
        <div className='banner'>
          <h1>技术选型<br />新方式</h1>
          <p className='description'>用流程图和简单的选型向导进行前端技术选型，<br />并将选型结果分享给更多开发者。</p>
        </div>
      );
    }
    if (this.props.bannerType == 'error') {
      bannerSection = (
        <div className='error'>
          <div className='error-top-bar'>
            <div className='error-btns'>
              <button className='error-close-btn' onClick={this.props.handleCloseError}></button>
              <button className='error-fake-btn-y'></button>
              <button className='error-fake-btn-g'></button>
            </div>
            <p>Bash</p>
          </div>
          <pre>
            <code>
              <pre className='error-ascii-art'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.-~-.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.~&lt;~'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&lt;'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.(-...-~-''...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'-'.'(..-~((&lt;((&lt;(~~-.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..&nbsp;&nbsp;&nbsp;&nbsp;'(&lt;&lt;(~~-(&lt;+&lt;&lt;(((((&lt;++&lt;~.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.-~((.&nbsp;-(&lt;++&lt;((((&lt;===+&lt;(((((+==&lt;'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.~&lt;&lt;==&lt;~(&lt;&lt;&lt;&lt;&lt;(((&lt;&lt;&lt;&lt;&lt;&lt;+&lt;(((((&lt;+s+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'(&lt;+=s+((&lt;((((((((((((((&lt;(((((((+s&lt;.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.-&lt;+=s=&lt;((((((((((((((((((((((((((=s&lt;.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.~&lt;+s=+(((((((((((((((((((((((((((&lt;==~&nbsp;&nbsp;...&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.~+==+(((((((((((((((((((((((((((((+s+-'~(~-'<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.~+=&lt;((&lt;&lt;((((&lt;(((((((((((((((((((((&lt;==&lt;(&lt;&lt;&lt;&lt;(<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'(~-~~~(((((((((((((((((((((((((((&lt;++&lt;((((&lt;&lt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.'-----~(((((&lt;&lt;((((((((((((((((((&lt;(&lt;&lt;&lt;(&lt;(((((<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'-~~(((((((((+&lt;(((((((((((((((((((((((((((&lt;&lt;(<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.'~((&lt;&lt;(((&lt;(((+&lt;(((((((((((((((((((((((((((((((<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'-((((((((&lt;(~&lt;&lt;((((((&lt;(((&lt;((((((((((&lt;((((((&lt;(((<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'--(&lt;((((&lt;&lt;(~~&lt;~~&lt;((((&lt;(((((((((((((~~((&lt;&lt;((((&lt;+<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.-'-(((((&lt;&lt;&lt;(~(&lt;'~&lt;((((&lt;&lt;(((((((&lt;&lt;(((~--~&lt;=&lt;&lt;&lt;++s<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'''~((((&lt;++&lt;~-(('(&lt;(((&lt;(((&lt;(~(((&lt;&lt;((((~--&lt;s====s=<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.'(&lt;(((&lt;=+(-'(~'(&lt;((&lt;+~~(&lt;~-(((&lt;+((((&lt;~'(sss==s&lt;<br />
                &nbsp;&nbsp;&nbsp;..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;'(((&lt;&lt;+=&lt;~-'~-'(&lt;((+&lt;-~&lt;('-(&lt;((&lt;&lt;(((&lt;(-(s=====(<br />
                &nbsp;&nbsp;.''.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'((&lt;&lt;+==&lt;~----'((((+~'~&lt;~'-(&lt;(~&lt;&lt;(((((~(s===+&lt;(<br />
                &nbsp;&nbsp;.'.'.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'((&lt;+==&lt;~&lt;+=+-'~((&lt;(''(('.'~&lt;(-(+((((((&lt;====(((<br />
                &nbsp;&nbsp;......&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-((&lt;===((ss==&lt;'-~((-.'(~...~&lt;~-(+&lt;(((((+s==+((&lt;<br />
                &nbsp;&nbsp;&nbsp;...'.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'~(+===(+s&lt;''=~'~(('.'~-...~&lt;-'(+&lt;(((((+s===&lt;(&lt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;..'.&nbsp;&nbsp;&nbsp;&nbsp;..'(++s=&lt;+++'.s&lt;'-~(..''....~(-.~+&lt;(((((+s===&lt;(&lt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;....&nbsp;&nbsp;.'..(&lt;+==(~+z+(s(.'~~'.'..'..~~'.-&lt;&lt;(((((+s===&lt;((<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..'.&nbsp;..'..~&lt;=s=(-+s==s~.'-'..'..'.'~-'.-&lt;&lt;((((&lt;=s===+~.<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;....&nbsp;....&nbsp;'(+s=(.(=&lt;&lt;=-.''........'-''.-&lt;&lt;((((&lt;=s==+&lt;-&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;....'''.&nbsp;'(+==(.'((&lt;(.......'(&lt;&lt;('....-(&lt;((((&lt;==+&lt;(('&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'''..''.&nbsp;-&lt;&lt;+=(.'-(('.....'.-==szz+~..-&lt;&lt;((((+=+(((('&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.......'..-(&lt;+=(..''...'.....''.'-&lt;zz('~+&lt;(((&lt;==&lt;((((.&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;....''''..-((+=(..'....'.'.........-&lt;~-&lt;=&lt;(((&lt;=s&lt;((&lt;~&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...'''.'..~((&lt;=(..''...'.'.....'.'....~+=&lt;(((+==&lt;((&lt;-&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;......'''.~((&lt;=(.''...'.......''.'''.-&lt;==&lt;((&lt;=s=&lt;(&lt;(.&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;....''''''-((&lt;=(..'....'-'''......'.'&lt;=s=&lt;((&lt;=s=&lt;(((.&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.....''.'-~(+==-..'..'((-~-'......'~+s=+&lt;((+=s=&lt;(&lt;(.&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'....'''.'-(+=s+-....'~~~~~-.....''~+===&lt;(&lt;====&lt;((~&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.'...--'..'~&lt;=ss+~..'.-~~-~-.......(=s=+((+==s=&lt;((~&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;....'--''..-&lt;=sss=~...'~~~~'....'.-+s=+((&lt;=s===+~--&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'...''''.&nbsp;'(==&lt;+s(''..'--'...'...(====&lt;(+=s=+&lt;+~.-&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.'...''..&nbsp;.~==-~=&lt;+=-......'.''.-+s=ss&lt;+sss=~(+'&nbsp;'&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;........&nbsp;&nbsp;'&lt;+~(sshh=(-'-'''''..&lt;s+&lt;ss+shss&lt;.(+.&nbsp;.&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;''....'.&nbsp;&nbsp;.~+&lt;+zzzzzzss(''....~=+-(z==hzsz+'~~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'~'....~-.&nbsp;&nbsp;'&lt;&lt;&lt;zzzsszhh(.'...-+&lt;''+z=szzszs=&lt;'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+&lt;'....&lt;+-&nbsp;&nbsp;.(+&lt;zzszzzhs'....'~-.'&lt;zzsszzszzz+-'.&nbsp;&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'&lt;s~..'.'+=~&nbsp;&nbsp;.(=&lt;zzssszh+.....''.'+zhsszsszz=+&lt;+&lt;-.&nbsp;&nbsp;&nbsp;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;'&lt;ss-....-=s(.&nbsp;.(=&lt;szzzzzz&lt;''.....-=hhzzzzzzs=&lt;(&lt;&lt;(-.&nbsp;&nbsp;&nbsp;<br />
              </pre>
              <p className='error-alert'>ERROR in {location.href}</p>
              <p className='error-alert'>Page not found: {'\'' + location.pathname + '\' isn\'t exist'}</p>
              <p className='error-comment-out'># 出错啦，已经为您跳转到选型向导了</p>
              <p className='error-comment-out'># 点击左上角的红色按钮可以关闭<small>伪</small>控制台</p>
              <p className='error-input'>$ </p>
            </code>
          </pre>
        </div>
      );
    }
    return (
      <header className={'g' + bannerClass}>
        <div className='top-row'>
          <a href={site_url} onClick={event => this.toIndex(event)}><div className='logo'></div></a>
          <HeaderUser toGuide={this.props.toGuide} toManage={this.props.toManage}></HeaderUser>
        </div>
        {bannerSection}
      </header>
    );
  }
}

class HeaderUser extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.toManage = this.toManage.bind(this);

    this.state = {
      logState: false,
      avatar: null,
      nickname: null,
      open: false,
      anchorEl: undefined,
    };
  }

  handleClick (event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleRequestClose () {
    this.setState({
      open: false,
    });
  }

  toManage () {
    this.setState({
      open: false,
    });
    this.props.toManage();
  }

  render () {
    return (
      <div className='float-right'>
          <div>
            <IconButton className='top-add' color='contrast' aria-label='新建项目' onClick={this.props.toGuide}>
              <Icon>add</Icon>
            </IconButton>
            <Avatar aria-owns='header-menu' aria-haspopup='true' aria-label='更多' onClick={this.handleClick} className='avatar'>H</Avatar>
              <Menu
                id='header-menu'
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onRequestClose={this.handleRequestClose}
              >
                <MenuItem onClick={this.toManage}>项目管理</MenuItem>
                <MenuItem onClick={this.handleRequestClose}>退出登录</MenuItem>
              </Menu>
          </div>
      </div>
    );
  }
}


class MainPart extends React.Component {
  constructor (props) {
    super(props);

    let title, description = null, titleLink = null;
    switch (props.pageType) {
      case 'Introduction':
        title = '项目名称';
        description = '项目介绍';
        titleLink = 'http://www.example.com/example/';
        break;
      case 'Manage':
        title = '项目管理';
        break;
      case 'Guide':
        title = '技术选型向导';
        break;
      default:
        mainContent = (<h1 className='container'>Error, wrong pageType.</h1>);
    }

    this.state = {
      title: title,
      description: description, // Description of the project or the page
      titleLink: titleLink, // Link of the project or the page
      isFlowChart: props.isFlowChart,
      mainContent: this.changeType(props.pageType),
    };

    this.changeType = this.changeType.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      isFlowChart: nextProps.isFlowChart,
      mainContent: this.changeType(nextProps.pageType),
    });
  }

  changeType (pageType) {
    let mainContent;

    switch (pageType) {
      case 'Introduction':
        mainContent = (
          <Introduction />
        );
        this.setState({
          title: '项目名称',
          description: '项目介绍',
          titleLink: 'http://www.example.com/example/',
        });
        break;
      case 'Manage':
        mainContent = (
          <Manage toIntroduction={this.props.toIntroduction} />
        );
        this.setState({
          title: '项目管理',
          description: null,
          titleLink: null,
        });
        break;
      case 'Guide':
        mainContent = (
          <Guide />
        );
        this.setState({
          title: '技术选型向导',
          description: null,
          titleLink: null,
        });
        break;
      default:
        mainContent = (<h1 className='container'>Error, wrong pageType.</h1>);
    }

    return mainContent;
  }

  render () {

    return (
      <main className='c-wp'>
        <div className="container">
          <h1 className='big'>{this.state.title}</h1>
          <p className="proj-description">{this.state.description}<br /><a target='_blank' href={this.state.titleLink}>{this.state.titleLink}</a></p>
        </div>
        {this.state.isFlowChart ? <FlowChart /> : null}
        {this.state.mainContent}
      </main>
    );
  }
}

function Footer() {
  return (
    <footer className='container g'>
      <p className='footer-links'>
        <a href='https://github.com/Hybond/Hybond' target='_blank'>Github</a><span> · </span>
        <a href={site_url + '/about'}>关于</a><span> · </span>
        <a href='javascript: alert("todo!")'>I18N</a>
      </p>
      Designed and built with all the love in China by @Dimpurr, @Dring and @Rozc.<br />
      本项目源码受 <a href='https://github.com/Hybond/Hybond/blob/master/LICENSE' target='_blank'>MIT</a> 开源协议保护，文档受 <a href='https://creativecommons.org/licenses/by/3.0/' target='_blank'>CC BY 3.0</a> 开源协议保护。
    </footer>
  );
}

// ------ Flow chart ------ //

// TODO: Use Array or Object to control FlowSection's generating.

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
          <FlowSection name='后端语言' values={['Python', 'Node.js', 'PHP']} colors={['#8e24aa', '#d81b60', '#00897b']} />
          <FlowSection name='前端库' values={['Vue.js', 'React', 'Foo']} colors={['#ffeb3b', '#8e24aa', '#8e24aa']} />
          <FlowSection name='自动化' values={['Webpack', 'Goo']} colors={['#e53935', '#d81b60', '#8e24aa']} />
          <FlowSection name='IDE 和生产' values={['Atom', 'Sublime Text', 'Windows 记事本', 'Vim', 'Emacs']} colors={['#8e24aa', '#8e24aa', '#8e24aa', '#ffeb3b', '#ffeb3b']} />
        </div>
        <div className="swiper-pagination"></div>
      </div>
    );
  }
}

function FlowSection(props) {
  let values = props.values.slice(), colors = props.colors.slice();
  function buildTags(){
    var tags = [];
    for(let i = 0; i < values.length; i++){
      tags.push(<Tags value={values[i]} color={colors[i]} />);
    }
    return tags;
  }
  function Tags(props) {
    return (<button className='flow-chart-tag'><div className='flow-chart-color' style={{backgroundColor: props.color}}></div>{props.value}</button>);
  }
  // work out width
  let n = Math.round(values.length / 2);
  let sWidth = 70 * 2 + 160 * n + 20 * (n - 1);
  return (
    <section className='swiper-slide' style={{width: sWidth}}>
      <span className='flow-chart-title'><div className='flow-chart-dot'></div>{props.name}</span>
      {buildTags()}
    </section>
  );
}



// ------ Flow chart End ------ //

export default Base;

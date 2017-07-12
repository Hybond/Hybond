import React from 'react';

import Introduction from './introduction.jsx';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tabs, { Tab } from 'material-ui/Tabs';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import { LabelCheckbox } from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';

// Just for development
// TODO: Delete and rewrite the config after development.
import devConfig from '../dev_data/guide.js'

class Guide extends React.Component {
  constructor () {
    super();

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleWindowScroll = this.handleWindowScroll.bind(this);
    this.fixHeader = this.fixHeader.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);

    this.state = {
      controlFlow: {id: [], name: []},
      guideTop: 0,
      fixedClass: '',
      fixTime: 0,
      timeout: 0,
      mainContent: [],
      link: false,
      form: false,
    };
  }

  componentDidMount () {
    // Get data. 模拟获取数据
    const flow = devConfig.devFlow;

    // Control filter
    let
      flowId = [],
      flowName = [],
      mainContent = [];
    for (let i in flow) {
      flowId.push(flow[i].id);
      flowName.push(flow[i].name);
      mainContent.push(
        <GuideSection handleMore={(t) => this.handleMore(t)} flow={flow[i]} />
      );
    }
    this.setState({
      controlFlow: {id: flowId, name: flowName},
      guideTop: getTop(this.guide), // Fixed header
      fixTime: new Date(),
      mainContent: mainContent, // Output main content
      link: false,
    });

    // Main content

    // Fixed header
    function getTop(e) {
      var offset=e.offsetTop;
      if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
      return offset;
    }
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  handleMore (link) {
    this.setState({
      link: link,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  fixHeader () {
    this.setState({
      fixTime: new Date(),
    });
    let scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop >= this.state.guideTop) {
      this.setState({
        fixedClass: ' fixed',
      });
    } else {
      this.setState({
        fixedClass: '',
      });
    }
  }

  handleWindowScroll () {
    let timeout, mustRun = 100;
    let curTime = new Date();

    clearTimeout(this.state.timeout);

    if (curTime - this.state.fixTime >= mustRun) {
      this.fixHeader();
    } else {
      this.setState({
        timeout: setTimeout(this.fixHeader, 100),
      });
    }
  }

  handleClose () {
    this.setState({
      link: false,
    });
  }

  handleNext () {
    this.setState({
      form: true,
    });
  }

  handleBack () {
    this.setState({
      form: false,
    });
  }

  render () {
    return (
      <div className='guide' ref={guide => this.guide = guide}>
        {
          this.state.form ?
          '' :
          (
            <GuideControl
              className={this.state.fixedClass}
              flows={this.state.controlFlow}
              />
          )
        }
        <div className='guide-sections container'>
          {
            !this.state.form ? this.state.mainContent :
            (
              <div className='guide-form'>
                <GuideStepper
                  count='1'
                  text='选择项目类型'
                />

                <Button raised id='guide-btn-ss' className='guide-btn'>
                  <p>匿名的</p>
                  <p className='big'>
                    快照
                  </p>
                </Button>
                <Button raised id='guide-btn-np' className='guide-btn'>
                  <p>可重复编辑的</p>
                  <p className='big'>
                    普通项目
                  </p>
                </Button>

                <GuideStepper
                  count='2'
                  text='设置项目属性'
                />
                <TextField
                  label='项目名称'
                  type='text'
                  helperText='显示在页面上的名称'
                  marginForm
                />
              </div>
            )
          }
        </div>
        <BottomBar
          link={this.state.link}
          handleClose={this.handleClose}
          handleNext={this.handleNext}
          handleBack={this.handleBack}/>
      </div>
    );
  }
}

function GuideStepper(props) {
  return (
    <div className='guide-stepper'>
      <Avatar className='guide-avatar'>{props.count}</Avatar>
      <p>{props.text}</p>
    </div>
  );
}

class GuideControl extends React.Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    // Get Flow
    this.state = {
      index: 0,
      filterFlow: [],
    };
  }

  handleChange (event, index) {
    this.setState({ index });
  }

  componentWillReceiveProps (nextProps) {
    const flows = nextProps.flows;
    let filterFlow = [];

    for (let i in flows.id) {
      filterFlow.push(
        <Tab label={flows.name[i]} />
      );
    }

    this.setState({ filterFlow: filterFlow });
  }

  render () {
    return (
      <header className={'guide-control' + this.props.className}>
        <div className='guide-search'>
          <div className='container'>
            <label><i className='material-icons'>search</i></label>
            <input type='text' placeholder='搜索'></input>
          </div>
        </div>
        <div className='guide-filter'>
          <MuiThemeProvider>
            <div className='container'>
              <Tabs
               index={this.state.index}
               onChange={this.handleChange}
               indicatorColor='primary'
               textColor='primary'
               scrollable
               scrollButtons='auto'
             >
               <Tab label='热门' />
               {this.state.filterFlow}
             </Tabs>
            </div>
          </MuiThemeProvider>
        </div>
      </header>
    );
  }
}

class GuideSection extends React.Component {
  constructor (props) {
    super();

    this.state = {
      flow: {},
    };
  }

  componentWillMount () {
    this.setState({
      flow: this.props.flow,
    });
  }

  handleMore (link) {
    this.props.handleMore(link);
  }

  render () {
    let
      flow = this.props.flow,
      title = flow.name,
      hot = [];

    for (let i in flow.hot) {
      hot.push(
        <GuideCard
          flowName={flow.name}
          color={flow.hot[i].color}
          name={flow.hot[i].name}
          description={flow.hot[i].description}
          link={flow.hot[i].link}
          handleMore={link => this.handleMore(link)} />
      );
    }

    flow = null;

    return (
      <section>
        <div className='clearfix'></div>
        <h2>{title}</h2>
        <div className='guide-page'>
          <h3>热门项目</h3>
          <div className='guide-hot'>
            {hot}
          </div>
          <h3>所有项目</h3>
          <div className='guide-all'>
          </div>
        </div>
      </section>
    );
  }
}

function GuideCard(props) {
  let
    link = props.link,
    icon = props.checked ? 'check_box' : 'check_box_outline_blank',
    checkClass = props.checked ? ' checked' : '',
    openClass = props.open ? ' open' : '';
  return (
    <div className={'guide-card' + openClass}>
      <div className='guide-wrap'>
        <span>{props.flowName}</span>
        <div className='tag' style={{backgroundColor: props.color}}><div className='tag-dot' style={{backgroundColor: props.color}}></div>{props.name}</div>
        <p className='description'>{props.description}</p>
        <footer>
          <Button className='more' onClick={() => props.handleMore(link)}>了解更多</Button>
          <LabelCheckbox
            className='check'
            onChange={props.handleCheck}
          />
        </footer>
      </div>
    </div>
  );
}

class BottomBar extends React.Component {
  constructor () {
    super();

    this.handleClose = this.handleClose.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);

    this.state = {
      folded: true,
      link: '',
      className: '',
      introduction: null,
      form: false,
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.link) {
      this.setState({
        folded: false,
        className: 'unfolded',
        introduction: (<Introduction />),
      });
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
  }

  handleClose () {
    this.setState({
      folded: true,
      link: '',
      className: '',
      introduction: null,
    });
    document.getElementsByTagName('body')[0].style.overflow = '';
    this.props.handleClose();
  }

  handleNext () {
    this.props.handleNext();
    this.setState({
      form: true,
    });
  }

  handleBack () {
    this.props.handleBack();
    this.setState({
      form: false,
    });
  }

  render () {
    let top;
    if (this.state.folded) {
      top = (
        <div className='top container'>
          <p className='header'>点击“了解更多”预览技术概况</p>
          <Button
            raised
            color='primary'
            onClick={this.handleNext}
            >
            选好了
          </Button>
        </div>
      );
    } else {
      top = (
        <div className='top container'>
          <p className='header'>正在预览技术概况</p>
          <Button raised color='primary' onClick={this.handleClose}>返回</Button>
        </div>
      );
    }
    if (this.state.form) {
      top = (
        <div className='top container'>
          <p className='header'>设置项目信息</p>
          <Button raised color='primary' onClick={this.handleBack}>修改选型</Button>
        </div>
      );
    }
    return (
      <div id='bottom-bar' className={this.state.className}>
        {top}
        {this.state.introduction}
      </div>
    );
  }
}

export default Guide;

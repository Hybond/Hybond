import React from 'react';

// Just for development
// TODO: Delete and rewrite the config after development.
import devConfig from '../dev_data/guide.js'

class Guide extends React.Component {
  constructor () {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleWindowScroll = this.handleWindowScroll.bind(this);
    this.fixHeader = this.fixHeader.bind(this);
    this.state = {
      controlFlow: {id: [], name: []},
      guideTop: 0,
      fixedClass: '',
      fixTime: 0,
      timeout: 0,
      mainContent: [],
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

  handleMore (t) {
    // Test transfer data.
    console.log(t);
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

  render () {
    return (
      <div className='guide' ref={guide => this.guide = guide}>
        <GuideControl className={this.state.fixedClass} flows={this.state.controlFlow} />
        <div className='guide-sections'>
          {this.state.mainContent}
        </div>
      </div>
    );
  }
}

function GuideControl(props) {
  // Get Flow
  const flows = props.flows;
  let filterFlow = [];

  for (let i in flows.id) {
    filterFlow.push(
      <button>{flows.name[i]}</button>
    );
  }

  return (
    <header className={'guide-control' + props.className}>
      <div className='guide-search'>
        <label><i className='material-icons'>search</i></label>
        <input type='text' placeholder='搜索'></input>
      </div>
      <div className='guide-filter'>
        <button>热门</button>
        {filterFlow}
      </div>
    </header>
  );
}

class GuideSection extends React.Component {
  constructor (props) {
    super();

    // Initate checkList
    let flow = props.flow, checkList = [];
    for (let i in flow.hot) {
      checkList.push(false);
    }
    let openList = checkList.slice();

    this.state = {
      flow: {},
      checkList: checkList,
      openList: openList,
    };
  }

  componentWillMount () {
    this.setState({
      flow: this.props.flow,
    });
  }

  handleCheck (i) {
    let checkList = this.state.checkList.slice();
    checkList[i] = !checkList[i];
    this.setState({
      checkList: checkList,
    });
  }

  handleMore (i, link) {
    let openList = this.state.openList.slice();
    for (let j in openList) {
      if(j != i)
        openList[j] = false;
    }
    openList[i] = !openList[i];
    this.setState({
      openList: openList,
    });
    if(openList[i])
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
          handleCheck={() => this.handleCheck(i)}
          checked={this.state.checkList[i]}
          handleMore={() => this.handleMore(i, 'test')}
          open={this.state.openList[i]} />
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
          <button className='more' onClick={props.handleMore}>了解更多</button>
          <button className={'check' + checkClass} onClick={props.handleCheck}><i className='material-icons'>{icon}</i></button>
        </footer>
      </div>
      <div className='guide-under'>
        <div>
          <div className='content'>
            <h2>Title</h2>
            <ul>
              <li>test1</li>
              <li>test2</li>
              <li>test3</li>
              <li>test4</li>
            </ul>
            <h2>Title</h2>
            <ul>
              <li>test1</li>
              <li>test2</li>
              <li>test3</li>
              <li>test4</li>
            </ul>
            <h2>Title</h2>
            <ul>
              <li>test1</li>
              <li>test2</li>
              <li>test3</li>
              <li>test4</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guide;

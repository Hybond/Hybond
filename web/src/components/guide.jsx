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
        <GuideSection flow={flow[i]} />
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
  constructor () {
    super();
    this.state = {
      flow: {},
      title: '',
      hot: [],
    };
  }

  componentWillMount () {
    let
      flow = this.props.flow,
      title = flow.name,
      hot = [];

    for (let i in flow.hot) {
      hot.push(
        <GuideCard flowName={flow.name} color={flow.hot[i].color} name={flow.hot[i].name} description={flow.hot[i].description} link={flow.hot[i].link} />
      );
    }

    flow = null;

    this.setState({
      flow: this.props.flow,
      title: title,
      hot: hot,
    });
  }
  //<GuideCard flowName='test' color='#6cf' name='test' description='yes.' />

  render () {
    return (
      <section>
        <h2>{this.state.title}</h2>
        <div className='guide-page'>
          <h3>热门项目</h3>
          <div className='guide-hot'>
            {this.state.hot}
          </div>
          <h3>所有项目</h3>
          <div className='guide-other'>
          </div>
        </div>
      </section>
    );
  }
}

function GuideCard(props) {
  let link = props.link;
  return (
    <div className='guide-card'>
      <span>{props.flowName}</span>
      <div className='tag' style={{backgroundColor: props.color}}><div className='tag-dot' style={{backgroundColor: props.color}}></div>{props.name}</div>
      <p className='description'>{props.description}</p>
      <div><button>了解更多</button><button><i className='material-icons'>check_box_outline_blank</i></button></div>
    </div>
  );
}

export default Guide;

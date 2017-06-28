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
    };
  }

  componentDidMount () {
    // Get data. 模拟获取数据
    const flow = devConfig.devFlow;
    //
    let flowId = [], flowName = [];
    for (let i in flow) {
      flowId.push(flow[i].id);
      flowName.push(flow[i].name);
    }
    this.setState({
      controlFlow: {id: flowId, name: flowName},
      guideTop: getTop(this.guide), // Fixed header
      fixTime: new Date(),
    });
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
          <div style={{height: 3000}}></div>
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
  }

  render () {
    return (
      <section>
        <h1>{this.props.title}</h1>

        <div className='guide-hot'>
        </div>
        <div className='guide-other'>
        </div>
      </section>
    );
  }
}

export default Guide;

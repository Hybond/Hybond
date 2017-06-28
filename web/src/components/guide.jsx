import React from 'react';

// Just for development
// TODO: Delete and rewrite the config after development.
import devConfig from '../dev_data/guide.js'

class Guide extends React.Component {
  constructor () {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      controlFlow: {id: [], name: []},
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
    });
  }

  render () {
    return (
      <div className='guide'>
        <GuideControl flows={this.state.controlFlow} />
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
    <header className='guide-control'>
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

}

export default Guide;

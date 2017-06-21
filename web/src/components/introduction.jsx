import React from 'react';

class Introduction extends React.Component {
  render () {
    // TODO: Delete these dev data
    let detialList = {
      verson: '15.6.1',
      homepage: 'https://facebook.github.io/react/',
      sourceCode: 'https://github.com/facebook/react',
      docs: 'https://facebook.github.io/react/docs/hello-world.html',
    }

    return (
      <div className='container introduction'>
        <IntroHeader partName='前端库' color='#8e24aa' projName='React' projDes='A declarative, efficient, and flexible JavaScript library for building user interfaces.' />
        <IntroDetials list={detialList} />
        <div className='clearfix'></div>
      </div>
    );
  }
}

function IntroHeader (props) {
  return (
    <section>
      <span className='part-name'>{props.partName}</span>
      <h1 className='proj-name'><div className="introduction-dot" style={{backgroundColor: props.color}}></div>{props.projName}</h1>
      <p className="description">{props.projDes}</p>
    </section>
  );
}

function IntroDetials(props) {
  // Handle the list
  function getHost(url) {
    // get host from a url, e.g. http://test.example.com/test#yes -> test.example.com
    let regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
    return regex.exec(url)[6]
  }
  let list = props.list, outputList = [];
  if (list.verson) {
    outputList.push(<li className='devide'><label>版本</label><span>{list.verson}</span></li>);
  }
  if (list.homepage) {
    outputList.push(
      <li><label>项目主页</label><span><a target='_blank' href={list.homepage}>{getHost(list.homepage)}</a></span></li>
    );
  }
  if (list.sourceCode) {
    outputList.push(
      <li><label>源码</label><span><a target='_blank' href={list.sourceCode}>{getHost(list.sourceCode)}</a></span></li>
    );
  }
  if (list.docs) {
    outputList.push(
      <li><label>文档</label><span><a target='_blank' href={list.docs}>{getHost(list.docs)}</a></span></li>
    );
  }

  return (
    <div className="details">
      <h2>项目详情</h2>
      <ul>{outputList}</ul>
    </div>
  );
}

export default Introduction;

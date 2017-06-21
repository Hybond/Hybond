import React from 'react';
import ClipboardButton from 'react-clipboard.js';

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
  let list = props.list, outputList = [];
  if (list.verson) {
    outputList.push(<li className='devide'><label>版本</label><span>{list.verson}</span></li>);
  }
  if (list.homepage) {
    outputList.push(
      <LinkList listName='项目主页' link={list.homepage} copyNum={1} />
    );
  }
  if (list.sourceCode) {
    outputList.push(
      <LinkList listName='源码' link={list.sourceCode} copyNum={2} />
    );
  }
  if (list.docs) {
    outputList.push(
      <LinkList listName='文档' link={list.docs} copyNum={3} />
    );
  }

  return (
    <div className="details">
      <h2>项目详情</h2>
      <ul>{outputList}</ul>
    </div>
  );
}

// Links & it's hover panel
class LinkList extends React.Component {
  constructor (props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);

    this.state = {
      copyResult: '',
      copyClass: 'link-return',
    }
  }

  onSuccess () {
    this.setState({
      copyResult: '已经复制到剪切板',
      copyClass: 'details-tooltip-success link-return',
    });
  }

  onError () {
    this.setState({
      copyResult: 'No!',
      copyClass: 'details-tooltip-error link-return',
    });
  }

  getHost (url) {
    // get host from a url, e.g. http://test.example.com/test#yes -> test.example.com
    let regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
    return regex.exec(url)[6];
  }

  handleMouseEnter () {
    this.linkInput.select();
  }

  render () {
    return (
      <li>
        <label>{this.props.listName}</label><span><a target='_blank' href={this.props.link} onMouseEnter={this.handleMouseEnter}>{this.getHost(this.props.link)}</a></span>
        <div className='details-tooltip-pin'>
          <div className='details-tooltip'>
            <input type='text' className={'linkInput-'+this.props.copyNum} defaultValue={this.props.link} ref={input => this.linkInput = input} onChange={(e) => e.target.value = this.props.link} />
            <ClipboardButton onSuccess={this.onSuccess} onError={this.onError} data-clipboard-text={this.props.link}>复制</ClipboardButton>
            <LinkReturn classes={this.state.copyClass} copyResult={this.state.copyResult} />
          </div>
        </div>
      </li>
    );
  }
}
function LinkReturn (props) {
  return (<div className={props.classes}>{props.copyResult}</div>);
}

export default Introduction;

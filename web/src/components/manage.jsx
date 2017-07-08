import React from 'react';

// Material UI
import Button from 'material-ui/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import MobileStepper from 'material-ui/MobileStepper';

import config from '../config.js';

const site_url = config.site_url;

class Manage extends React.Component {
  constructor () {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);

    this.state = {
      open: false,
      activePage: 0,
    };
  }

  handleDelete () {
    this.setState({
      open: true,
    });
  }

  handleRequestClose () {
    this.setState({
      open: false,
    });
  }

  handleNext () {
    this.setState({
      activePage: this.state.activePage + 1,
    });
  };

  handleBack () {
    this.setState({
      activePage: this.state.activePage - 1,
    });
  };

  render () {
    let projList = [];
    for (let i = 0; i < 12; i++) {
      projList.push(<Project handleDelete={this.handleDelete} />);
    }

    return (
      <div className='container manage'>
        <ul className='manage-list'>
          {projList}
        </ul>
        <div className='manage-page'>
          <MuiThemeProvider>
            <MobileStepper
              type="dots"
              steps={6}
              position="static"
              activeStep={this.state.activePage}
              className='stepper'
              onBack={this.handleBack}
              onNext={this.handleNext}
              disableBack={this.state.activePage === 0}
              disableNext={this.state.activePage === 5}
              backButtonText='上一页'
              nextButtonText='下一页'
            />
          </MuiThemeProvider>
        </div>
        <ManageAlert open={this.state.open} handleRequestClose={this.handleRequestClose} />
      </div>
    );
  }
}

class Project extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <li>
        <div className='manage-list-left'>
          <a className='proj-name' href={site_url + '/codemoe/hybond/'}>Hybond</a>
          <span className='description'>A Magical Bond for Hybrid Developer</span>
        </div>
        <MuiThemeProvider>
          <div className='manage-list-right'>
            <IconButton aria-label='编辑项目'>
              <Icon>edit</Icon>
            </IconButton>
            <IconButton aria-label='删除项目' onClick={this.props.handleDelete}>
              <Icon>delete</Icon>
            </IconButton>
          </div>
        </MuiThemeProvider>
        <div className='clearfix'></div>
      </li>
    );
  }
}

class ManageAlert extends React.Component {
  constructor () {
    super();

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      deleteText: '',
      deletable: false,
      confirmButton: null,
      projName: 'Hybond',
    };
  }

  handleRequestClose () {
    this.setState({ deleteText: '', deletable: false });
    this.props.handleRequestClose();
  }

  handleDelete () {
    this.handleRequestClose();
  }

  handleChange (event) {
    let text = event.target.value;

    this.setState({ deleteText: text });

    let deletable;
    if (text == this.state.projName) {
      deletable = true;
    } else {
      deletable = false;
    }

    this.setState({ deletable: deletable });
  }

  render () {
    return (
      <MuiThemeProvider>
        <Dialog open={this.props.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            {"危险操作 - 删除项目"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              您确定要删除项目 <b>{this.state.projName}</b> 吗？这一操作不可逆，请谨慎操作。<br />
              如果您确定要这么做，请输入项目名称（{this.state.projName}）
            </DialogContentText>
            <TextField
              label='项目名称'
              value={this.state.deleteText}
              onChange={this.handleChange}
              marginForm
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleRequestClose}
              color="primary"
            >
              取消
            </Button>
            <Button
              onClick={this.handleDelete}
              color="accent"
              disabled={!this.state.deletable}
            >
              删除
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default Manage;

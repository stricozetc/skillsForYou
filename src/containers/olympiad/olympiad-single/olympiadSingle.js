import React from 'react';
import './style.scss';

import axios from 'axios';

import { connect } from 'react-redux';
import { setCurrentOlympiadTask } from '../../../redux/actions/single-olympiad';
import { history } from "../../../services/redux";

import {
  OlympicHeader,
  OlympicTask,
  Pager,
} from './common';

import {
  Compile, ButtonAll, Warning
} from '../../../components';

class OlympiadSingleComponent extends React.Component {
  state = {
    olympiad: null,
    allTasks: [],
    comleteTasks: 0,
    currentTaskNumeric: 0,
    currentTaskName: '',
    currentTaskDescription: '',
    olympiadOptions: {
      language: 'pascal',
      olympiad_id: '1',
      task_id: '1',
    },
    score: 0,
    userName: '',
  };

  componentDidMount() {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get('http://165.22.92.120/olympiad/1', params)
      .then(data => {
        this.setState({
          olympiad: data.data,
          allTasks: data.data.task,
        });
      })
      .catch(err => console.log(err));
    axios.get('http://165.22.92.120/me', params)
      .then(data => {
        this.setState({
          userName: data.data.full_name
        });
      })
      .catch(err => console.log(err));
  }

  setCurrentOlympiad = () => {
    this.state.allTasks.map(item => {
      if (this.props.olympiadId == item.id) {
        this.props.SetCurrentOlympiadTask(
          { id: item.id, name: item.name, description: item.task }
        )
      };
    });
  }

  showOlympiadResults = () => {
    let key = 0;
    let score = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
      key = sessionStorage.key(i);
      score = Number(sessionStorage.getItem(key));
    }
    // localStorage.setItem('user', this.state.userName);
    localStorage.setItem(`${this.state.userName}`, score);
    this.setState({
      score: score,
    });
    history.push('/olympiad-score');
  }

  renderComponent = () => (
    <div className="single-olympiad">
      <div className="single-olympiad__content">
        <OlympicHeader allTasks={this.state.allTasks}
          comleteTasks={this.state.comleteTasks} />
        <OlympicTask allTasks={this.state.allTasks}
          olympiadId={this.props.olympiadId} />
        <Compile path={'http://165.22.92.120/olympiad/checker'}
          task_id={this.props.olympiadId}
          olympiad_id={'1'} />
        <Pager allTasks={this.state.allTasks}
          currentPage={this.props.olympiadId} />
        {
          this.state.allTasks.length === this.props.olympiadId
            ? <ButtonAll action={this.showOlympiadResults}
              content={'Завершить олимпиаду'} />
            : null
        }
      </div>
    </div>
  )

  render() {
    this.setCurrentOlympiad();
    return (
      <>
        {this.props.user ? <this.renderComponent /> : history.push('/')}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  olympiadId: state.singleOlympiad.numericOlympiad,
  user: state.user.userToken,
});

const mapDispathToProps = (dispatch) => ({
  SetCurrentOlympiadTask: (olympiad) => {
    dispatch(setCurrentOlympiadTask(olympiad));
  },
})

export const OlympiadSingle = connect(mapStateToProps, mapDispathToProps)(OlympiadSingleComponent)

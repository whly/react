import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import moment from 'moment';
import querystring from 'querystring';


class Search extends Component {
  read() {
    const { searchStore } = this.props;
    searchStore.read();
  }

  keyPress(e) {
    if (e.charCode === 13) {
      this.read();
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
    const { location, searchStore } = this.props;
    // const { member } = searchStore;
    // member.name = '';
    const { name } = querystring.parse(location.search.split('?')[1]);
    searchStore.member.name = name || '';
    searchStore.read();
  }

  
  read() {
    const { history, searchStore } = this.props;
    const { member } = searchStore;
    history.push(`/search?name=${member.name}`);
  }


  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    const { searchStore } = this.props;
    const { name } = querystring.parse(nextProps.location.search.split('?')[1]);
    searchStore.member.name = name || '';
    searchStore.read();
  }

  render() {
    const { searchStore } = this.props;
    const { member, members } = searchStore;

    return (
      <div>
          <h3>Search</h3>
          <hr className="d-block" />
          <div>
            <input
              type="text" value={member.name}
              onChange={e => {member.name = e.target.value}}
              onKeyPress={(e) => this.keyPress(e)}
            />
            <button className="relative pointer" onClick={e => this.read()}>Search</button>
          </div>
          <hr className="d-block" />
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {_.map(members, (member, key) => (
                <tr key={key}>
                  <td>{member.name}</td>
                  <td>{member.age}</td>
                  <td>{moment(member.createdDate).format('YYYY-MM-DD')}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

Search = inject('searchStore')(observer(Search));

export default Search;

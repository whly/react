import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import moment from 'moment';

class CRUD extends Component {
  // constructor(props) {
  //   super();
  //   //console.log(props)
  //   const { crudStore } = props;
  //   const { member } = crudStore;
  //   this.state = {
  //     member: {
  //     age: member.age,
  //     name: member.name,
  //     con: member.con
  //     }
  //   }
  //   console.log(this.state.member);
  // }

  create(spinnerTarget) {
    const { crudStore } = this.props;
    crudStore.create(spinnerTarget);
  }

  update(spinnerTarget, key) {
    const { crudStore } = this.props;
    crudStore.update(spinnerTarget, key);
  }

  del(spinnerTarget, key) {
    const { crudStore } = this.props;
    crudStore.del(spinnerTarget, key);
  }

  componentDidMount() {
    console.log(this.props)
    const { crudStore } = this.props;
    //const crudStore = this.props.crudStore;
    const { member } = crudStore;
    // debugger
    // member.name = '';
    // member.age = '';
    //console.log(this.props)
    console.log(member)
    crudStore.read();
  }

  render() {
    const { crudStore } = this.props;
    const { member, members } = crudStore;
    // debugger
    return (
      <div>
          <h3>CRUD</h3>
          <hr className="d-block" />
          <div>
            <h4>Read</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Created Date</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {_.map(members, (member, key) => (
                  <tr key={key}>
                    <td>
                      <input
                        type="text" placeholder="Name" value={member.name}
                        onChange={e => {member.name = e.target.value}}
                      />
                    </td>
                    <td>
                      <input
                        type="text" placeholder="Age" value={member.age}
                        onChange={e => {member.age = e.target.value}}
                      />
                    </td>
                    <td>{moment(member.createdDate).format('YYYY-MM-DD')}</td>
                    <td>
                      <button className="relative pointer" onClick={e => this.update(e.target, key)}>Update</button>
                      <button className="relative pointer" onClick={e => this.del(e.target, key)}>Delete</button>
                    </td>
                  </tr>
                ))} 
              </tbody>
            </table>
          </div>
          <hr className="d-block" />
          <div>
            <h4>Create</h4>
            <input
              type = "text"
              placeholder = "Name"
              value = { member.name }
              onChange = { e => { member.name = e.target.value } }
            />
            <input
              type="text" placeholder="Age" value={member.age}
              onChange={e => {member.age = e.target.value}}
            />
            <button onClick={() => this.create()}>Create</button>
            <button className="relative pointer" onClick={e => this.create(e.target)}>Create</button>
          </div>
        </div>
    );
  }
}

CRUD = inject('crudStore')(observer(CRUD));

export default CRUD;

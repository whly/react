import React, { Component } from 'react';

class CRUD extends Component {
  render() {
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
                <tr>
                  <td>횽길동</td>
                  <td>39</td>
                  <td>2018-10-04</td>
                  <td>
                    <button>Update</button>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr className="d-block" />
          <div>
            <h4>Create</h4>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Age" />
            <button>Create</button>
          </div>
        </div>
    );
  }
}

export default CRUD;
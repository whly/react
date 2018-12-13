import { decorate, observable, action } from 'mobx';
import axios from 'axios';
import * as utils from '../utils';

class SearchStore {
  member = {
    name: ''
  }

  members = []

  read() {
    utils.nProgress.start();
    axios.get(`https://test-whly.c9users.io:8081/api/v1/search?name=${this.member.name}`).then(response => {
      console.log(response);
      this.members = response.data.members;
      utils.nProgress.done();
    }).catch(error => {
      utils.apiCommonError(error);
    });
  }
}

decorate(SearchStore, {
  member: observable,
  members: observable,
  search: action
})

export const searchStore = new SearchStore();
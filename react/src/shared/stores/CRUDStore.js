import { observable, decorate, action } from 'mobx';
import * as utils from '../utils';
import moment from 'moment'
import _ from 'lodash';
//import axios from 'axios';
import * as firebase from 'firebase/app';

export default class CRUDStore {
    member = {
        name: '',
        age: '',
        con: ''
    }

    members = []

    /* create(spinnerTarget) {
         // validation
         if (!this.member.name) {
             utils.toastr().warning('Please text your name.');
             return;
         }
         if (!Number(this.member.age) || Number(this.member.age) <= 0) {
             utils.toastr().warning('Please text your age and upper than 0.');
             return;
         }

         const spinner = utils.spinner().spin(spinnerTarget);
         console.log(this.member);
         axios.post('https://test-whly.c9users.io:8081/api/v1/member', this.member).then(response => {
             console.log(response);
             spinner.stop();
             utils.toastr().success(response.data.result);
             this.read();
         }).catch(error => {
             utils.apiCommonError(error, spinner);
         });
         console.log('create')
     }*/

    create(spinnerTarget) {
        if (!this.member.name) {
            utils.toastr().warning('Please text your name.');
            return;
        }
        if (!Number(this.member.age) || Number(this.member.age) <= 0) {
            utils.toastr().warning('Please text your age and upper than 0.');
            return;
        }

        const spinner = utils.spinner().spin(spinnerTarget);
        firebase.database().ref('member').push({
            name: this.member.name,
            age: Number(this.member.age),
            createdDate: moment().format()
        }).then(response => {
            console.log(response);
            spinner.stop();
            utils.toastr().success('Created');
        }).catch(error => {
            utils.apiCommonError(error, spinner);
        });
    }

    /*read() {
        utils.nProgress.start();
        axios.get('https://test-whly.c9users.io:8081/api/v1/member').then(response => {
            console.log(response);
            this.members = response.data.members;
            utils.nProgress.done();
        }).catch(error => {
            utils.apiCommonError(error);
        });
    }*/

    read() {
        this.membersListener = firebase.database().ref('member');
        this.membersListener.on('value', snapshot => {
            utils.nProgress.start();
            const members = _.map(snapshot.val(), (member, uid) => {
                member.uid = uid;
                return member;
            });
            this.members = _.orderBy(members, ['createdDate'], ['desc']);
            utils.nProgress.done();
        })
    }

    /*readOff() {
        if (this.membersListener) {
            this.membersListener.off();
        }
    }*/

    /*update(spinnerTarget, key) {
        const member = this.members[key];
        if (!member.name) {
            utils.toastr().warning('Please text your name.');
            return;
        }
        if (!Number(member.age) || Number(member.age) <= 0) {
            utils.toastr().warning('Please text your age and upper than 0.');
            return;
        }
        const spinner = utils.spinner().spin(spinnerTarget);
        // axios.put('https://test-whly.c9users.io:8081/api/v1/member', { key, member }).then(response => {
        axios.put(`https://test-whly.c9users.io:8081/api/v1/member/${member.idx}`, member).then(response => {
            console.log(response);
            spinner.stop();
            utils.toastr().success(response.data.result);
            this.read();
        }).catch(error => {
            utils.apiCommonError(error, spinner);
        });
    }*/

    update(spinnerTarget, key) {
        const member = {
            ...this.members[key]
        };
        delete member.uid;

        if (!member.name) {
            utils.toastr().warning('Please text your name.');
            return;
        }
        if (!Number(member.age) || Number(member.age) <= 0) {
            utils.toastr().warning('Please text your age and upper than 0.');
            return;
        }
        const spinner = utils.spinner().spin(spinnerTarget);
        firebase.database().ref(`member/${this.members[key].uid}`).update(member).then(response => {
            console.log(response);
            spinner.stop();
            utils.toastr().success('Updated');
        }).catch(error => {
            utils.apiCommonError(error, spinner);
        });
    }

    /*del(spinnerTarget, key) {
        if (!window.confirm('Are you sure?')) {
            return;
        }
        const spinner = utils.spinner().spin(spinnerTarget);
        // axios.delete(`https://test-whly.c9users.io:8081/api/v1/member/${key}`).then(response => {
        axios.delete(`https://test-whly.c9users.io:8081/api/v1/member/${this.members[key].idx}`).then(response => {
            console.log(response);
            spinner.stop();
            utils.toastr().success(response.data.result);
            this.read();
        }).catch(error => {
            utils.apiCommonError(error, spinner);
        });
    }*/

    del(spinnerTarget, key) {
        if (!window.confirm('Are you sure?')) {
            return;
        }
        const spinner = utils.spinner().spin(spinnerTarget);
        firebase.database().ref(`member/${this.members[key].uid}`).remove().then(response => {
            console.log(response);
            spinner.stop();
            utils.toastr().success('Deleted');
        }).catch(error => {
            utils.apiCommonError(error, spinner);
        });
    }


}

decorate(CRUDStore, {
    member: observable,
    members: observable,
    read: action
})


export const crudStore = new CRUDStore();

import React from 'react';
import _ from 'lodash';
import Tweets from './Tweets';
import TimelineUI from './TimelineUI';
import {RequestUserTimeline} from '../services/httpCall';
import {Pending, Error, statusEnum} from './GeneralComponents';
import Modal from './Modal';

const e = React.createElement;

class UserTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: null,
            status: statusEnum.PENDING,
            modalContent: null,
            displayModal: false
        }
        this.update = this.update.bind(this);
        this.displayModal = this.displayModal.bind(this);
        RequestUserTimeline(this.update);
    }

    update(jsonList) {
        if(jsonList) {
            this.setState({
                tweets: jsonList,
                status: statusEnum.PENDING
            });
        } else {
            this.setState({
                tweets: null,
                status: statusEnum.ERROR
            });
        }
    }

    displayModal(toggle, tweet){
        this.setState({
            modalContent: tweet,
            displayModal: toggle
        });
    }

    render() {
        let component;

        if(this.state.tweets && !_.isEmpty(this.state.tweets)) {
            component = e(Tweets, { tweets: this.state.tweets, excludeHandle: true, openModal: this.displayModal });
        } else if(_.isEqual(this.state.status, statusEnum.PENDING)) {
            component = Pending();
        } else if(this.state.tweets && _.isEmpty(this.state.tweets)){
            component = Error('No tweets are available, post a tweet!');
        } else {
            component = Error("Something went wrong. Please come back later!");
        }


        return e('div', {className: "UIContent"},
                (this.state.displayModal ? e(Modal, { content: this.state.modalContent , displayModal: this.displayModal}) : null),
                e(TimelineUI, { className: "userTLUIContainer",
                                requestFunc: (this.props.test ? this.props.requestFunc : RequestUserTimeline),
                                buttonClass: 'userTimelineButton',
                                buttonMessage: 'Get User Timeline',
                                displayUserTimeline: true,
                                updateCallback: this.update
                                }),
                e('div', { className: "dataUser" }, component));
    }
}

export default UserTimeline;
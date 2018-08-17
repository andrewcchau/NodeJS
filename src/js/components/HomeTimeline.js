import React from 'react';
import _ from 'lodash';
import Tweets from './Tweets';
import TimelineUI from './TimelineUI';
import FilterUI from './FilterUI';
import {Request, RequestFilterTimeline} from '../services/httpCall';
import {Mismatch, Pending, Error, statusEnum} from './GeneralComponents';
import Modal from './Modal';

const e = React.createElement;

class HomeTimeline extends React.Component {
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
        Request(this.update);
    }

    update(jsonList) {
        if(jsonList) {
            if(_.isEmpty(jsonList)) {
                this.setState({
                    tweets: null,
                    status: statusEnum.NO_MATCH
                });
            } else {
                this.setState({
                    tweets: jsonList,
                    status: statusEnum.PENDING
                });
            }
        } else {
            this.setState({
                tweets: null,
                status: statusEnum.ERROR
            });
        }
    }

    displayModal(toggle, content){
        let modalContent;
        if(content) {
            modalContent = content;
        }
        this.setState({
            modalContent: modalContent,
            displayModal: toggle
        });
    }

    render() {
        let component;
        let extraComponent = e(FilterUI, {update: this.update});

        if(this.state.tweets && !_.isEmpty(this.state.tweets)) {
            component = e(Tweets, { tweets: this.state.tweets, openModal: this.displayModal});
        } else if(_.isEqual(this.state.status, statusEnum.NO_MATCH)) {
            component = Mismatch("No tweets match your search query.");
        } else if(_.isEqual(this.state.status, statusEnum.PENDING)) {
            component = Pending();
        } else {
            component = Error('Something went wrong. Please come back later!');
        }

        return e('div', {className: "UIContent"},
                e(TimelineUI, { className: 'homeTLUIContainer',
                                requestFunc: (this.props.test ? this.props.requestFunc : Request),
                                filterFunc: (this.props.test ? this.props.filterFunc : RequestFilterTimeline),
                                buttonClass: 'homeTimelineButton',
                                buttonMessage: 'Get Home Timeline',
                                updateCallback: this.update,
                                extraComponents: extraComponent
                                }),
                e('div', { className: "dataHome" }, component),
                (this.state.displayModal ? e(Modal, { className: "modal", content: this.state.modalContent , displayModal: this.displayModal}) : null));
    }
}

export default HomeTimeline;
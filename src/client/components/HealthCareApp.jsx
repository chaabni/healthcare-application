import React from 'react';
import Scroll from 'react-scroll';
import _ from 'lodash';

import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';

import IntroductionSection from './IntroductionSection.jsx';
import Nav from './Nav.jsx';
import ProgressButton from './ProgressButton';
import { ensureFieldsInitialized, updateCompletedStatus, updateSubmissionStatus, updateSubmissionId, updateSubmissionTimestamp } from '../actions';
import { veteranToApplication } from '../../common/veteran';
import * as validations from '../utils/validations';
import config from '../../../config';

// TODO(awong): Find some way to remove code when in production. It might require System.import()
// and a promise.
import PopulateVeteranButton from './debug/PopulateVeteranButton';
import PerfPanel from './debug/PerfPanel';
import RoutesDropdown from './debug/RoutesDropdown';

const Element = Scroll.Element;
const scroller = Scroll.scroller;

class HealthCareApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUrl = this.getUrl.bind(this);
  }

  getUrl(direction) {
    const routes = this.props.route.childRoutes;
    const panels = [];
    let currentPath = this.props.location.pathname;
    let nextPath = '';

    // TODO(awong): remove the '/' alias for '/introduction' using history.replaceState()
    if (currentPath === '/') {
      currentPath = '/introduction';
    }

    panels.push.apply(panels, routes.map((obj) => { return obj.path; }));

    for (let i = 0; i < panels.length; i++) {
      if (currentPath === panels[i]) {
        if (direction === 'back') {
          nextPath = panels[i - 1];
        } else {
          nextPath = panels[i + 1];
        }
        break;
      }
    }

    return nextPath;
  }

  scrollToTop() {
    scroller.scrollTo('topScrollElement', {
      duration: 500,
      delay: 0,
      smooth: true,
    });
  }

  handleContinue() {
    const path = this.props.location.pathname;
    const formData = this.props.data;
    const sectionFields = this.props.uiState.sections[path].fields;

    this.props.onFieldsInitialized(sectionFields);
    if (validations.isValidSection(path, formData)) {
      this.context.router.push(this.getUrl('next'));
      this.props.onCompletedStatus(path);
    }
    this.scrollToTop();
  }

  handleBack() {
    this.context.router.push(this.getUrl('back'));
    this.scrollToTop();
  }

  handleSubmit(e) {
    e.preventDefault();
    const veteran = this.props.data;
    const path = this.props.location.pathname;

    if (validations.isValidForm(veteran)) {
      this.props.onUpdateSubmissionStatus('submitPending');

      // POST data to endpoint
      fetch(`${config.apiRoot}/application`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000, // 10 seconds
        body: veteranToApplication(veteran)
      }).then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        response.json().then(data => {
          this.props.onUpdateSubmissionStatus('applicationSubmitted', data);
          this.props.onCompletedStatus(path);
          this.props.onUpdateSubmissionId(data.response.formSubmissionId);
          this.props.onUpdateSubmissionTimestamp(data.response.timeStamp);
        });
        setTimeout(() => { // eslint-disable-line scanjs-rules/call_setTimeout
          this.context.router.push(this.getUrl('next'));
          this.scrollToTop();
        }, 5000);
      }).catch(error => {
        // TODO(crew): Pass meaningful errors to the client.
        setTimeout(() => { // eslint-disable-line scanjs-rules/call_setTimeout
          this.props.onUpdateSubmissionStatus('submitFailed', error);
        }, 5000);
      });
    } else {
      this.scrollToTop();
      // TODO(crew): Decide on/add validation error message.
    }
  }

  render() {
    let children = this.props.children;
    let buttons;
    let submitButton;
    const submissionStatus = this.props.uiState.submission.status;

    if (children === null) {
      // This occurs if the root route is hit. Default to IntroductionSection.
      children = <IntroductionSection/>;
    }

    // TODO(crew): Move these buttons into sections.
    const backButton = (
      <ProgressButton
          onButtonClick={this.handleBack}
          buttonText="Back"
          buttonClass="usa-button-outline"
          beforeText="«"/>
    );

    const nextButton = (
      <ProgressButton
          onButtonClick={this.handleContinue}
          buttonText="Continue"
          buttonClass="usa-button-primary"
          afterText="»"/>
    );

    if (submissionStatus === false) {
      submitButton = (
        <ProgressButton
            onButtonClick={this.handleSubmit}
            buttonText="Submit Application"
            buttonClass="usa-button-primary"/>
      );
    } else if (submissionStatus === 'submitPending') {
      submitButton = (
        <ProgressButton
            onButtonClick={this.handleSubmit}
            buttonText="Sending..."
            buttonClass="usa-button-disabled"/>
      );
    } else if (submissionStatus === 'applicationSubmitted') {
      submitButton = (
        <ProgressButton
            onButtonClick={this.handleSubmit}
            buttonText="Submitted"
            buttonClass="hca-button-green"
            beforeText="&#10003;"/>
      );
    } else {
      submitButton = (
        <ProgressButton
            onButtonClick={this.handleSubmit}
            buttonText="Send Failed"
            buttonClass="usa-button-secondary"
            beforeText="x"/>
      );
    }

    if (this.props.location.pathname === '/review-and-submit') {
      buttons = (
        <div className="row progress-buttons">
          <div className="small-6 medium-5 columns">
            {backButton}
          </div>
          <div className="small-6 medium-5 columns">
            {submitButton}
          </div>
          <div className="small-1 medium-1 end columns">
            <div className={this.state ? 'spinner' : 'hidden'}>&nbsp;</div>
          </div>
        </div>
      );
    } else if (this.props.location.pathname === '/introduction') {
      buttons = (
        <div className="row progress-buttons">
          <div className="small-6 medium-5 columns">
            {nextButton}
          </div>
        </div>
      );
    } else if (this.props.location.pathname === '/submit-message') {
      buttons = (
        <div className="row progress-buttons">
          <div className="small-6 medium-5 columns">
            <button className="usa-button-primary">Back to Main Page</button>
          </div>
        </div>
      );
    } else {
      buttons = (
        <div className="row progress-buttons">
          <div className="small-6 medium-5 columns">
            {backButton}
          </div>
          <div className="small-6 medium-5 end columns">
            {nextButton}
          </div>
        </div>
      );
    }
    let devPanel = undefined;
    if (__DEV__) {
      const queryParams = _.fromPairs(
        window.location.search.substring(1).split('&').map((v) => { return v.split('='); }));
      if (queryParams.devPanel === '1') {
        devPanel = (
          <div className="row">
            <RoutesDropdown/>
            <PopulateVeteranButton/>
            <PerfPanel/>
          </div>
        );
      }
    }

    return (
      <div>
        {devPanel}
        <div className="row">
          <Element name="topScrollElement"/>
          <div className="medium-4 columns show-for-medium-up">
            <Nav currentUrl={this.props.location.pathname}/>
          </div>
          <div className="medium-8 columns">
            <div className="progress-box">
            {/* TODO: Figure out why <form> adds fields to url, and change action to reflect actual action for form submission. */}
              <div className="form-panel">
                {children}
                {buttons}
              </div>
            </div>
          </div>
        </div>
        <span className="js-test-location hidden" data-location={this.props.location.pathname} hidden></span>
      </div>
    );
  }
}

HealthCareApp.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    data: state.veteran,
    uiState: state.uiState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateSubmissionStatus: (value) => {
      dispatch(updateSubmissionStatus(value));
    },
    onUpdateSubmissionId: (value) => {
      dispatch(updateSubmissionId(value));
    },
    onUpdateSubmissionTimestamp: (value) => {
      dispatch(updateSubmissionTimestamp(value));
    },
    onFieldsInitialized: (field) => {
      dispatch(ensureFieldsInitialized(field));
    },
    onCompletedStatus: (route) => {
      dispatch(updateCompletedStatus(route));
    },
  };
}

// TODO(awong): Remove the pure: false once we start using ImmutableJS.
export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(HealthCareApp);
export { HealthCareApp };

import ReactGA from 'react-ga';
import React, { Component } from 'react';

const GOOGLE_ANALYTICS_ID = 'G-53MJ95EYEG';

const GoogleAnalyticsInit = () => {
  if (GOOGLE_ANALYTICS_ID) {
    ReactGA.initialize(GOOGLE_ANALYTICS_ID);
  }
};

GoogleAnalyticsInit();

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    if (GOOGLE_ANALYTICS_ID) {
      ReactGA.set({
        page,
        ...options,
      });
      ReactGA.pageview(page);
    }
  };

  const GoogleAnalytics = class extends Component {
    componentDidMount() {
      const page = window.location.pathname;
      trackPage(page);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
  return GoogleAnalytics;
};


export default withTracker;
import * as SegmentConstants from '_constants/SegmentConstants';
import { EventTypes } from 'redux-segment';

export function clickLogo() {
  return {
    type: SegmentConstants.CLICK_LOGO,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export function clickUserMenu() {
  return {
    type: SegmentConstants.CLICK_USER_MENU,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export function clickUserMenuAnalytics() {
  return {
    type: SegmentConstants.CLICK_USER_MENU_ANALYTICS,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export function clickUserMenuDataSources() {
  return {
    type: SegmentConstants.CLICK_USER_MENU_DATA_SOURCES,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export function clickUserMenuReports() {
  return {
    type: SegmentConstants.CLICK_USER_MENU_REPORTS,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export function clickUserMenuPayment() {
  return {
    type: SegmentConstants.CLICK_USER_MENU_PAYMENT,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export function clickDateRangePicker() {
  return {
    type: SegmentConstants.CLICK_DATE_RANGE_PICKER,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export function clickWelltoryLink() {
  return {
    type: SegmentConstants.CLICK_WELLTORY_LINK,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export function clickViewReport() {
  return {
    type: SegmentConstants.CLICK_VIEW_REPORT,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export function clickSortReports() {
  return {
    type: SegmentConstants.CLICK_SORT_REPORTS,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export function clickChartSwitcher(chartName, switcherType) {
  return {
    type: SegmentConstants.CLICK_CHART_SWITCHER,
    meta: {
      analytics: {
        eventType: EventTypes.track,
        eventPayload: {
          event: SegmentConstants.CLICK_CHART_SWITCHER,
          properties: {
            chart: chartName,
            chartClick: switcherType,
          },
        },
      },
    },
  };
}

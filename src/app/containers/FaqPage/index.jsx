import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, PanelGroup, Panel } from 'react-bootstrap';
import Select from 'react-select';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Actions.
import * as FaqActions from '_actions/FaqActions';

// Styles.
import 'react-select/dist/react-select.css';
import styles from './styles.scss';

@connect(
  state => ({
    faq: state.faq,
  }),
  dispatch => ({
    actions: bindActionCreators(FaqActions, dispatch),
  })
)
@autobind
export default class FaqPage extends Component {

  static propTypes = {
    faq: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      category: 'basic',
      activeKey: null,
    };
  }

  componentDidMount() {
    this.props.actions.loadFaq();
  }

  getPanels(categoryQuestions) {
    const panels = categoryQuestions.map((item, index) => {
      const classes = classnames(styles.panel, 'faqPanel', { active: this.state.activeKey === index });
      return (
        <Panel key={`faq-item-${index}`} header={item.title} eventKey={index} className={classes}>
          <div dangerouslySetInnerHTML={{ __html: item.text }} />
        </Panel>
      );
    });
    return panels;
  }

  filterQuestionByCategory(category) {
    const { faq } = this.props;
    const categoryQuestions = faq.questions.filter((question) => {
      if (category == question.category) {
        return question;
      }
      return null;
    });
    return categoryQuestions;
  }

  onSelectPanel(activeKey) {
    this.setState({ activeKey: activeKey === this.state.activeKey ? null : activeKey });
  }

  render() {
    const { location, faq } = this.props;
    let activeCategoryId;
    let activeCategory;
    let panels;
    if (location.query.category) {
      activeCategoryId = location.query.category;
    }
    if (faq.isFetched) {
      if (!activeCategoryId) {
        const firstCategory = faq.categories[0];
        if (firstCategory) {
          activeCategoryId = firstCategory.id;
        }
      }
      if (activeCategoryId) {
        activeCategory = faq.categories.find((category) => { return category.id == activeCategoryId ? category : null; });
        const categoryQuestions = this.filterQuestionByCategory(activeCategoryId);
        panels = this.getPanels(categoryQuestions);
      }

    }
    return (
      <div className={styles.faqWrapper}>
        <PanelGroup className={styles.panelGroup} activeKey={this.state.activeKey} onSelect={this.onSelectPanel} accordion>
          <h3 className={styles.faqCategory}>{activeCategory && activeCategory.name}</h3>
          {panels}
        </PanelGroup>
      </div>
    );
  }

}

@connect(
  state => ({
    faq: state.faq,
  }),
  dispatch => ({
    actions: bindActionCreators(FaqActions, dispatch),
  })
)
@autobind
export class FaqPageAdditionalTitle extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeCategoryId: props.location.query.category,
    };
  }

  onChangeCategory(category) {
    this.props.history.push({ pathname: '/faq', query: { category: category.value } });
    this.setState({ activeCategoryId: category.value });
  }

  render() {
    const { location, faq } = this.props;
    let activeCategoryId;
    let activeCategory;
    let categoriesOptions = [];
    if (faq.isFetched) {
      if (this.state.activeCategoryId) {
        activeCategoryId = this.state.activeCategoryId;
      }
      else {
        const firstCategory = faq.categories[0]
        if (firstCategory) {
          activeCategoryId = firstCategory.id;
        }
      }
      categoriesOptions = faq.categories.map((category) => {
        if (activeCategoryId == category.id) {
          activeCategory = {
            value: category.id,
            label: category.name,
          };
        }
        return {
          value: category.id,
          label: category.name,
        };
      });
    }
    return (
      <div>
        <Col xs={12} md={6} sm={6} className={styles.selectCategoryLabel}>
          <h2>{I18n.t('Выбрать категорию')}:</h2>
        </Col>
        <Col xs={12} md={6} sm={6} className={styles.selectCategoryWrapper}>
          <Select value={activeCategory} onChange={this.onChangeCategory} options={categoriesOptions} searchable={false} clearable={false} className={styles.selectCategory} placeholder={I18n.t('Выбрать категорию')} />
        </Col>
      </div>
    );
  }

}

import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

// Map the component to the lang settings, so that all lang features re-render if the lang changes
function mapStateToProps(state) {
  return { 
      locale: state.i18n.lang, 
      messages : state.i18n.messages 
    };
}

export default connect(mapStateToProps)(IntlProvider);
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import * as Actions from '../actions';


const DialogInput = ({ att, required, list, actions }) => {
  const handleDialogFieldChange = (e, newValue) => {
    actions.updateNewProvider(e.target.name, newValue);
    console.log(list.newProvider.email_address.match(/\w+@\w+(\.\w+)/ig));
  };

  const titleCase = (input) => {
    let title = input.replace(/_/, ' ');
    title = title.replace(/\b[a-z](?=[a-z]{2})/g,
      letter => letter.toUpperCase());
    return title;
  };

  return (
    <div>
      <TextField
        name={att}
        floatingLabelText={titleCase(att)}
        underlineShow={false}
        onChange={handleDialogFieldChange}
        errorText={(required && !list.newProvider.att) ? `${titleCase(att)} is required` : ''}
      />
      <Divider />
    </div>
  );
};


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialogInput);


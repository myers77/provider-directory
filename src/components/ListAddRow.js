import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TableHeaderColumn, TableRow } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

import * as Actions from '../actions';
import './List.css';

const iconStyle = {
  fontSize: 18,
  margin: 6,
};

const sortingHeader = {
  fontWeight: 500,
  color: '#222',
};

const ListAddRow = ({ ...otherProps, list, actions }) => {
  const titleCase = (input) => {
    input = input.replace(/_/, ' ');
    input = input.replace(/\b[a-z](?=[a-z]{2})/g,
      letter => letter.toUpperCase());
    return input;
  };

  return (
    <TableRow {...otherProps}>
      {otherProps.children[0] /* checkbox passed down from Table-Header */}
      {list.details.map(header =>

        <TableHeaderColumn
          key={header}
        >
                        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
            <TextField key={header}
              hintText={titleCase(header)}
            /><br />
        </ReactCSSTransitionGroup>
        </TableHeaderColumn>,
      )}
    </TableRow>
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
)(ListAddRow);

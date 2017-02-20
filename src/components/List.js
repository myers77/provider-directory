import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';

import ListBodyRow from './ListBodyRow';
import ListHeaderRow from './ListHeaderRow';
import ListHeaderActionsRow from './ListHeaderActionsRow';
import * as Actions from '../actions';

const checkboxWidth = {
  width: '6%',
};

const List = ({ list, actions }) =>
  <Paper zDepth={1}>
    <table>
      <col style={checkboxWidth} />
      <thead>
        <ListHeaderActionsRow />
        <ListHeaderRow />
      </thead>
      <tbody>
        {list.searchedData.map(d =>
          <ListBodyRow
            key={d.email_address}
            att={d}
          />,
        )}
      </tbody>
    </table>
  </Paper>;

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

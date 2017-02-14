import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filter, map, match, nth } from 'ramda';
import { Table, TableBody, TableHeader } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import ListAddRow from './ListAddRow';
import ListBodyRow from './ListBodyRow';
import ListHeaderRow from './ListHeaderRow';
import ListHeaderActionsRow from './ListHeaderActionsRow';
import * as Actions from '../actions';

const addRowStyle = {
  animationTimingFunction: 'ease-in',
};

const List = ({ list, actions }) => {
  return (
    <Paper zDepth={1}>
      <table>
        <thead>
          <ListHeaderActionsRow />
          {list.showAddRow ? <ListAddRow style={addRowStyle} /> : null}
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
    </Paper>
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
)(List);

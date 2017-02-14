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
  const handleRowSelection = (selectedRows) => {
    const getObject = n =>
      nth(n, list.searchedData);

    const selectedEntries = map(getObject, selectedRows);
    actions.updateSelectedEntries(selectedEntries);
  };

  return (
    <Paper zDepth={1}>
      <Table multiSelectable onRowSelection={handleRowSelection}>
        <TableHeader displaySelectAll={false}>
          <ListHeaderActionsRow />
          {list.showAddRow ? <ListAddRow style={addRowStyle} /> : null}
          <ListHeaderRow />
        </TableHeader>
        <TableBody showRowHover deselectOnClickaway={false}>
          {list.searchedData.map(d => <ListBodyRow key={d.email_address} att={d} />)}
        </TableBody>
      </Table>
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

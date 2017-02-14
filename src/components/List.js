import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filter, map, match } from 'ramda';
import { Table, TableBody, TableHeader } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import ListBodyRow from './ListBodyRow';
import ListHeaderRow from './ListHeaderRow';
import ListHeaderActionsRow from './ListHeaderActionsRow';
import * as Actions from '../actions';

const List = ({ list, actions }) => {
  // const containsMatch = (object, query) => map(match(query), object);
  const containsMatch = (object, query) => console.log(object, query);

  const renderData = () => {
    if (!list.isSearched) {
      list.data.map(d => <ListBodyRow att={d} />);
    } else {
      const re = new RegExp(list.searchQuery, 'i');
      // const searchedList = map(filter(match()), data);
      const getSearchedlist = filter(containsMatch(re), list.data);
      getSearchedlist();
    }
  };

  return (
    <Paper zDepth={1}>
      <Table multiSelectable>
        <TableHeader displaySelectAll={false}>
            <ListHeaderActionsRow />
            <ListHeaderRow />
        </TableHeader>
        <TableBody showRowHover>
          {list.data.map(d => <ListBodyRow key={d.email_address} att={d} />)}
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

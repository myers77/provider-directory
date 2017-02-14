import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Highlighter from 'react-highlight-words';

import { TableRow, TableRowColumn } from 'material-ui/Table';
import { cyan500 } from 'material-ui/styles/colors';

import * as Actions from '../actions';

const rowColumnStyle = {
  whiteSpace: 'normal',
  wordWrap: 'break-word',
};

const highlightStyle = {
  backgroundColor: cyan500,
  color: '#fff',
};

const ListBodyRow = ({ att, ...otherProps, list, actions }) => {
  return (
    <TableRow {...otherProps}>
      {otherProps.children[0] /* checkbox passed down from Table-Header */}
      {list.details.map(detail =>
        <TableRowColumn key={detail} style={rowColumnStyle}>
          <Highlighter
            highlightStyle={highlightStyle}
            searchWords={[list.searchQuery]}
            textToHighlight={att[detail]}
          />
        </TableRowColumn>
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
)(ListBodyRow);

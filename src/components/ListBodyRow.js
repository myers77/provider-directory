import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { contains } from 'ramda';
import Highlighter from 'react-highlight-words';
import Checkbox from 'material-ui/Checkbox';
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
  const handleRowSelection = () => {
    actions.toggleSelectedEntry(att, list.selectedEntries);
  };

  return (
  <tr onClick={handleRowSelection}>
    <td>
    <Checkbox
      checked={contains(att, list.selectedEntries)}
    />
    </td>
    {list.details.map(detail =>
      <td key={detail} style={rowColumnStyle}>
        <Highlighter
          highlightStyle={highlightStyle}
          searchWords={[list.searchQuery]}
          textToHighlight={att[detail]}
        />
      </td>,
    )}
  </tr>
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

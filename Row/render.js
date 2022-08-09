// export const renderCells = (props) => {
//   let [cells] = findByType(children, Cells);
//   if (cells) {
//     return <Cells {...props}>{cells.props.children}</Cells>;
//   }
// };

export const renderLeadingButtons = () => {
  let [btns] = findByType(children, LeadingButtons);
  if (btns) {
    return <LeadingButtons>{btns.props.children}</LeadingButtons>;
  }
  return null;
};

export const renderTrailingButtons = () => {
  let [btns] = findByType(children, TrailingButtons);
  if (btns) {
    return <TrailingButtons>{btns.props.children}</TrailingButtons>;
  }
  return null;
};

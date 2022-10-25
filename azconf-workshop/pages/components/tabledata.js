function TableData(props) {
  const [payload, setStudentData] = useState(props.payload);

  const tableRows = payload.map((info) => {
    return (
      // eslint-disable-next-line react/jsx-key
      <tr>
        <td>{info("First Name")}</td>
        <td>{info("Last Name")}</td>
        <td>{info("Designation")}</td>
        <td>{info("Designation")}</td>
        <td>{info("ParticipantType")}</td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Designation</th>
            <th>Designation</th>
            <th>Participant Type</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default TableData;

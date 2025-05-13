import React from "react";

function TableScore({shots_z1,shots_z2,shots_z3,shots_z4}) {
  return (
    <table>
      <thead>
        <th>Zone</th>
        <th>Hit</th>
      </thead>
      <tbody>
        <tr>
          <th className="target-red">Z1</th>
          <td>{shots_z1}</td>
        </tr>
        <tr>
          <th className="target-goldenrod">Z2</th>
          <td>{shots_z2}</td>
        </tr>
        <tr>
          <th className="target-green">Z3</th>
          <td>{shots_z3}</td>
        </tr>
        <tr>
          <th className="target-blue">Z4</th>
          <td>{shots_z4}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableScore;

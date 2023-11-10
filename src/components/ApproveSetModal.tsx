import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { optionState } from "../static/interface";
import { setApproves } from '../features/reducers/optionSlice';
import { setUpdateSettingsApprove } from '../features/api';

const ApproveSetModal = () => {
  const dispatch = useDispatch();
  // const savedApprovals = useSelector(state => state.approve.approvals); // Adjust the selector as needed

  const savedApprovals = useSelector(
    (state: optionState) => state.optionReducer.value.savedApprovals
  );

  const [groups, setGroups] = useState([
    { checked: false, text: '' },
    { checked: false, text: '' },
    { checked: false, text: '' }
  ]);

  useEffect(() => {
    // Initialize groups with saved values
    if (savedApprovals && savedApprovals.length > 0) {
      setGroups(savedApprovals);
    }
  }, [savedApprovals]);

  const handleCheckboxChange = (index:number) => {
    const newGroups = groups.map((group, idx) => {
      if (idx === index) {
        return { ...group, checked: !group.checked };
      }
      return group;
    });
    setGroups(newGroups);
  };

  const handleInputChange = (index:number, value:string) => {
    const newGroups = [...groups];
    newGroups[index].text = value;
    setGroups(newGroups);
  };

  const handleSave = async () => {
    dispatch(setApproves(groups));
    try {
      await setUpdateSettingsApprove(groups);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Reset to initial state or perform other cancel actions
  };

  return (
    <div>
      {groups.map((group, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={group.checked}
            onChange={() => handleCheckboxChange(index)}
          />
          <input
            type="text"
            value={group.text}
            disabled={!group.checked}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default ApproveSetModal;
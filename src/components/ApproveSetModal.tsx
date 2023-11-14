import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setApproves } from '../features/reducers/settingSlice';
import { setUpdateSettingsApprove } from '../features/api';
import { RootStore } from '../store/congifureStore';

const ApproveSetModal = () => {
  const dispatch = useDispatch();

  const settingSet = useSelector((state: RootStore) => state.settingReducer);

  const [groups, setGroups] = useState([
    { checked: false, text: '' },
    { checked: false, text: '' },
    { checked: false, text: '' }
  ]);

  console.log("ApproveSetModal settingSet", settingSet)


  useEffect(() => {
    if (settingSet.savedApprovals.length > 0) {
      setGroups(settingSet.savedApprovals);
    }
  }, [settingSet.savedApprovals]);

  const handleCheckboxChange = (index: number) => {
    const newGroups = groups.map((group, idx) => {
      if (idx === index) {
        return { ...group, checked: !group.checked };
      }
      return group;
    });
    setGroups(newGroups);
  };

  const handleInputChange = (index: number, value: string) => {
    const newGroups = groups.map((group, idx) => {
      if (idx === index) {
        return { ...group, text: value };
      }
      return group;
    });
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
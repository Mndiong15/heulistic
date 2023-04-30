import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';

const platforms = [
  { name: 'YouTube', icon: 'youtube' },
  { name: 'Facebook', icon: 'facebook' },
  { name: 'Twitter', icon: 'twitter' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'Pinterest', icon: 'pinterest' },
];

const SocialMediaSelector = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  return (
    <div>
      {platforms.map((platform, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={platform.name}
            checked={selectedPlatforms.includes(platform.name)}
            onChange={(event) => {
              const isChecked = event.target.checked;
              setSelectedPlatforms(prevSelected => {
                if (isChecked) {
                  return [...prevSelected, platform.name];
                } else {
                  return prevSelected.filter(name => name !== platform.name);
                }
              });
            }}
          />
          <span className={`icon-${platform.icon}`} />
          {platform.name}
        </label>
      ))}
      {selectedPlatforms.length > 0 && (
        <ul>
          {selectedPlatforms.map((platform, index) => (
            <li key={index}>{platform}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SocialMediaSelector;
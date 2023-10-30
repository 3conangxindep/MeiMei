import React, { useState } from 'react';
import "./SocialMediaPage.css";

const SocialMediaPage = () => {
  const [iconsSections, setIconsSections] = useState({});
  const [nextSectionId, setNextSectionId] = useState(1);

  const addIconsSection = () => {
    setIconsSections((prevSections) => ({
      ...prevSections,
      [nextSectionId]: { id: nextSectionId },
    }));
    setNextSectionId(nextSectionId + 1);
  };

  const deleteIconsSection = (sectionId) => {
    const updatedSections = { ...iconsSections };
    delete updatedSections[sectionId];
    setIconsSections(updatedSections);
  };

  return (
    <div className='SocialMedia-container'>
      <ul>ソーシャルメディア
        <li>
          <img style={{ width: "20px" }} src='https://cdn-icons-png.flaticon.com/128/725/725372.png' alt='' />
          <input type='text' />
        </li>
        <li>
          <img style={{ width: "20px" }} src='https://cdn-icons-png.flaticon.com/128/4406/4406253.png' alt='' />
          <input type='text' />
        </li>
        <li>
          <img style={{ width: "20px" }} src='https://cdn-icons-png.flaticon.com/128/2875/2875352.png' alt='' />
          <input type='text' />
        </li>
        <button onClick={addIconsSection}>その他</button>
        {Object.values(iconsSections).map((section) => (
          <IconsSection key={section.id} section={section} onDelete={() => deleteIconsSection(section.id)} />
        ))}
      </ul>
    </div>
  );
};

function IconsSection({ onDelete, section }) {
  const [showIcons, setShowIcons] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [inputText, setInputText] = useState('');

  const icons = [
    { src: 'https://cdn-icons-png.flaticon.com/128/1383/1383326.png', alt: '1' },
    { src: 'https://cdn-icons-png.flaticon.com/128/1051/1051377.png', alt: '2' },
    { src: 'https://cdn-icons-png.flaticon.com/128/3046/3046122.png', alt: '3' },
    { src: 'https://cdn-icons-png.flaticon.com/128/3741/3741588.png', alt: '4' },
  ];

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setShowIcons(false);
  };

  return (
    <div className="icons-container">
      <div onClick={() => setShowIcons(!showIcons)}>
        {selectedIcon ? (
          <img style={{ width: "30px" }} src={selectedIcon.src} alt={selectedIcon.alt} />
        ) : (
          <img style={{ width: "30px" }} src="https://cdn-icons-png.flaticon.com/128/900/900782.png" alt="Default Icon" />
        )}
        {showIcons && (
          <div className="image-section">
            {icons.map((icon, index) => (
              <div
                key={index}
                className="image-item"
                onClick={() => handleIconClick(icon)}
              >
                <li><img style={{ width: "30px" }} src={icon.src} alt={icon.alt} /></li>
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={onDelete}>X</button>
    </div>
  );
}

export default SocialMediaPage;

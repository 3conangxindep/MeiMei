import React, { useState } from 'react';

const DescriptionPage = () => {
  const initialContent = `
    - 👋 Hi, I’m MEIMEI\n
    - 👀 I’m interested in ...\n
    - 🌱 I’m currently learning ...\n
    - 💞️ I’m looking to collaborate on ...\n
    - 📫 How to reach me ...`;

  const [aboutMe, setAboutMe] = useState(initialContent);

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
  };

  return (
    <div>
      <div>私について</div>
      <div>
        <textarea rows="7" cols="30" value={aboutMe} onChange={handleAboutMeChange} />
      </div>
    </div>
  );
};

export default DescriptionPage;

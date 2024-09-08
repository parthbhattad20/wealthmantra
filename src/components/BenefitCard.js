import React from 'react';

const phishingIcon = "./images/phising.png";
const complianceIcon = "./images/compliance.png";
const errorIcon = "./images/risk.png";
const phishingAttacksIcon = "./images/laptop.png";
const exposedUsersIcon = "./images/team.png";
const securityStandardsIcon = "./images/guarantee.png";
const defaultIcon = "URL_OF_DEFAULT_ICON";

function getIconForTitle(title) {
  const iconMap = {
    "DRIVE SECURITY AWARENESS": phishingIcon,
    "DEMONSTRATE COMPLIANCE": complianceIcon,
    "REDUCE HUMAN ERROR": errorIcon,
    "COMBAT PHISHING ATTACKS": phishingAttacksIcon,
    "SAFEGUARD EXPOSED USERS": exposedUsersIcon,
    "IMPLEMENT SECURITY STANDARDS": securityStandardsIcon
  };

  return iconMap[title] || defaultIcon;
}

const cardContainerStyle = {
  perspective: '1000px',
  width: '24rem',
  height: '16rem',
  marginBottom: '2rem'
};

const cardInnerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 1.7s',
  transformStyle: 'preserve-3d'
};

const cardFrontStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  backgroundColor: '#101357', 
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  borderRadius: '8px'
};

const cardBackStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  backgroundColor: '#1E3A8A',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  transform: 'rotateY(180deg)',
  borderRadius: '8px'
};

const cardHoverStyle = {
  transform: 'rotateY(180deg)'
};

function BenefitCard({ title, details }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const icon = getIconForTitle(title);

  const iconStyle = {
    width: '7rem',  
    height: '7rem', 
    marginTop: '1rem',
    marginBottom: '2rem'
  };

  return (
    <div
      style={cardContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ ...cardInnerStyle, ...(isHovered && cardHoverStyle) }}>
        <div style={cardFrontStyle}>
          <img src={icon} alt="Benefit Icon" style={iconStyle} />
          <h2 className="card-title text-center text-white mt-4">{title}</h2>
        </div>
        <div style={cardBackStyle}>
          <p className="text-m text-white text-left">{details}</p>
        </div>
      </div>
    </div>
  );
}

export default BenefitCard;

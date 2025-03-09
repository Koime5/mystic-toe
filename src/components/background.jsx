const Background = () => {
  return (
    <div className="background">
    <div className="moon-container">
      <svg className="moon" viewBox="0 0 182 184" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <path fillRule="evenodd" clipRule="evenodd" 
            d="M106.723 1.17174C72.1899 7.34306 46 37.1544 46 73C46 113.317 79.1309 146 120 146C145.579 146 168.127 133.197 181.418 113.733C171.653 154.054 135.323 184 92 184C41.1898 184 0 142.81 0 92C0 41.1898 41.1898 0 92 0C97.0114 0 101.929 0.400681 106.723 1.17174Z" 
            fill="#E0D662" filter="url(#glow)"/>
    </svg>
    </div>
    </div>
  );
}

export default Background;
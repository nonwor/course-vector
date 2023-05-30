import { ImGithub } from 'react-icons/im';

// CSS approach
const iconStyle = {
  fontSize: '2rem', // Adjust the size as needed
  color: 'black'
};

const Github=()=>{
  return (
    <a href="https://github.com/nonwor" target="_blank">
      <ImGithub style={iconStyle} />
    </a>
  );
}

export default Github;
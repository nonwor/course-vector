import { ImLinkedin } from 'react-icons/im';

// CSS approach
const iconStyle = {
  fontSize: '2rem', // Adjust the size as needed
  color: 'black',
  
};

const Linkedin=()=>{
  return (
    <a href="https://www.linkedin.com/in/sataporn-w-66268177" target="_blank">
      <ImLinkedin style={iconStyle} />
    </a>
  );
}

export default Linkedin;


import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


export default function WhatsAppButton() {
    const handleWhatsAppClick = () => {
        // Replace this with your actual WhatsApp URL
        window.location.href = 'https://wa.me/+972584877080';
      };
  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px',  zIndex: 2 }}>
    <Fab aria-label="WhatsApp" onClick={handleWhatsAppClick}  style={{backgroundColor:'#05bc2c', color:'white', opacity:0.9}}>
      <WhatsAppIcon />
    </Fab>
  </div>
  )
}

import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import checkFill from '@iconify/icons-eva/checkmark-circle-2-fill';
import declineFill from '@iconify/icons-eva/close-square-fill';
import copyFill from '@iconify/icons-eva/copy-fill';
import completeFill from '@iconify/icons-eva/person-done-fill';
import infoFill from '@iconify/icons-eva/info-fill';

// import { Link as RouterLink } from 'react-router-dom';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// ----------------------------------------------------------------------

export default function BookingMoreMenu({
  id,
  handleApprove,
  handleDecline,
  handleComplete,
  handleBookingDetail
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={copyFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Copy" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          sx={{ color: 'success.main' }}
          onClick={() => {
            handleApprove(id);
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            <Icon icon={checkFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Approve" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={() => {
            handleDecline(id);
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            <Icon icon={declineFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Decline" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          sx={{ color: 'info.main' }}
          onClick={() => {
            handleComplete(id);
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            <Icon icon={completeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Complete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          sx={{ color: 'info.primary' }}
          onClick={() => {
            // alert('clicked');
            handleBookingDetail(id);
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            <Icon icon={infoFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Details" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

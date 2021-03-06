import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import checkFill from '@iconify/icons-eva/checkmark-circle-2-fill';
import copyFill from '@iconify/icons-eva/copy-fill';
// import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// ----------------------------------------------------------------------

export default function QuoteMoreMenu({ id, handleDelete, row, handleReply }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    // console.log('clicked');
    navigator.clipboard.writeText(JSON.stringify(row, null, 2));
    setIsOpen(false);
  };

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
        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={() => {
            handleDelete(id);
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleCopy}>
          <ListItemIcon>
            <Icon icon={copyFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Copy" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          sx={{ color: 'success.main' }}
          onClick={() => {
            handleReply(id);
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            <Icon icon={checkFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Replied" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const Rating = ({ value, text }) => {
  return (
    <Box display="flex" alignItems="center">
      <span>
        {value >= 1 ? <StarIcon /> : value >= 0.5 ? <StarHalfIcon /> : <StarBorderIcon />}
      </span>
      <span>
        {value >= 2 ? <StarIcon /> : value >= 1.5 ? <StarHalfIcon /> : <StarBorderIcon />}
      </span>
      <span>
        {value >= 3 ? <StarIcon /> : value >= 2.5 ? <StarHalfIcon /> : <StarBorderIcon />}
      </span>
      <span>
        {value >= 4 ? <StarIcon /> : value >= 3.5 ? <StarHalfIcon /> : <StarBorderIcon />}
      </span>
      <span>
        {value >= 5 ? <StarIcon /> : value >= 4.5 ? <StarHalfIcon /> : <StarBorderIcon />}
      </span>
      {text && <span style={{ marginLeft: '8px' }}>{text}</span>}
    </Box>
  );
};

export default Rating;